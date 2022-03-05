<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 700px; max-width: 98vw"
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
          <div style="height: 500px">
            <global-map @load-success="onMapLoadSuccess" />
          </div>
          <q-separator />
          <div class="q-pa-md">
            <q-form class="row items-center">
              <q-input
                dense
                outlined
                lazy-rules
                class="flex1 my-form-item"
                v-model="address"
              >
                <template #prepend>
                  <span class="text-subtitle2 text-grey-8 text-bold"
                    >设备地址:</span
                  >
                </template>
              </q-input>
              <q-btn
                flat
                class="q-mx-md"
                label="取消"
                color="primary"
                @click="$emit('cancel')"
              />
              <q-btn label="确定" color="primary" @click="onSubmit" />
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
              <q-menu
                v-model="listVisible"
                fit
                no-parent-event
                no-refocus
                no-focus
                anchor="bottom left"
                self="top left"
              >
                <q-list padding dense bordered>
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
import GlobalMap from "components/map/index.vue";
import {
  ref,
  inject,
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
    let autoComplete, geocoder, marker, district;
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
      map.value.setCenter(location,true,false); // 加上这个人生倍儿爽，把当前定位设成中心点
      marker.setPosition(location);
    };
    const fnAddress = (location, addressStr) => {
      if (!geocoder) return;
      const { lat: LAT, lng: LNG } = location;
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

    const onMapLoadSuccess = () => {
      AMap.plugin(["AMap.AutoComplete"], function () {
        autoComplete = new AMap.AutoComplete({ city: "全国" });
      });
      AMap.plugin("AMap.Geocoder", () => {
        geocoder = new AMap.Geocoder({
          city: "全国",
          radius: 1000,
        });
      });
      AMap.plugin("AMap.DistrictSearch", function () {
        // 创建行政区查询对象
        district = new AMap.DistrictSearch({
          // 返回行政区边界坐标等具体信息
          extensions: "all",
          // 设置查询行政区级别为区
          level: "district",
        });
      });
      marker = new AMap.Marker();
      map.value.on("click", onMapClick);
      if (props.row) {
        const obj = toRaw(props.row);
        const { gpsInfo } = obj;
        const arr = gpsInfo.split(",");
        if(!arr || (arr && (!arr[0] || !arr[1]) )) return
        const position = new AMap.LngLat(arr[0], arr[1]);
        fnMarker(position);
        fnAddress(position, obj.address);
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
      const { lnglat } = e;
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
      const { location } = item;
      fnMarker(location);
      fnAddress(location);
      console.log("filterSelectItem", item);
    };



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

      onMapLoadSuccess,
      onInputChange,
      filterSelectItem,
      onSubmit,
    };
  },
};
</script>
