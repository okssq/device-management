import { ref, toRaw } from "vue";
import { notifyWarn } from "src/util/common";

const useGps = () => {
  const gpsData = ref(null);
  const gpsDialogVisible = ref(false);
  const viewGps = (row) => {
    const { gpsInfo } = toRaw(row);
    if (!gpsInfo || (gpsInfo && gpsInfo.length < 6)) {
      notifyWarn("gps信息不存在！");
      return;
    }
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
