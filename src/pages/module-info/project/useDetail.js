import { ref, shallowRef, inject } from "vue";
import { fn3001, notifySuccess, notifyWarn } from "src/util/common";

const useDetail = (onSearch, getList, treeList) => {
  const loginInfo = inject("loginInfo");
  const loginCompanyId = loginInfo.value ? loginInfo.value.companyId : "";
  const loginCompanyName = ref("");
  const detailVisible = ref(false);
  const detailType = ref("inset");
  const detailData = shallowRef(null);

  const setLoginCompanyName = () => {
    if (!treeList.value.length) {
      notifyWarn("数据加载中，请稍后重试！");
      return false;
    }
    const item = treeList.value.find(
      (el) => el.id == loginInfo.value.companyId
    );
    if (!item) {
      fn3001();
      return false;
    }
    loginCompanyName.value = item["label"];
    return true;
  };

  // 新增按钮回调
  const onInsert = () => {
    const result = setLoginCompanyName();
    if (!result) return;

    detailData.value = null;
    detailType.value = "insert";
    detailVisible.value = true;
  };
  // 编辑按钮回调
  const onEdit = (row) => {
    const result = setLoginCompanyName();
    if (!result) return;

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
