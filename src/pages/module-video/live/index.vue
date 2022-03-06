<template>
  <div class="my-box row no-wrap fit">
    <div class="full-height" style="width: 340px">
      <tree :tree-list="treeList" :tree-node="treeNode"/>
    </div>
    <q-separator vertical/>
    <div class="flex1 row wrap">
      <div
        class="wrap-video-item overflow-hidden column no-wrap shadow-4"
        v-for="(n, index) in videoList"
        :key="index"
      >
        <div class="row justify-between items-center q-pa-sm bg-grey-2">
          <div class="text-subtitle2">IEMI:{{ n.name }}</div>
          <div class="text-subtitle2">{{ n.speed }}kb/s</div>
          <q-btn flat round dense icon="clear" size="sm"/>
        </div>
        <q-separator/>
        <div class="flex1 overflow-hidden video-content">
          <video
            loop
            muted
            autoplay
            controls
            class="fit"
            src="../demo.mp4"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from '../tree';
import {ref, shallowRef} from "vue";
import {LEVEL} from "src/api/module";


export default {
  components: {
    Tree,
  },
  setup() {
    const treeList = shallowRef([]);
    const treeNode = shallowRef([]);

    // 获取树数据
    const getTreeData = () => LEVEL.treeList()
    // 格式化树列表所需要的数据格式
    const formatTreeData = (oldArr, pIndex, vList = [], vObj = {}) => {
      const tree = [];
      let count = 0;
      let offlineCount = 0;
      let noVehicleCompanyCount = 0;
      oldArr.forEach((el, index) => {
        const {id, label, type, children, others} = el;
        const treeItem = {label, type};
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
            } = formatTreeData(children, _index, vList, vObj);
            subTree.length && (treeItem.children = subTree);
            if (subCount) {
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
          vObj[`term_${id}`] = {label, status, index: _index};
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
      return {tree, count, offlineCount, vList, vObj};
    };
    // 渲染树
    const renderTree = () => {
      getTreeData().then(res => {
        const {tree, vList} = formatTreeData([res]);
        treeList.value = vList;
        treeNode.value = tree;
      })
    }
    renderTree()
    const videoList = ref([
      {name: "111", speed: "78"},
      {name: "112", speed: "68"},
      {name: "211", speed: "46"},
      {name: "314", speed: "99"},
    ]);
    const layout = ref("2x2");
    const selected = ref("Food");


    return {
      treeList,
      treeNode,

      videoList,
      layout,
      selected,
    };
  },
};
</script>

<style scoped>
.wrap-video-item {
  width: 50%;
  height: 50%;
}

.wrap-video-item:nth-child(2),
.wrap-video-item:last-child {
  border-left: none;
}

.wrap-video-item:nth-child(3),
.wrap-video-item:last-child {
  border-top: none;
}

.video-content video {
  object-fit: fill;
}
</style>
