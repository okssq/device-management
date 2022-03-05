import { PROJECT, TERMINAL_MAP } from "src/api/module.js";
import { computed, inject, ref, shallowRef, toRaw } from "vue";
const useMain = () => {
  const LOAD = inject("LOAD");
  let districtSearch,
    cluster,
    projectPolygons = {},
    hasFnMarkerfecneIds = [],
    provincePolygons = [],
    cityPolygons = [],
    districtPolygons = [];
  const projectList = shallowRef([]);
  const provinceOptions = shallowRef([]);
  const cityOptions = shallowRef([]);
  const districtOptions = shallowRef([]);
  const province = ref("");
  const city = ref("");
  const district = ref("");
  const filterText = ref("");
  const filterList = computed(() => {
    const p = (province.value || "").trim();
    const c = (city.value || "").trim();
    const d = (district.value || "").trim();
    const filter = (filterText.value || "").trim();
    if (d) {
      return projectList.value.filter(
        (el) => el["district"] === d && el["projectName"].includes(filter)
      );
    } else if (c) {
      if (["直辖市", "特别行政区"].includes(c)) {
        return projectList.value.filter(
          (el) => el["province"] === p && el["projectName"].includes(filter)
        );
      } else {
        return projectList.value.filter(
          (el) => el["city"] === c && el["projectName"].includes(filter)
        );
      }
    } else if (p) {
      return projectList.value.filter(
        (el) => el["province"] === p && el["projectName"].includes(filter)
      );
    } else {
      return projectList.value.filter((el) =>
        el["projectName"].includes(filter)
      );
    }
  });

  // 当前项目选择id
  const selectProjectId = ref("");

  //
  const fnTerminalMarkers = (arr) => {
    arr.forEach((el) => {
      const { type, onlineStatus, gpsInfo } = el;
      const gpsArr = gpsInfo.split(",");
      const position = new AMap.LngLat(gpsArr[0], gpsArr[1]);
      new AMap.Marker({
        map: LOAD.mapObj,
        position,
        offset: new AMap.Pixel(-10, 0),
        icon: `images/type${type}-status${onlineStatus}.png`, // 添加 Icon 图标 URL
      });
    });
  };
  // 渲染项目围栏的设备
  const fnTerminals = (id, polygon) => {
    if (hasFnMarkerfecneIds.includes(id)) return;
    console.log("渲染项目围栏的设备", id, polygon);

    TERMINAL_MAP.gpsList({ projectId: id })
      .then((res) => {
        hasFnMarkerfecneIds.push(id);
        fnTerminalMarkers(res);
        polygon.clearEvents("click");
      })
      .catch((err) => {});
  };
  // 渲染项目点
  const fnProjectGps = (arr) => {
    const renderMarker = (context) => {
      const { name } = context["data"][0];
      var content = `
          <div class="q-badge flex inline items-center no-wrap q-badge--single-line bg-blue" role="alert">项目：${name}</div>
        `;

      // var offset = new AMap.Pixel(-9, -9);
      context.marker.setContent(content);
      // context.marker.setOffset(offset);
    };
    AMap.plugin(["AMap.MarkerCluster"], function () {
      cluster = new AMap.MarkerCluster(LOAD.mapObj, arr, {
        gridSize: 80, // 聚合网格像素大小
        maxZoom: 22,
        renderMarker,
      });
    });
    console.log("renderProjectGps", arr);
  };
  // 渲染项目围栏
  const fnProjectFence = (arr) => {
    arr.forEach((el) => {
      const { id, fence } = el;
      const polygon = new AMap.Polygon({
        map: LOAD.mapObj,
        zIndex: 12,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        strokeColor: "#0091ea",
        fillColor: "#80d8ff",
        fillOpacity: 0.4,
        path: fence,
        extData: {
          id,
        },
      });
      // polygon.on("mouseover", () => {
      //   polygon.setOptions({
      //     fillOpacity: 0.4,
      //   });
      // });
      // polygon.on("mouseout", () => {
      //   polygon.setOptions({
      //     fillOpacity: 0.3,
      //   });
      // });
      polygon.on("click", function () {
        fnTerminals(id, polygon);
      });
      projectPolygons[id] = polygon;
    });
  };
  // 渲染项目列表GPS点及围栏
  const renderGpsAndFence = (results) => {
    const gpsArr = [];
    const fenceArr = [];
    results.forEach((el) => {
      const { id, mapStr, projectName } = el;
      const [gpsStr, fenceStr] = mapStr.split(";");
      if (!gpsStr || !fenceStr) return;
      const locationGpsArr = gpsStr.split(",");
      // const position = new AMap.LngLat(locationGpsArr[0], locationGpsArr[1]);
      gpsArr.push({
        id,
        name: projectName,
        lnglat: locationGpsArr,
      });
      fenceArr.push({
        id,
        fence: JSON.parse(fenceStr).map((el) => {
          const { longitude, latitude } = el;
          return new AMap.LngLat(longitude, latitude);
        }),
      });
    });
    fnProjectGps(gpsArr);
    fnProjectFence(fenceArr);
  };
  // 获取项目列表
  const getProjectList = () => {
    PROJECT.list({ page: 1, pageSize: 999 }).then((res) => {
      const { results } = res;
      projectList.value = results;
      renderGpsAndFence(results);
      console.log("projectList", results);
    });
  };
  // 销毁地区围栏
  const destroyFence = (type) => {
    if (type === "province") {
      provincePolygons.forEach((el) => {
        el.destroy();
      });
    } else if (type === "city") {
      cityPolygons.forEach((el) => {
        el.destroy();
      });
    } else if (type === "district") {
      districtPolygons.forEach((el) => {
        el.destroy();
      });
    }
  };
  // 围栏的显示与隐藏
  const fnToggleAreas = (type, flag) => {
    if (type === "province") {
      provincePolygons.forEach((el) => {
        flag ? el.show() : el.hide();
      });
      flag &&
        LOAD.mapObj.setFitView(provincePolygons, true, [20, 20, 20, 300], 22);
    } else if (type === "city") {
      cityPolygons.forEach((el) => {
        flag ? el.show() : el.hide();
      });
      flag && LOAD.mapObj.setFitView(cityPolygons, true, [20, 20, 20, 300], 22);
    } else if (type === "district") {
      districtPolygons.forEach((el) => {
        flag ? el.show() : el.hide();
      });
      flag &&
        LOAD.mapObj.setFitView(districtPolygons, true, [20, 20, 20, 300], 22);
    }
  };
  // 渲染生成地区围栏
  const fnRenderFence = (type, bounds) => {
    const arr = [];
    if (bounds) {
      for (let i = 0, l = bounds.length; i < l; i++) {
        const polygon = new AMap.Polygon({
          map: LOAD.mapObj,
          zIndex: 10,
          strokeWeight: 1,
          strokeColor: "#0091ea",
          fillColor: "#80d8ff",
          fillOpacity: 0.1,
          path: bounds[i],
        });
        arr.push(polygon);
        if (type === "province") {
          provincePolygons = arr;
        } else if (type === "city") {
          cityPolygons = arr;
        } else if (type === "district") {
          districtPolygons = arr;
        }
      }
      LOAD.mapObj.setFitView(arr, true); //地图自适应
    }
  };
  // 省级选择改变
  const onProvinceChange = (val) => {
    console.log("省级选择改变", val);
    filterText.value = "";
    city.value = "";
    district.value = "";
    cityOptions.value = [];
    districtOptions.value = [];
    destroyFence("city");
    destroyFence("district");
    destroyFence("province");
    if (!val) {
      LOAD.mapObj.setZoomAndCenter(5, [105.882825, 36.289626], true, false);
    } else {
      districtSearch.setLevel("province");
      districtSearch.setSubdistrict(2);
      districtSearch.search(val, function (status, result) {
        if (status == "complete") {
          console.log("根据省级查找信息", result);
          const data = result.districtList[0];
          const { districtList, boundaries, citycode } = data;
          if (Array.isArray(citycode)) {
            cityOptions.value = districtList.map((el) => el.name);
          } else {
            const length = citycode.length;
            const arr = [];
            if (length === 3) {
              //直辖市
              districtList.forEach((el) => {
                el["districtList"].forEach((_el) => {
                  arr.push(_el["name"]);
                });
              });
            } else {
              // 特别行政区
              districtList.forEach((el) => {
                arr.push(el["name"]);
              });
            }
            cityOptions.value = length === 3 ? ["直辖市"] : ["特别行政区"];
            city.value = length === 3 ? "直辖市" : "特别行政区";
            districtOptions.value = arr;
          }
          fnRenderFence("province", boundaries);
        }
      });
    }
  };
  // 市级选择改变
  const onCityChange = (val) => {
    console.log("市级选择改变", val);
    filterText.value = "";
    district.value = "";
    districtOptions.value = [];
    destroyFence("district");
    destroyFence("city");
    if (!val) {
      fnToggleAreas("province", true);
    } else {
      districtSearch.setLevel("city");
      districtSearch.setSubdistrict(1);
      districtSearch.search(val, function (status, result) {
        if (status == "complete") {
          console.log("根据市级查找信息", result);
          const data = result.districtList[0];
          const { districtList, boundaries } = data;
          districtOptions.value = districtList.map((el) => el.name);
          fnToggleAreas("province", false);
          fnRenderFence("city", boundaries);
        }
      });
    }
  };
  // 县级选择改变
  const onDistrictChange = (val) => {
    console.log("县级选择改变", val, typeof val);
    filterText.value = "";
    destroyFence("district");
    if (!val) {
      if (["直辖市", "特别行政区"].includes(city.value)) {
        destroyFence("city");
        fnToggleAreas("province", true);
      } else {
        fnToggleAreas("province", false);
        fnToggleAreas("city", true);
      }
    } else {
      districtSearch.setLevel("district");
      districtSearch.setSubdistrict(1);
      districtSearch.search(val, function (status, result) {
        if (status == "complete") {
          console.log("根据区县查找信息", result);
          const data = result.districtList[0];
          const { boundaries } = data;
          fnToggleAreas("province", false);
          fnToggleAreas("city", false);
          fnRenderFence("district", boundaries);
        }
      });
    }
  };
  // 地图加载成功事件,初始化地图插件
  const onMapLoadSuccess = () => {
    console.log("地图加载成功事件");
    LOAD.mapObj.setZoomAndCenter(5, [105.882825, 36.289626], true, false);
    AMap.plugin(["AMap.DistrictSearch"], function () {
      districtSearch = new AMap.DistrictSearch({
        level: "country",
        extensions: "all",
        subdistrict: 1,
      });
      districtSearch.search("中国", function (status, result) {
        if (status == "complete") {
          const data = result.districtList[0];
          const { districtList } = data;
          provinceOptions.value = districtList.map((el) => el.name);
        }
      });
    });
    getProjectList();
  };
  // 当前选择项目改变事件
  const onSelectProjrctItem = (row) => {
    const { id } = row;
    selectProjectId.value = id;
    const polygons = LOAD.mapObj.getAllOverlays("polygon");
    const findItem = polygons.find((el) => {
      return id === el._opts.extData.id;
    });
    fnTerminals(id, projectPolygons[id]);

    LOAD.mapObj.setFitView([findItem], true, [20, 20, 20, 240]);
  };
  const clearMap = () => {
    destroyFence("city");
    destroyFence("district");
    destroyFence("province");
    Object.values(projectPolygons).forEach((el) => {
      console.log(el, "清楚围栏");
      el.clearEvents("click");
      el.destroy();
    });
    projectPolygons = null;
    if (cluster) {
      cluster.setMap(null);
      cluster = null;
    }
    if (LOAD.mapObj) {
      LOAD.mapObj.clearMap();
    }
  };

  return {
    projectList,
    provinceOptions,
    cityOptions,
    districtOptions,
    province,
    city,
    district,
    filterText,
    filterList,
    selectProjectId,

    onSelectProjrctItem,
    onProvinceChange,
    onCityChange,
    onDistrictChange,
    onMapLoadSuccess,
    clearMap,
  };
};
export default useMain;
