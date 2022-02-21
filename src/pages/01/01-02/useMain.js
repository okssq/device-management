import { PROJECT } from "src/api/module.js";
import { inject, ref, shallowRef, toRaw } from "vue";
const useMain = () => {
  const LOAD = inject("LOAD");
  let districtSearch,
    areaFences = [];
  const projectList = shallowRef([]);
  const provinceOptions = shallowRef([]);
  const districtOptions = shallowRef([]);
  const province = ref("");
  const district = ref("");
  const filterText = ref("");
  const filterList = shallowRef([]);

  // 初始化地图插件
  const initMap = () => {
    LOAD.mapObj.setZoomAndCenter(3, [116.30946, 39.937629]);
    AMap.plugin(["AMap.DistrictSearch"], function () {
      districtSearch = new AMap.DistrictSearch({
        level: "country",
        extensions: "all",
        subdistrict: 2,
      });
      districtSearch.search("中国", function (status, result) {
        if (status == "complete") {
          const data = result.districtList[0];
          const { districtList } = data;
          provinceOptions.value = districtList.map((el) => el.name);
          console.log(data, provinceOptions.value);
        }
      });
    });
  };
  // 根据省查找市

  // 销毁之前已有的地区围栏
  const destroyAreaFence = () => {
    areaFences.forEach((el) => {
      el.destroy();
    });
    areaFences = [];
  };
  // 渲染地区围栏
  const fnArerFence = (bounds) => {
    destroyAreaFence();
    if (bounds) {
      for (let i = 0, l = bounds.length; i < l; i++) {
        const polygon = new AMap.Polygon({
          map: LOAD.mapObj,
          strokeWeight: 1,
          strokeColor: "#0091ea",
          fillColor: "#80d8ff",
          fillOpacity: 0.2,
          path: bounds[i],
        });
        areaFences.push(polygon);
      }
      LOAD.mapObj.setFitView(areaFences); //地图自适应
    }
  };
  // 省市选择改变
  const onProvinceChange = (val) => {
    console.log("省市选择改变", val);
    filterText.value = "";
    if (!val) {
      districtOptions.value = [];
      filterList.value = toRaw(projectList.value);
    } else {
      districtSearch.setLevel("province");
      districtSearch.search(val, function (status, result) {
        if (status == "complete") {
          console.log("根据省市查找信息", result);
          const data = result.districtList[0];
          const { districtList, boundaries } = data;
          districtOptions.value = districtList.map((el) => el.name);
          fnArerFence(boundaries);
        } else {
          districtOptions.value = [];
        }
      });
      filterList.value = toRaw(projectList.value).filter(
        (el) => el["province"] === val
      );
    }
  };
  // 区县选择改变
  const onDistrictChange = (val) => {
    console.log("区县选择改变", val);
    filterText.value = "";
    if (!val) {
      districtOptions.value = [];
      filterList.value = toRaw(projectList.value).filter(
        (el) => el["province"] === val
      );
    } else {
      districtSearch.setLevel("distric");
      districtSearch.search(val, function (status, result) {
        if (status == "complete") {
          console.log("根据区县查找信息", result);
          const data = result.districtList[0];
          const { districtList, boundaries } = data;

          fnArerFence(boundaries);
        } else {
        }
      });
      filterList.value = toRaw(projectList.value).filter(
        (el) => el["city"] === val || el["district"] === val
      );
    }
  };
  // 过滤文字搜索改变
  const onFilterChange = (val) => {
    console.log("过滤文字搜索改变", val);
  };
  // 获取项目列表
  const getProjectList = () => {
    PROJECT.list({ page: 1, pageSize: 9999 }).then((res) => {
      const { results } = res;
      projectList.value = results;
      filterList.value = results;
      console.log("projectList", results);
      // const obj = {};
      // results.forEach((el) => {
      //   const { province, city, district } = el;
      //   const secondLevelStr = city || district;
      //   if (!obj[province]) {
      //     obj[province] = [secondLevelStr];
      //   } else {
      //     obj[province].push(secondLevelStr);
      //   }
      // });
      // optionsTree.value = obj;
    });
  };

  return {
    projectList,
    provinceOptions,
    districtOptions,
    province,
    district,
    filterText,
    filterList,

    onProvinceChange,
    onDistrictChange,
    onFilterChange,
    initMap,
    getProjectList,
  };
};
export default useMain;
