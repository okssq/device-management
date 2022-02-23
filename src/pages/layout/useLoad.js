import { inject, computed } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
const useLoad = () => {
  const LOAD = inject("LOAD");
  const mapTeleportTo = computed(() => LOAD.mapTeleportTo);
  const loadMap = () => {
    AMapLoader.load({
      // key: "7c93197f8661b907705f9fe87c9ed782",
      key: "e8d109fb99779238b1cac35cbc0598e9",
      // version: "1.4.15",
      version: "2.0",
    })
      .then((AMap) => {
        const mapObj = new AMap.Map("global-map", {
          zoom: 11, // 级别
          viewMode: "2D",
          // animateEnable: false,
          // isHotspot: false,
          // jogEnable: false,
          // indoorMap: false,
          // showIndoorMap: false,
          // doubleClickZoom: false,
          // keyboardEnable: false,
          // showBuildingBlock: false,
          // buildingAnimation: false,
        });
        mapObj.on("complete", () => {
          console.log("全局地图加载成功！");
          LOAD.mapObj = mapObj;
          LOAD.map = true;
        });
      })
      .catch((err) => {
        console.error("全局地图加载失败！", err);
        LOAD.map = false;
      });
  };

  return {
    loadMap,
    mapTeleportTo,
  };
};
export default useLoad;
