import { ref, shallowRef, inject } from "vue";
import { notifySuccess, notifyWarn } from "src/util/common";

const useDetail = (onSearch, getList, treeList) => {
  const LOAD = inject("LOAD");
  const loginCompanyId = LOAD.loginInfo.companyId + "";
  const loginCompanyName = ref("");
  const detailVisible = ref(false);
  const detailType = ref("inset");
  const detailData = shallowRef(null);
  // 新增按钮回调
  const onInsert = () => {
    if (!treeList.value.length) {
      notifyWarn("数据加载中，请稍后重试！");
      return;
    }
    const item = treeList.value.find((el) => {
      return el.id == LOAD.loginInfo.companyId;
    });
    loginCompanyName.value = (item || { label: "" })["label"];
    detailData.value = null;
    detailType.value = "insert";
    detailVisible.value = true;
  };
  // 编辑按钮回调
  const onEdit = (row) => {
    if (!treeList.value.length) {
      notifyWarn("数据加载中，请稍后重试！");
      return;
    }
    const item = treeList.value.find((el) => {
      return el.id == LOAD.loginInfo.companyId;
    });
    loginCompanyName.value = (item || { label: "" })["label"];
    detailData.value = row;
    detailType.value = "edit";
    detailVisible.value = true;
  };
  const onConfirmDetail = (type) => {
    detailVisible.value = false;
    if (type === "insertSuccess") {
      notifySuccess("增加成功");
      onSearch({ page: 1 });
    } else {
      notifySuccess("更新成功");
      getList();
    }
  };
  return {
    detailVisible,
    loginCompanyId,
    loginCompanyName,
    detailType,
    detailData,
    onInsert,
    onEdit,
    onConfirmDetail,
  };
};
export default useDetail;
