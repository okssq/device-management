<template>
  <div class="absolute-full">
    <global-map />
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
  </div>
</template>

<script>
import TabTree from "./tree/index.vue";
import useTree from "./useTree";
import GlobalMap from "components/map";
import { ref, inject, onBeforeUnmount, onMounted, shallowRef } from "vue";
export default {
  components: {
    TabTree,
    GlobalMap,
  },
  setup() {
    // const MAP = inject("MAP");
    // const MAP_ISLOAD = inject("MAP_ISLOAD");
    // const MAP_TELEPORT_TO = inject("MAP_TELEPORT_TO");

    const { tab, treeList, treeNode, onComSelect, onPrjSelect, onTermSelect } =
      useTree();

    onMounted(() => {
      // MAP_TELEPORT_TO.value = "#t-map";
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
      // MAP_TELEPORT_TO.value = "#hidden-map";
    });

    return {
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
