<template>
  <div class="relative-position fit" id="component-map">
    <div class="absolute-center" v-if="!mapLoad">
      <q-btn
        icon="sync"
        color="primary"
        :disable="loading"
        :loading="loading"
        @click="loadMap"
      >地图资源加载失败，请重试！
      </q-btn
      >
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import {inject, onMounted, onBeforeUnmount, ref, computed, watch} from "vue";

export default {
  emits: ["load-success"],
  setup(props, {emit}) {
    const map = inject('map')
    const mapTeleportTo = inject('mapTeleportTo')
    const mapLoad = computed(() => !!map.value);
    const loading = ref(false);
    const loadMap = () => {
      loading.value = true;
      if (mapLoad.value) {
        loading.value = false;
        return true;
      }

      AMapLoader.load({
        key: "7c93197f8661b907705f9fe87c9ed782",
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
            map.value = mapObj;
          });
        })
        .catch((err) => {
          console.log("全局地图加载失败", err);
          map.value = null;
        }).finally(() => {
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
      mapTeleportTo.value = "#component-map";
    });

    onBeforeUnmount(() => {
      mapTeleportTo.value = "#global-map-wrap";
      if (!map.value) return
      map.value.clearEvents();
      const overlays = map.value.getAllOverlays();
      console.log("overlays,", overlays);

      overlays.forEach((el) => {
        console.log("overlays[i],", el);
        el.clearEvents();
      });
      map.value.remove(overlays)
      map.value.clearMap();
      map.value.clearInfoWindow();
      console.log("执行清除地图内部组件完毕",map.value.getAllOverlays());
    });

    return {
      mapLoad,
      loading,
      loadMap,
    };
  },
};
</script>
