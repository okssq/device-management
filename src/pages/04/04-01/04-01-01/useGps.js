import { ref } from "vue";

const useGps = () => {
  const gpsData = ref(null);
  const gpsDialogVisible = ref(false);
  const viewGps = (row) => {
    gpsData.value = row;
    gpsDialogVisible.value = true;
  };

  return {
    gpsData,
    gpsDialogVisible,
    viewGps,
  };
};
export default useGps;
