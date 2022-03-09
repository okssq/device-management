<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 960px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">选取设备位置</div>
            <q-btn
              flat
              icon="clear"
              round
              size="12px"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator/>
          <div style="height: 600px">
            <global-map @load-success="onMapLoadSuccess"/>
          </div>
          <q-separator/>
          <div class="q-pa-md">
            <q-form class="row items-center">
              <q-input
                v-model="address"
                class="flex1 my-form-item"
                dense
                lazy-rules
                outlined
              >
                <template #prepend>
                  <span class="text-subtitle2 text-grey-8 text-bold"
                  >设备地址:</span
                  >
                </template>
              </q-input>
              <q-btn
                class="q-mx-md"
                color="primary"
                flat
                label="取消"
                @click="$emit('cancel')"
              />
              <q-btn color="primary" label="确定" @click="onSubmit"/>
            </q-form>
          </div>
          <section
            class="absolute-top-left bg-white rounded-borders shadow-2 q-py-xs"
            style="top: 60px; left: 15px"
          >
            <q-input
              v-model="inputFilter"
              borderless
              dense
              placeholder="搜索地址"
              rounded
              style="width: 240px"
              @focus="listVisible = true"
              @update:model-value="onInputChange"
            >
              <template #prepend>
                <q-icon class="q-ml-sm" name="search"/>
              </template>
              <q-menu
                v-model="listVisible"
                anchor="bottom left"
                fit
                no-focus
                no-parent-event
                no-refocus
                self="top left"
              >
                <q-list v-show="filterList.length" bordered dense padding>
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
            v-if="lng && lat"
            class="absolute-top-right bg-white q-pa-sm rounded-borders shadow-2 text-bold text-capitalize"
            style="top: 60px; right: 15px"
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
import {inject, onBeforeUnmount, ref, shallowRef, toRaw,} from "vue";
// import {PROJECT} from "src/api/module";
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
    let autoComplete, geocoder, marker, district;
    let projectFenceObj = {} //存储所有项目围栏对象 {围栏ID：地图围栏对象}
    // const projectList = shallowRef([]);
    const map = inject("map");
    const inputFilter = ref("");
    const listVisible = ref(false);
    const filterList = shallowRef([]);
    const lng = ref("");
    const lat = ref("");
    const address = ref("");

    const fnMarker = (location) => {
      if (!marker) return;
      marker.remove();
      marker.add(map.value);
      map.value.setZoomAndCenter(30, location, true, false); // 加上这个人生倍儿爽，把当前定位设成中心点
      marker.setPosition(location);
    };
    const fnAddress = (location, addressStr) => {
      if (!geocoder) return;
      const {lat: LAT, lng: LNG} = location;
      lng.value = LNG;
      lat.value = LAT;
      if (addressStr) {
        address.value = addressStr;
      } else {
        geocoder.getAddress(location, (status, result) => {
          if (status === "complete" && result.regeocode) {
            address.value = result.regeocode.formattedAddress;
          } else {
            address.value = "";
          }
        });
      }
    };

    const fnWebGpsLocation = () => {
      AMap.plugin("AMap.Geolocation", () => {
        const geolocation = new AMap.Geolocation();
        geolocation.getCurrentPosition((status, result) => {
          if ((status === 'complete') && result && result.info === "SUCCESS") {
            const {position} = result
            map.value.setZoomAndCenter(30, position, true, false)
          }
        })
      });
    }
    const onMapLoadSuccess = () => {
      AMap.plugin(["AMap.AutoComplete"], function () {
        console.log(111)
        autoComplete = new AMap.AutoComplete({city: "全国"});
        console.log(333)
      });
      AMap.plugin("AMap.Geocoder", () => {
        geocoder = new AMap.Geocoder({
          city: "全国",
          radius: 1000,
        });
      });
      AMap.plugin("AMap.DistrictSearch", function () {
        // 创建行政区查询对象
        console.log(4444)
        district = new AMap.DistrictSearch({
          // 返回行政区边界坐标等具体信息
          extensions: "all",
          // 设置查询行政区级别为区
          level: "district",
        });
        console.log(5555)
      });
      console.log(222)
      marker = new AMap.Marker();
      map.value.on("click", onMapClick);
      if (props.row) {
        const obj = toRaw(props.row);
        const {gpsInfo} = obj;
        if (!gpsInfo) {
          fnWebGpsLocation()
          return
        }
        const arr = gpsInfo.split(",");
        if (!arr || (arr && (!arr[0] || !arr[1]))) {
          fnWebGpsLocation()
          return
        }
        const position = new AMap.LngLat(arr[0], arr[1]);
        fnMarker(position);
        fnAddress(position, obj.address);
      } else {
        fnWebGpsLocation()
      }
    };

    const onInputChange = (val) => {
      if (!autoComplete) return;
      autoComplete.search(val, (status, result) => {
        if (status === "complete" && result && result.info === "OK") {
          filterList.value = result.tips;
        }
      });
    };

    const onMapClick = (e) => {
      const {lnglat} = e;
      fnMarker(lnglat);
      fnAddress(lnglat);
    };

    const onSubmit = () => {
      emit("ok", {
        lat: lat.value,
        lng: lng.value,
        address: address.value,
      });
    };
    const filterSelectItem = (item) => {
      listVisible.value = false;
      inputFilter.value = item.name;
      const {location} = item;
      fnMarker(location);
      fnAddress(location);
      // console.log("filterSelectItem", item);
    };

    // 渲染所有项目围栏
    // const renderAllProjectFence = (list) => {
    //   list.map(el => {
    //     const {id, path} = el
    //     const polygon = new AMap.Polygon({
    //       map: map.value,
    //       zIndex: 12,
    //       strokeWeight: 1,
    //       strokeColor: "#0091ea",
    //       fillColor: "#80d8ff",
    //       fillOpacity: 0.3,
    //       path,
    //       id,
    //     });
    //     projectFenceObj[id] = polygon;
    //   })
    // }
    // const getAllProjectInfo = () => {
    //   // listLoading.value = true;
    //   PROJECT.list({page: 1, pageSize: 999}).then(res => {
    //     const {results} = res;
    //     const fenceList = []
    //     results.forEach((el) => {
    //       const {id, mapStr} = el;
    //       const [gpsStr, fenceStr] = mapStr.split(";");
    //       if (!gpsStr || !fenceStr) return;
    //       fenceList.push({
    //         id,
    //         path: JSON.parse(fenceStr).map((el) => {
    //           const {longitude, latitude} = el;
    //           return new AMap.LngLat(longitude, latitude);
    //         })
    //       })
    //     });
    //     renderAllProjectFence(fenceList);
    //     projectList.value = results;
    //     // console.log('渲染所有项目围栏及项目点聚合', results)
    //   }).finally(() => {
    //     // listLoading.value = false
    //   })
    // }
    // getAllProjectInfo()

    onBeforeUnmount(() => {
      if (map.value) {
        map.value.off("click", onMapClick);
      }
      if (marker) marker.remove();
      autoComplete = null;
      district = null;
      geocoder = null;
      marker = null;
      map.value.clearMap();
    });

    return {
      lng,
      lat,
      address,
      inputFilter,
      listVisible,
      filterList,

      // projectList,

      onMapLoadSuccess,
      onInputChange,
      filterSelectItem,
      onSubmit,
    };
  },
};
</script>
