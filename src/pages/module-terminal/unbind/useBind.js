import { inject, ref, shallowRef } from "vue";
import { notifyWarn, notifySuccess, fn3001 } from "src/util/common";
const useBind = (companyList, selectCompanyId, selectCompanyName, getList) => {
  const loginInfo = inject("loginInfo");
  const bindDialogVisible = ref(false);
  const bindData = shallowRef(null);
  const onBind = (row) => {
    if (!companyList.value.length) {
      notifyWarn("数据加载中，请稍后重试！");
      return;
    }

    const item = companyList.value.find(
      (el) => el.id == loginInfo.value.companyId
    );
    if (!item) {
      fn3001();
      return;
    }

    const { id, label } = item;
    selectCompanyId.value = id + "";
    selectCompanyName.value = label;
    console.log("onBind", row);
    bindData.value = row;
    bindDialogVisible.value = true;
  };
  const onConfirmBind = () => {
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
