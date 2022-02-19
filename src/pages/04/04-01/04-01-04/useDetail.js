import { ref, shallowRef } from "vue";
import { notifySuccess } from "src/util/common";
const useGps = (getList) => {
  const detailData = shallowRef(null);
  const detailDialogVisible = ref(false);
  const onEdit = (row) => {
    detailData.value = row;
    detailDialogVisible.value = true;
  };
  const onConfirmEdit = () => {
    detailDialogVisible.value = false;
    notifySuccess("更新成功");
    getList();
  };

  return {
    detailData,
    detailDialogVisible,
    onEdit,
    onConfirmEdit,
  };
};
export default useGps;
