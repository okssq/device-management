<template>
  <div class="absolute-full" id="t-map"></div>
  <cust-info-window
    ref="refInfoWindow"
    v-show="visible"
    :info="info"
    @video="videoShow = true"
    @close="visible = false"
  />
  <video-panel v-if="videoShow" @close="videoShow = false" />
  <div
    class="absolute-top-right shadow-2 bg-white"
    style="max-height: 100%; top: 15px; right: 15px"
  >
    <tree
      :default-id="defaultId"
      @select="onSelect"
      @tab-change="onTabChange"
    />
  </div>
</template>

<script>
import Tree from "components/tree";
import custInfoWindow from "./info-window.vue";
import VideoPanel from "./video-panel.vue";
import { vList } from "components/tree/tree-date";
import { ref, inject, onBeforeUnmount, onMounted } from "vue";
export default {
  components: {
    Tree,
    custInfoWindow,
    VideoPanel,
  },
  setup() {
    const MAP = inject("MAP");
    const MAP_ISLOAD = inject("MAP_ISLOAD");
    const MAP_TELEPORT_TO = inject("MAP_TELEPORT_TO");
    const refInfoWindow = ref(null);
    const visible = ref(false);
    const curTab = ref("0");
    const videoShow = ref(false);
    let markerArr = [];
    let infoWindow;
    const defaultId = ref("");
    const info = ref(null);
    // Marker点击
    const onClick = (e) => {
      const { id, gps } = e.target.w.el;
      info.value = e.target.w.el;
      defaultId.value = id;
      visible.value = true;
      infoWindow.setPosition(gps);
      infoWindow.open(MAP.value, gps);
      MAP.value.panTo(gps);
    };
    const fnMap = () => {
      // 加载infowindow
      infoWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: false,
        content: refInfoWindow.value.$el,
        anchor: "bottom-center",
        offset: new window.AMap.Pixel(3, 0),
      });
      // 加载marker
      vList.forEach((el) => {
        const { gps, status } = el;
        const marker = new AMap.Marker({
          el,
          gps: gps,
          position: gps,
          offset: new AMap.Pixel(-10, 0),
          icon: `images/status${status}.png`, // 添加 Icon 图标 URL
        });
        marker.on("click", onClick);
        MAP.value.add(marker);
        markerArr.push(marker);
      });
      fnTabMarkers();
      setTimeout(() => {
        MAP.value.setFitView(markerArr, false, [60, 60, 60, 60], 17);
      }, 500);
    };
    // 树列表设备点击
    const onSelect = (data) => {
      const { id } = data;
      const item = vList.find((el) => el.id == id);
      if (!item) return;
      const { gps } = item;
      visible.value = true;
      infoWindow.setPosition(gps);
      infoWindow.open(MAP.value, gps);
      MAP.value.panTo(gps);
      info.value = item;
    };
    onMounted(() => {
      MAP_TELEPORT_TO.value = "#t-map";
      fnMap();
    });
    onBeforeUnmount(() => {
      if (!MAP.value) return;
      if (markerArr.length) {
        markerArr.forEach((el) => {
          el.setMap(null);
          el = null;
        });
        markerArr = [];
      }
      MAP.value.clearMap();
      MAP_TELEPORT_TO.value = "#hidden-map";
    });

    const fnTabMarkers = () => {
      const tab = curTab.value;
      markerArr.forEach((el) => {
        const { status } = el.w.el;
        if (status == 0) {
          if (tab != 1) {
            el.show();
          } else {
            el.hide();
          }
        } else {
          if (tab == 2) {
            el.hide();
          } else {
            el.show();
          }
        }
      });
    };
    const onTabChange = (val) => {
      curTab.value = val;
      fnTabMarkers();
    };
    return {
      MAP,
      MAP_ISLOAD,
      refInfoWindow,
      visible,
      videoShow,
      defaultId,
      onSelect,
      info,
      onTabChange,
    };
  },
};
</script>
