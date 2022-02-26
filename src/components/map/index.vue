<template>
  <div class="relative-position fit" id="component-map">
    <div class="absolute-center" v-if="!mapLoad">
      <q-btn
        icon="sync"
        color="primary"
        :disable="loading"
        :loading="loading"
        @click="loadMap"
        >地图资源加载失败，请重试！</q-btn
      >
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { inject, onMounted, onBeforeUnmount, ref, computed, watch } from "vue";
export default {
  emits: ["load-success"],
  setup(props, { emit }) {
    const LOAD = inject("LOAD");
    const mapLoad = computed(() => LOAD.map);
    const loading = ref(false);
    const loadMap = async () => {
      if (LOAD.MAP) {
        loading.value = false;
        return true;
      }
      loading.value = true;
      AMapLoader.load({
        key: "7c93197f8661b907705f9fe87c9ed782",
        // version: "1.4.15",
        version: "2.0",
      })
        .then((AMap) => {
          const mapObj = new AMap.Map("global-map", {
            zoom: 11, // 级别
            viewMode: "2D",
            animateEnable: false,
            isHotspot: false,
            jogEnable: false,
            indoorMap: false,
            showIndoorMap: false,
            doubleClickZoom: false,
            keyboardEnable: false,
            showBuildingBlock: false,
            buildingAnimation: false,
          });
          mapObj.on("complete", () => {
            console.log("全局地图加载完成");
            LOAD.map = true;
            LOAD.mapObj = mapObj;
            loading.value = false;
          });
        })
        .catch((err) => {
          console.error("全局地图加载失败", err);
          LOAD.map = false;
          loading.value = false;
        });
    };
    watch(
      mapLoad,
      () => {
        if (mapLoad.value) {
          emit("load-success");
        }
      },
      {
        immediate: true,
      }
    );
    onMounted(() => {
      LOAD.mapTeleportTo = "#component-map";
    });

    onBeforeUnmount(() => {
      LOAD.mapTeleportTo = "#global-map-wrap";
      if (LOAD.map) {
        LOAD.mapObj.clearEvents("click");
        const overlays = LOAD.mapObj.getAllOverlays();
        console.log("overlays,", overlays);

        overlays.forEach((el) => {
          console.log("el1111,", el);
          el.clearEvents("click");
          el.clearEvents("mousemove");
          el.clearEvents("mousemout");
        });
        LOAD.mapObj.clearMap();
        LOAD.mapObj.clearInfoWindow();
        console.log("执行清楚map组件完毕！");
      }
    });

    return {
      mapLoad,
      loading,
      loadMap,
    };
  },
};
</script>
