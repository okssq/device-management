<template>
  <div
    class="bg-white column no-wrap overflow-hidden relative-position"
    style="z-index: 200; max-height: 100%; width: 280px"
  >
    <div class="q-px-md q-py-sm row no-wrap">
      <q-input
        dense
        outlined
        debounce="350"
        class="q-mr-sm flex1"
        placeholder="请输入设备号"
        v-model="inputFilter"
        @focus.prevent.stop="listVisible = true"
      >
        <q-menu
          fit
          no-parent-event
          no-refocus
          no-focus
          anchor="bottom left"
          self="top left"
          v-model="listVisible"
        >
          <filter-list
            emit-type="select"
            :filter-txt="inputFilter"
            @select="onFilterSelectItem"
          />
        </q-menu>
      </q-input>
    </div>
    <q-separator />
    <q-tabs
      dense
      inline-label
      active-color="primary"
      class="text-grey-8"
      v-model="currentTab"
      @update:model-value="onCuttrntTabChange"
    >
      <q-tab name="0" label="全部" />
      <q-tab name="1" label="在线" />
      <q-tab name="2" label="离线" />
    </q-tabs>
    <q-separator />
    <ul
      v-show="currentTab === '0'"
      id="status_tree_all"
      class="ztree overflow-auto"
      style="flex: 1"
    />
    <ul
      v-show="currentTab === '1'"
      id="status_tree_online"
      class="ztree overflow-auto"
      style="flex: 1"
    />
    <ul
      v-show="currentTab === '2'"
      id="status_tree_offline"
      class="ztree overflow-auto"
      style="flex: 1"
    />
  </div>
</template>

<script>
import "@ztree/ztree_v3/js/jquery-1.4.4.min";
import "@ztree/ztree_v3/js/jquery.ztree.core.min";
import "@ztree/ztree_v3/js/jquery.ztree.exhide.min";
import FilterList from "./filter.vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { treeNodes, beforeClick, nodeClass } from "./tree-date.js";

export default {
  components: { FilterList },
  emits: ["select", "tab-change"],
  props: {
    clearSelect: {
      type: Boolean,
      default: false,
    },
    defaultId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let zTreeObj,
      zTreeOnlineObj,
      zTreeOfflineObj,
      zTeeNodes,
      zTeeOnlineNodes,
      zTeeOfflineNodes;

    const inputFilter = ref("");
    const listVisible = ref(false);
    const currentTab = ref("0");
    // tab页面更改事件
    const onCuttrntTabChange = (value) => {
      emit("tab-change", value);
    };
    // 搜索过滤框列表选中事件
    const onFilterSelectItem = (item) => {
      if (currentTab.value != "0") {
        zTreeObj.expandAll(false);
      }

      listVisible.value = false;
      currentTab.value = "0";
      const { id, label } = item;
      inputFilter.value = label;
      const node = zTreeObj.getNodesByParam("id", id, null)[0];
      const { status } = node;
      emit("select", { id, label, status });
      setTimeout(() => {
        zTreeObj.selectNode(node);
      }, 350);
    };

    // type3节点点击事件
    const onClick = (event, treeId, node) => {
      const { id, label, status } = node;
      emit("select", { id, label, status });
    };
    // 渲染三棵树
    const fnTree = (tree) => {
      const allSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type, status } = treeNode;
              if (type != 3)
                return `${name}(${treeNode["onlineCount"]}/${treeNode["count"]})`;
              return `${name}(${status == 0 ? "离线" : "在线"})`;
            },
          },
        },
        view: {
          autoCancelSelected: false,
          dblClickExpand: true,
          showTitle: false,
          showLine: false,
          showIcon: false,
          nodeClasses: nodeClass,
        },
        callback: {
          beforeClick,
          onClick,
        },
      };
      const onLineSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type } = treeNode;
              if (type != 3) return `${name}(${treeNode["onlineCount"]})`;
              return `${name}`;
            },
          },
        },
        view: {
          autoCancelSelected: false,
          dblClickExpand: true,
          showTitle: false,
          showLine: false,
          showIcon: false,
          nodeClasses: nodeClass,
        },
        callback: {
          beforeClick,
          onClick,
        },
      };
      const offLineSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type } = treeNode;
              if (type != 3) return `${name}(${treeNode["offlineCount"]})`;
              return `${name}`;
            },
          },
        },
        view: {
          autoCancelSelected: false,
          dblClickExpand: true,
          showTitle: false,
          showLine: false,
          showIcon: false,
          nodeClasses: nodeClass,
        },
        callback: {
          beforeClick,
          onClick,
        },
      };
      zTreeObj = $.fn.zTree.init($("#status_tree_all"), allSetting, tree);
      zTreeOnlineObj = $.fn.zTree.init(
        $("#status_tree_online"),
        onLineSetting,
        tree
      );
      zTreeOfflineObj = $.fn.zTree.init(
        $("#status_tree_offline"),
        offLineSetting,
        tree
      );
      const offlineNodes = zTreeOnlineObj.getNodesByFilter(
        (node) => node.type == 3 && node.status === "0"
      );
      zTreeOnlineObj.hideNodes(offlineNodes);
      const onlineNodes = zTreeOfflineObj.getNodesByFilter(
        (node) => node.type === 3 && node.status != "0"
      );
      zTreeOfflineObj.hideNodes(onlineNodes);
      zTeeNodes = zTreeObj.getNodes();
      if (zTeeNodes && zTeeNodes.length) {
        zTreeObj.expandNode(zTeeNodes[0], true, false, false);
      }
      zTeeOnlineNodes = zTreeOnlineObj.getNodes();
      if (zTeeOnlineNodes && zTeeOnlineNodes.length) {
        zTreeOnlineObj.expandNode(zTeeOnlineNodes[0], true, false, false);
      }
      zTeeOfflineNodes = zTreeOfflineObj.getNodes();
      if (zTeeOfflineNodes && zTeeOfflineNodes.length) {
        zTreeOfflineObj.expandNode(zTeeOfflineNodes[0], true, false, false);
      }
    };

    const init = () => {
      fnTree(treeNodes);
    };

    const fnDefultId = (id) => {
      if (currentTab.value != "0") {
        zTreeObj.expandAll(false);
        currentTab.value = "0";
        emit("tab-change", "0");
      }
      listVisible.value = false;

      const node = zTreeObj.getNodesByParam("id", id, null)[0];
      setTimeout(() => {
        zTreeObj.selectNode(node);
      }, 350);
    };
    watch(
      () => props.defaultId,
      () => {
        fnDefultId(props.defaultId);
      }
    );
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      zTreeObj && zTreeObj.destroy();
      zTreeOnlineObj && zTreeOnlineObj.destroy();
      zTreeOfflineObj && zTreeOfflineObj.destroy();
      zTreeObj = null;
      zTreeOnlineObj = null;
      zTreeOfflineObj = null;
    });

    return {
      inputFilter,
      listVisible,
      currentTab,
      onCuttrntTabChange,
      onFilterSelectItem,
    };
  },
};
</script>
