<template>
  <div
    class="bg-white column no-wrap overflow-hidden relative-position"
    style="z-index: 200; max-height: 100%; width: 340px"
  >
    <input-filter
      v-model:filter-text="filterText"
      :tree-list="treeList"
      @select="onInputSelect"
    />
    <q-separator />
    <q-tabs
      dense
      inline-label
      active-color="primary"
      class="text-grey-8"
      :model-value="tab"
      @update:model-value="onTabChange"
    >
      <q-tab :name="0" label="全部" />
      <q-tab :name="1" label="在线" />
      <q-tab :name="2" label="离线" />
    </q-tabs>
    <q-separator />
    <ul
      v-show="tab === 0"
      id="all-status-tree"
      class="ztree overflow-auto"
      style="flex: 1"
    />
    <ul
      v-show="tab === 1"
      id="online-status-tree"
      class="ztree overflow-auto"
      style="flex: 1"
    />
    <ul
      v-show="tab === 2"
      id="offline-status-tree"
      class="ztree overflow-auto"
      style="flex: 1"
    />
  </div>
</template>

<script>
import "@ztree/ztree_v3/js/jquery-1.4.4.min";
import "@ztree/ztree_v3/js/jquery.ztree.core.min";
import "@ztree/ztree_v3/js/jquery.ztree.exhide.min";
import InputFilter from "./input-filter.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
const nodeClass = (treeId, treeNode) => {
  const { type, status } = treeNode;
  if (type != 3) {
    return {
      add: ["text-subtitle2"],
      remove: ["text-subtitle2", "text-green-7", "text-grey-6"],
    };
  } else {
    if (status == 0) {
      return {
        add: ["text-subtitle2", "text-grey-6"],
        remove: ["text-subtitle2", "text-green-7"],
      };
    } else {
      return {
        add: ["text-subtitle2", "text-green-7"],
        remove: ["text-subtitle2", "text-grey-6"],
      };
    }
  }
};
const termTypeText = {
  1: "座椅",
  2: "回收",
  3: "储物柜",
  4: "大屏",
};
const statusText = {
  0: "离线",
  1: "在线",
};
export default {
  components: { InputFilter },
  emits: ["update:tab", "com-select", "prj-select", "term-select"],
  props: {
    // 当前tab值
    tab: {
      type: Number,
      default: 0,
    },
    treeList: {
      type: Array,
      default: () => [],
    },
    treeNode: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    let zTreeObj,
      zTreeOnlineObj,
      zTreeOfflineObj,
      zTeeNodes,
      zTeeOnlineNodes,
      zTeeOfflineNodes;

    const filterText = ref("");

    // tab页面更改事件
    const onTabChange = (value) => {
      emit("update:tab", value);
      zTreeObj && zTreeObj.cancelSelectedNode();
      zTreeOnlineObj && zTreeOnlineObj.cancelSelectedNode();
      zTreeOfflineObj && zTreeOfflineObj.cancelSelectedNode();
    };
    // 搜索过滤框列表选中事件
    const onInputSelect = (item) => {
      if (props.tabl !== "0") {
        zTreeObj.expandAll(false);
      }
      onTabChange(0);
      const { id, label } = item;
      const node = zTreeObj.getNodesByParam("id", id, null)[0];
      const { status } = node;
      emit("select", { id, label, status });
      setTimeout(() => {
        zTreeObj.selectNode(node);
      }, 350);
    };

    // 设备节点点击事件
    const onTermSelect = (event, treeId, node) => {
      emit("term-select", node);
    };

    // 树节点点击之前事件
    const beforeClick = (treeId, treeNode) => {
      const { type, id, label } = treeNode;
      if (type == 1) {
        emit("com-select", { id, label });
        return false;
      } else if (type == 2) {
        emit("prj-select", { id, label });
        return false;
      } else {
        return true;
      }
    };
    // 渲染三棵树
    const fnTree = (tree) => {
      const allSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type, onlineCount, count, status, termType } = treeNode;
              if (type == 1 || type == 2) {
                return `
                  ${name}(${onlineCount}/${count})
                 `;
              } else {
                return `[${termTypeText[termType] || "未知设备"}]-${name}(${
                  statusText[status] || "未知状态"
                })`;
              }
            },
          },
        },
        view: {
          autoCancelSelected: false,
          dblClickExpand: false,
          showTitle: false,
          showLine: false,
          showIcon: false,
          nodeClasses: nodeClass,
          addDiyDom: function addDiyDom(treeId, treeNode) {
            const { id, tId, type } = treeNode;
            if (type == 3) return;
            var aObj = $("#" + tId + "_a");
            if ($("#diyBtn_" + id).length > 0) return;
            // color:#446ba4;
            var icon = `
                <i 
                  style="line-height:30px;font-size:16px;" 
                  class="q-icon on-left notranslate material-icons material-icons-outlined" 
                  aria-hidden="true" role="img"
                >
                  ${
                    type == 1
                      ? "business"
                      : type == 2
                      ? "grid_view"
                      : "electrical_services"
                  }
                </i>`;
            aObj.prepend(icon);
          },
        },
        callback: {
          beforeClick,
          onClick: onTermSelect,
        },
      };
      const onLineSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type, onlineCount, status, termType } = treeNode;
              if (type == 1 || type == 2) {
                return `
                  ${name}(${onlineCount})
                 `;
              } else {
                return `[${termTypeText[termType] || "未知设备"}]-${name}(${
                  statusText[status] || "未知状态"
                })`;
              }
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
          addDiyDom: function addDiyDom(treeId, treeNode) {
            const { id, tId, type } = treeNode;
            if (type == 3) return;
            var aObj = $("#" + tId + "_a");
            if ($("#diyBtn_" + id).length > 0) return;
            // color:#446ba4;
            var icon = `
                <i 
                  style="line-height:30px;font-size:16px;" 
                  class="q-icon on-left notranslate material-icons material-icons-outlined" 
                  aria-hidden="true" role="img"
                >
                  ${
                    type == 1
                      ? "business"
                      : type == 2
                      ? "grid_view"
                      : "electrical_services"
                  }
                </i>`;
            aObj.prepend(icon);
          },
        },
        callback: {
          beforeClick,
          onClick: onTermSelect,
        },
      };
      const offLineSetting = {
        data: {
          key: { name: "label" },
          render: {
            name: function (name, treeNode) {
              const { type, offlineCount, status, termType } = treeNode;
              if (type == 1 || type == 2) {
                return `
                  ${name}(${offlineCount})
                 `;
              } else {
                return `[${termTypeText[termType] || "未知设备"}]-${name}(${
                  statusText[status] || "未知状态"
                })`;
              }
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
          addDiyDom: function addDiyDom(treeId, treeNode) {
            const { id, tId, type } = treeNode;
            if (type == 3) return;
            var aObj = $("#" + tId + "_a");
            if ($("#diyBtn_" + id).length > 0) return;
            // color:#446ba4;
            var icon = `
                <i 
                  style="line-height:30px;font-size:16px;" 
                  class="q-icon on-left notranslate material-icons material-icons-outlined" 
                  aria-hidden="true" role="img"
                >
                  ${
                    type == 1
                      ? "business"
                      : type == 2
                      ? "grid_view"
                      : "electrical_services"
                  }
                </i>`;
            aObj.prepend(icon);
          },
        },
        callback: {
          beforeClick,
          onClick: onTermSelect,
        },
      };
      zTreeObj = $.fn.zTree.init($("#all-status-tree"), allSetting, tree);
      zTreeOnlineObj = $.fn.zTree.init(
        $("#online-status-tree"),
        onLineSetting,
        tree
      );
      zTreeOfflineObj = $.fn.zTree.init(
        $("#offline-status-tree"),
        offLineSetting,
        tree
      );
      const offlineNodes = zTreeOnlineObj.getNodesByFilter(
        (node) => node.type == 3 && node.status === 0
      );
      zTreeOnlineObj.hideNodes(offlineNodes);
      const onlineNodes = zTreeOfflineObj.getNodesByFilter(
        (node) => node.type === 3 && node.status !== 0
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

    onMounted(() => {
      fnTree(props.treeNode);
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
      filterText,

      onTabChange,
      onInputSelect,
    };
  },
};
</script>
