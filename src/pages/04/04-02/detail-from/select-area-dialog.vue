<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 800px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">选取设备位置</div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator />
          <div style="height: 400px">
            <global-map></global-map>
          </div>
          <q-separator />
          <div class="q-pa-md">
            <q-form class="row q-gutter-md items-center">
              <q-input
                dense
                outlined
                lazy-rules
                class="flex1 q-mt-md"
                v-model="address"
              >
                <template #prepend>
                  <span class="text-subtitle2 text-grey-8 text-bold"
                    >项目所在详细地址:</span
                  >
                </template>
              </q-input>
              <q-btn
                flat
                label="取消"
                color="primary"
                @click="$emit('cancel')"
              />
              <q-btn label="确定" color="primary" @click="onSubmit" />
            </q-form>
          </div>
          <section
            class="absolute-top-left bg-white q-pa-sm shadow-5"
            style="top: 60px; left: 15px"
          >
            <q-input
              dense
              outlined
              placeholder="搜索地址"
              v-model="inputFilter"
              style="width: 240px"
              @focus="listVisible = true"
              @update:model-value="onInputChange"
            >
              <q-menu
                v-model="listVisible"
                fit
                no-parent-event
                no-refocus
                no-focus
                anchor="bottom left"
                self="top left"
              >
                <q-list padding dense bordered v-show="filterList.length">
                  <template v-for="(item, index) in filterList" :key="index">
                    <q-item clickable @click="filterSelectItem(item)">
                      <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label caption lines="2">{{
                          item.district
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-menu>
            </q-input>
          </section>
          <section
            class="absolute-top-right bg-white q-pa-sm shadow-5"
            style="top: 60px; right: 15px"
            v-if="lng && lat"
          >
            <div>经度：{{ lng || "-" }}</div>
            <div>纬度：{{ lat || "-" }}</div>
          </section>
        </q-card>
      </div>
    </div>
  </teleport>
</template>
<script>
import GlobalMap from "components/map/index.vue";
import {
  ref,
  inject,
  onMounted,
  onBeforeUnmount,
  toRaw,
  shallowRef,
} from "vue";
export default {
  emits: ["cancel", "ok"],
  components: {
    GlobalMap,
  },
  props: {
    row: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props, { emit }) {
    let autoComplete, geocoder, marker, polygon, polygonEditor;
    const LOAD = inject("LOAD");
    const inputFilter = ref("");
    const listVisible = ref(false);
    const filterList = shallowRef([]);
    const lng = ref("");
    const lat = ref("");
    const city = ref("");
    const district = ref("");
    const province = ref("");
    const township = ref("");
    const address = ref("");

    const fnMarker = (location) => {
      if (!marker) {
        marker = new AMap.Marker();
      }
      marker.remove();
      marker.add(LOAD.mapObj);
      LOAD.mapObj.setZoomAndCenter(17, location,true,false);
      marker.setPosition(location);
    };
    const fnAddress = (location, addressObj) => {
      if (!geocoder) return;
      const { lat: LAT, lng: LNG } = location;
      lng.value = LNG;
      lat.value = LAT;
      if (addressObj) {
        const {
          province: a,
          city: b,
          district: c,
          township: d,
          projectAddress,
        } = addressObj;
        province.value = a || "";
        city.value = b || "";
        district.value = c || "";
        township.value = d || "";
        address.value = projectAddress;
      } else {
        geocoder.getAddress(location, (status, result) => {
          if (status === "complete" && result && result.regeocode) {
            console.log(result.regeocode);
            const { addressComponent, formattedAddress } = result.regeocode;
            const {
              province: a,
              city: b,
              district: c,
              township: d,
            } = addressComponent;
            province.value = a || "";
            city.value = b || "";
            district.value = c || "";
            township.value = d || "";
            address.value = formattedAddress;
          } else {
            province.value = "";
            city.value = "";
            district.value = "";
            township.value = "";
            address.value = "";
          }
        });
      }
    };
    const fnPolygon = (path) => {
      if (!polygon) {
        polygon = new window.AMap.Polygon({
          path,
          map: LOAD.mapObj,
          draggable: false,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
      } else {
        polygon.setPath(path);
      }
      if (!polygonEditor) {
        AMap.plugin("AMap.PolygonEditor", () => {
          polygonEditor = new window.AMap.PolygonEditor(LOAD.mapObj, polygon);
          polygonEditor.open();
        });
      } else {
        polygonEditor.close();
        polygonEditor.clearAdsorbPolygons();
        polygonEditor.setAdsorbPolygons(polygon);
        polygonEditor.open();
      }
    };
    // 初始化地图插件
    const initMap = () => {
      AMap.plugin(["AMap.AutoComplete"], function () {
        autoComplete = new AMap.AutoComplete({ city: "全国" });
      });
      AMap.plugin("AMap.Geocoder", () => {
        geocoder = new AMap.Geocoder({
          city: "全国",
          radius: 1000,
        });
      });
      LOAD.mapObj.on("click", onMapClick);
    };

    // 搜索文字改变事件
    const onInputChange = (val) => {
      if (!autoComplete) return;
      autoComplete.search(val, (status, result) => {
        if (status === "complete" && result && result.info === "OK") {
          filterList.value = result.tips.filter((el) => {
            const { location } = el;
            return !!location;
          });
        }
      });
    };
    // 搜索列表项选择事件
    const filterSelectItem = (item) => {
      listVisible.value = false;
      inputFilter.value = item.name;
      const { location } = item;
      fnMarker(location);
      fnAddress(location);
      const path = [
        location.offset(0, 100),
        location.offset(200, 0),
        location.offset(0, -100),
        location.offset(-200, 0),
      ];
      fnPolygon(path);
    };
    // 地图点击事件
    const onMapClick = (e) => {
      const { lnglat } = e;
      fnMarker(lnglat);
      fnAddress(lnglat);
      const path = [
        lnglat.offset(0, 100),
        lnglat.offset(200, 0),
        lnglat.offset(0, -100),
        lnglat.offset(-200, 0),
      ];
      fnPolygon(path);
    };

    const onSubmit = () => {
      let mapStr = `${lng.value},${lat.value};`;
      if (polygon) {
        const path = (polygon.getPath() || []).map((el) => {
          return { longitude: el["lng"], latitude: el["lat"] };
        });
        mapStr += JSON.stringify(path);
      }
      emit("ok", {
        mapStr,
        province: province.value,
        city: city.value,
        district: district.value,
        township: township.value,
        address: address.value,
      });
    };

    onMounted(() => {
      initMap();
      if (props.row) {
        const obj = toRaw(props.row);
        const { mapStr, province, city, district, township, projectAddress } =
          obj;
        const addressObj = {
          province,
          city,
          district,
          township,
          projectAddress,
        };
        if (mapStr && projectAddress) {
          const [gpsStr, fenceStr] = mapStr.split(";");
          if (!gpsStr || !fenceStr) return;
          const gpsArr = gpsStr.split(",");
          const position = new AMap.LngLat(gpsArr[0], gpsArr[1]);
          fnMarker(position);
          fnAddress(position, addressObj);
          try {
            const path = JSON.parse(fenceStr).map((el) => {
              const { longitude, latitude } = el;
              return new AMap.LngLat(longitude, latitude);
            });
            fnPolygon(path);
          } catch (e) {
            console.log("error", e);
            const path = [
              position.offset(0, 100),
              position.offset(200, 0),
              position.offset(0, -100),
              position.offset(-200, 0),
            ];
            fnPolygon(path);
          }
        }
      }
    });

    onBeforeUnmount(() => {
      if (LOAD.mapObj) {
        LOAD.mapObj.off("click", onMapClick);
      }
      if (marker) marker.remove();
      if (polygon) {
        polygon.hide();
        polygon.destroy();
      }
      if (polygonEditor) {
        polygonEditor.clearAdsorbPolygons();
        polygonEditor.close();
      }
      polygonEditor = null;
      autoComplete = null;
      geocoder = null;
      marker = null;
      polygon = null;
      LOAD.mapObj.clearMap();
    });

    return {
      lng,
      lat,
      city,
      district,
      province,
      township,
      address,
      inputFilter,
      listVisible,
      filterList,

      onInputChange,
      filterSelectItem,
      onSubmit,
    };
  },
};
</script>
