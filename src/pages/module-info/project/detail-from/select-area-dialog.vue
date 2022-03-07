<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 960px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">
              {{
                row && row.id
                  ? '编辑项目围栏'
                  : '新建项目围栏（搜索地址或者通过地图直接点击选择）'
              }}
            </div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator/>
          <div style="height: 600px">
            <global-map @load-success="onMapLoadSuccess"/>
          </div>
          <q-separator/>
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
              <q-btn label="确定" color="primary" @click="onSubmit"/>
            </q-form>
          </div>
          <section
            class="absolute-top-left bg-white rounded-borders shadow-2 q-py-xs"
            style="top: 60px; left: 15px"
          >
            <q-input
              dense
              borderless
              rounded
              placeholder="搜索地址"
              v-model="inputFilter"
              style="width: 240px"
              @focus="listVisible = true"
              @update:model-value="onInputChange"
            >
              <template #prepend>
                <q-icon name="search" class="q-ml-sm"/>
              </template>
              <template #append>
                <div class="q-mr-sm"/>
              </template>
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
                          }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-menu>
            </q-input>
          </section>
          <section
            class="absolute-top-right bg-white q-pa-sm rounded-borders shadow-2 text-bold text-capitalize"
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
import GlobalMap from "components/map";
import {
  ref,
  inject,
  onBeforeUnmount,
  toRaw,
  shallowRef,
} from "vue";
import {notifyWarn} from "src/util/common";

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
  setup(props, {emit}) {
    console.log('row---', props.row)
    let autoComplete, geocoder, marker, polygon, polygonEditor;
    const map = inject("map");
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
      marker.add(map.value);
      marker.setPosition(location);
    };
    const fnAddress = (location, addressObj) => {
      if (!geocoder) return;
      const {lat: LAT, lng: LNG} = location;
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
            // console.log(result.regeocode);
            const {addressComponent, formattedAddress} = result.regeocode;
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
          map: map.value,
          draggable: false,
          fillColor: '#7bccc4',
          strokeOpacity: 1,
          fillOpacity: 0.3,
          strokeColor: '#2b8cbe',
          strokeWeight: 2,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        });
      } else {
        polygon.setPath(path);
      }
      setTimeout(() => {
        map.value.setFitView([polygon], true, [10, 10, 280, 160])
      })
      if (!polygonEditor) {
        AMap.plugin("AMap.PolygonEditor", () => {
          polygonEditor = new window.AMap.PolygonEditor(map.value, polygon);
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
        autoComplete = new AMap.AutoComplete({city: "全国"});
      });
      AMap.plugin("AMap.Geocoder", () => {
        geocoder = new AMap.Geocoder({
          city: "全国",
          radius: 1000,
        });
      });
      map.value.on("click", onMapClick);
    };

    // 搜索文字改变事件
    const onInputChange = (val) => {
      if (!autoComplete) return;
      autoComplete.search(val, (status, result) => {
        if (status === "complete" && result && result.info === "OK") {
          filterList.value = result.tips.filter((el) => {
            const {location} = el;
            return !!location;
          });
        }
      });
    };
    // 搜索列表项选择事件
    const filterSelectItem = (item) => {
      listVisible.value = false;
      inputFilter.value = item.name;
      const {location} = item;
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
      const {lnglat} = e;
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

    const onMapLoadSuccess = () => {
      initMap();
      if (props.row) {
        const obj = toRaw(props.row);
        const {mapStr, province, city, district, township, projectAddress} =
          obj;
        const addressObj = {
          province,
          city,
          district,
          township,
          projectAddress,
        };
        // 编辑回显项目围栏
        if (mapStr && projectAddress) {
          const [gpsStr, fenceStr] = mapStr.split(";");
          if (!gpsStr || !fenceStr) return;
          const gpsArr = gpsStr.split(",");
          const position = new AMap.LngLat(gpsArr[0], gpsArr[1]);
          try {
            const path = JSON.parse(fenceStr).map((el) => {
              const {longitude, latitude} = el;
              return new AMap.LngLat(longitude, latitude);
            });
            fnMarker(position);
            fnAddress(position, addressObj);
            fnPolygon(path);
          } catch (e) {
            console.log("error", e);
            notifyWarn('渲染项目围栏错误，请重新编辑围栏!')
          }
        }
        // 新建项目围栏 - 根据浏览器定位到当前地图中心
        else{
          AMap.plugin("AMap.Geolocation", () => {
            const geolocation = new AMap.Geolocation();
            geolocation.getCurrentPosition((status ,result )=> {
              if( (status === 'complete') && result && result.info==="SUCCESS"){
                const { position } = result

                map.value.setZoomAndCenter(17, position, true, false)
              }
            })
          });
        }
      }
    }
    const onSubmit = () => {
      let mapStr = `${lng.value},${lat.value};`;
      if (polygon) {
        const path = (polygon.getPath() || []).map((el) => {
          return {longitude: el["lng"], latitude: el["lat"]};
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


    onBeforeUnmount(() => {
      if (map.value) {
        map.value.off("click", onMapClick);
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
      map.value.clearMap();
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
      onMapLoadSuccess,
    };
  },
};
</script>
