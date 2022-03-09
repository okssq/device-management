import { inject } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

const useLayout = () => {
  const map = inject("map");
  const mapTeleportTo = inject("mapTeleportTo");

  const loadMap = () => {
    AMapLoader.load({
      key: "e8d109fb99779238b1cac35cbc0598e9",
      version: "2.0",
    })
      .then((AMap) => {
        const mapObj = new AMap.Map("global-map", {
          zoom: 5, // 级别
          viewMode: "2D",
          zooms: [5, 20],
        });
        mapObj.on("complete", () => {
          console.log("全局地图加载成功！");
          map.value = mapObj;
        });
      })
      .catch((err) => {
        map.value = null;
        console.log("全局地图加载失败", err);
      });
  };

  return {
    loadMap,
    mapTeleportTo,
  };
};
export default useLayout;
