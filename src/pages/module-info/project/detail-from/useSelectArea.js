import { ref, shallowRef, toRaw } from "vue";
const useSelectArea = (formData) => {
  const selectAreaDialogVisible = ref(false);
  const selectAreaData = shallowRef(null);
  const onSelectArea = () => {
    selectAreaData.value = toRaw(formData);
    selectAreaDialogVisible.value = true;
  };
  const onConfirmSelectArea = (param) => {
    const { mapStr, province, city, district, township, address } = param;
    formData.province = province;
    formData.city = city;
    formData.district = district;
    formData.township = township;
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
