import { ref, shallowRef, toRaw } from "vue";
const useSelectArea = (formData) => {
  const selectAreaDialogVisible = ref(false);
  const selectAreaData = shallowRef(null);
  const onSelectArea = () => {
    selectAreaData.value = toRaw(formData);
    selectAreaDialogVisible.value = true;
  };
  const onConfirmSelectArea = ({ mapStr, city, address }) => {
    formData.projectCity = city;
    formData.projectAddress = address;
    formData.mapStr = mapStr;
    selectAreaDialogVisible.value = false;
  };

  return {
    selectAreaDialogVisible,
    selectAreaData,
    onSelectArea,
    onConfirmSelectArea,
  };
};
export default useSelectArea;
