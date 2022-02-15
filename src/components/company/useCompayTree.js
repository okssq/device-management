import { COMPANY } from "src/api/module.js";
import { ref, shallowRef } from "vue";
export const useCompanyTree = () => {
  const treeLoading = ref(true);
  const treeNode = shallowRef([]);
  const treeList = shallowRef([]);
  const formatTree = (nodes, arr, list) => {
    !arr && (arr = []);
    !list && (list = []);
    nodes.forEach((el) => {
      const { id, pid, companyName, children } = el;
      list.push({ id, pid, label: companyName });
      const item = { id, pid, label: companyName };
      if (children) {
        item.children = [];
        formatTree(children, item.children, list);
      }
      arr.push(item);
    });
    return {
      arr,
      list,
    };
  };
  COMPANY.treeList()
    .then((res) => {
      const { arr, list } = formatTree([res]);
      treeNode.value = arr;
      treeList.value = list;
    })
    .finally(() => {
      treeLoading.value = false;
    });

  return {
    treeLoading,
    treeNode,
    treeList,
  };
};
