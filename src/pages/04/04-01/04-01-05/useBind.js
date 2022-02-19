import { inject, ref, shallowRef } from "vue";
import { notifyWarn, notifySuccess } from "src/util/common";
const useBind = (companyList, selectCompanyId, selectCompanyName, getList) => {
  const LOAD = inject("LOAD");
  const bindDialogVisible = ref(false);
  const bindData = shallowRef(null);
  const onBind = (row) => {
    if (!companyList.value.length) {
      notifyWarn("数据加载中，请稍后重试！");
      return;
    }
    const item = companyList.value.find((el) => {
      return el.id == LOAD.loginInfo.companyId;
    });
    const { id, label } = item || { id: "", label: "" };
    selectCompanyId.value = id + "";
    selectCompanyName.value = label;
    console.log("onBind", row);
    bindData.value = row;
    bindDialogVisible.value = true;
  };
  const onConfirmBind = (param) => {
    notifySuccess("注册成功");
    getList();
    bindDialogVisible.value = false;
  };

  return {
    bindDialogVisible,
    bindData,
    onBind,
    onConfirmBind,
  };
};
export default useBind;
