import { ref, shallowRef, toRaw } from "vue";
const useFenceMap = () => {
  const fenceMapDialogVisible = ref(false);
  const fenceMapData = shallowRef(null);
  const onFenceMap = (row) => {
    fenceMapData.value = toRaw(row);
    fenceMapDialogVisible.value = true;
  };

  return {
    fenceMapDialogVisible,
    fenceMapData,
    onFenceMap,
  };
};
export default useFenceMap;
