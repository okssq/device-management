<template>
  <div class="absolute-full" id="t-map"></div>
  <div
    class="absolute-top-right shadow-2 bg-white"
    style="max-height: 100%; top: 15px; right: 15px"
  >
    <tab-tree
      v-if="treeNode.length"
      v-model:tab="tab"
      :tree-list="treeList"
      :tree-node="treeNode"
      @com-select="onComSelect"
      @prj-select="onPrjSelect"
      @term-select="onTermSelect"
    />
  </div>
</template>

<script>
import TabTree from "./tree/index.vue";

import { LEVEL } from "src/api/module";
import { ref, inject, onBeforeUnmount, onMounted, shallowRef } from "vue";
export default {
  components: {
    TabTree,
  },
  setup() {
    const MAP = inject("MAP");
    const MAP_ISLOAD = inject("MAP_ISLOAD");
    const MAP_TELEPORT_TO = inject("MAP_TELEPORT_TO");

    const tab = ref(0);
    const treeList = shallowRef([]);
    const treeNode = shallowRef([]);

    const FORMAT_VEHICLE_TREE = (oldArr, pIndex, vList = [], vObj = {}) => {
      const tree = [];
      let count = 0;
      let offlineCount = 0;
      let noVehicleCompanyCount = 0;
      oldArr.forEach((el, index) => {
        const { id, label, type, children, others } = el;
        const treeItem = { label, type };
        if (type == 1 || type == 2) {
          const _index =
            pIndex === undefined ? `${index}` : `${pIndex}-${index}`;
          treeItem["id"] = `${type == 1 ? "com" : "prj"}_${id}`;
          treeItem["index"] = _index;
          treeItem["count"] = 0;
          treeItem["offlineCount"] = 0;
          treeItem["onlineCount"] = 0;
          tree.push(treeItem);
          if (children) {
            const {
              tree: subTree,
              count: subCount,
              offlineCount: subOfflineCount,
            } = FORMAT_VEHICLE_TREE(children, _index, vList, vObj);
            if (subCount) {
              subTree.length && (treeItem.children = subTree);
              count += subCount;
              offlineCount += subOfflineCount;
              treeItem.count = subCount;
              treeItem.offlineCount = subOfflineCount;
              treeItem.onlineCount = subCount - subOfflineCount;
            } else {
              noVehicleCompanyCount += 1;
            }
          }
        } else if (type == 3) {
          const _index =
            pIndex === undefined
              ? index - noVehicleCompanyCount
              : `${pIndex}-${index - noVehicleCompanyCount}`;
          const status = others.onlineStatus;
          const termType = others.type;
          vList.push({
            id: "term_" + id,
            label,
            status,
            index: _index,
            termType,
          });
          vObj[`term_${id}`] = { label, status, index: _index };
          tree.push({
            id: "term_" + id,
            label,
            type,
            status,
            index: _index,
            termType,
          });
          count += 1;
          if (status === 0) offlineCount += 1;
        }
      });
      return { tree, count, offlineCount, vList, vObj };
    };
    const getTreeData = () => {
      LEVEL.treeList().then((res) => {
        const { tree, vList } = FORMAT_VEHICLE_TREE([res]);
        treeList.value = vList;
        treeNode.value = tree;
        console.log(tree);
        // console.log("arr", arr, "list", list);
      });
    };
    getTreeData();

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

    const onComSelect = (item) => {
      console.log("item", item);
    };
    const onPrjSelect = (item) => {
      console.log("item", item);
    };
    const onTermSelect = (item) => {
      console.log("item", item);
    };

    onMounted(() => {
      MAP_TELEPORT_TO.value = "#t-map";
      // fnMap();
    });
    onBeforeUnmount(() => {
      // if (!MAP.value) return;
      // if (markerArr.length) {
      //   markerArr.forEach((el) => {
      //     el.setMap(null);
      //     el = null;
      //   });
      //   markerArr = [];
      // }
      // MAP.value.clearMap();
      MAP_TELEPORT_TO.value = "#hidden-map";
    });

    return {
      MAP,
      MAP_ISLOAD,

      tab,
      treeList,
      treeNode,
      onComSelect,
      onPrjSelect,
      onTermSelect,
    };
  },
};
</script>
