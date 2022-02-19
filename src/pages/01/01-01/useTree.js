import { ref, shallowRef } from "vue";
import { LEVEL } from "src/api/module";
const useTree = () => {
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
        const _index = pIndex === undefined ? `${index}` : `${pIndex}-${index}`;
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
      // console.log("arr", arr, "list", list);
    });
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

  getTreeData();

  return {
    tab,
    treeList,
    treeNode,

    onComSelect,
    onPrjSelect,
    onTermSelect,
  };
};

export default useTree;
