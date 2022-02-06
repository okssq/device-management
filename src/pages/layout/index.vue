<template>
  <div class="fullscreen overflow-hidden column no-wrap">
    <layout-header />
    <div class="flex1 overflow-hidden row no-wrap">
      <layout-side />
      <div
        class="flex1 column no-wrap overflow-hidden relative-position layout-main"
      >
        <router-view v-if="MAP_ISLOAD" />
      </div>
    </div>
  </div>
  <teleport :to="MAP_TELEPORT_TO">
    <div id="teleport-map" class="relative-position fit" />
  </teleport>
</template>

<script>
import LayoutHeader from "./header";
import LayoutSide from "./side";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ref, shallowRef, provide, onMounted } from "vue";
import { useQuasar } from "quasar";

export default {
  components: {
    LayoutHeader,
    LayoutSide,
  },
  setup() {
    const $q = useQuasar();
    const MAP_ISLOAD = ref(false);
    const MAP = shallowRef(null);
    const MAP_TELEPORT_TO = ref("#hidden-map");
    provide("MAP_ISLOAD", MAP_ISLOAD);
    provide("MAP", MAP);
    provide("MAP_TELEPORT_TO", MAP_TELEPORT_TO);

    const loadMap = () => {
      AMapLoader.load({
        key: "7c93197f8661b907705f9fe87c9ed782",
        version: "1.4.15",
      })
        .then((AMap) => {
          MAP.value = new AMap.Map("teleport-map", {
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
            features: ["bg", "road"],
          });
          MAP.value.on("complete", () => {
            console.log("全局地图加载完成");
            MAP_ISLOAD.value = true;
          });
        })
        .catch((err) => {
          $q.notify({
            type: "negative",
            message: "加载地图服务失败，请重试！",
          });
          console.error("全局地图加载失败", err);
        });
    };

    onMounted(() => {
      loadMap();
    });
    return {
      MAP_ISLOAD,
      MAP_TELEPORT_TO,
    };
  },
};
</script>

<style scoped>
.layout-main {
  background-color: rgb(244, 245, 250);
}

.layout-content {
  overflow: hidden;
  z-index: 8;
}
</style>
