<template>
  <div class="absolute-full">
    <global-map @load-success="onMapLoadSuccess"/>
    <q-select
      v-model="province"
      :options="provinceOptions"
      style="top: 15px"
      v-bind="baseSelectProps"
      @update:model-value="onProvinceChange"
    >
      <template #no-option>
        <div class="q-px-md q-py-sm">
          暂无数据
        </div>
      </template>
      <template #prepend>
        <div class="text-body2 q-ml-md">省级</div>
      </template>
      <template #after>
        <div class="q-mr-sm"></div>
      </template>
    </q-select>
    <q-select
      v-model="city"
      :clearable="!(city === '直辖市' || city === '特别行政区')"
      :options="cityOptions"
      style="top: 69px"
      v-bind="baseSelectProps"
      @update:model-value="onCityChange"
    >
      <template #no-option>
        <div class="q-px-md q-py-sm">
          暂无数据
        </div>
      </template>
      <template #prepend>
        <div class="text-body2 q-ml-md">地级：</div>
      </template>
      <template #after>
        <div class="q-mr-sm"></div>
      </template>
    </q-select>
    <q-select
      v-model="district"
      :options="districtOptions"
      style="top: 123px"
      v-bind="baseSelectProps"
      @update:model-value="onDistrictChange"
    >
      <template #no-option>
        <div class="q-px-md q-py-sm">
          暂无数据
        </div>
      </template>
      <template #prepend>
        <div class="text-body2  q-ml-md">县级：</div>
      </template>
      <template #after>
        <div class="q-mr-sm"></div>
      </template>
    </q-select>
    <div
      class="absolute-top-right bg-white shadow-2"
      style="width: 260px; top: 177px; right: 15px; border-radius: 2px"
    >
      <q-input
        v-model="filterText"
        borderless
        class="q-mx-md q-my-xs"
        debounce="500"
        dense
        placeholder="请输入项目名称"
      >
        <template #before>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-separator/>
      <q-list class="overflow-auto" style="max-height: calc(100vh - 292px)">
        <template v-for="item in filterList" :key="item.id">
          <q-item
            :active="selectProjectId === item.id"
            clickable
            @click="onSelectProjectItem(item)"
          >
            <q-item-section>
              <q-item-label lines="2">{{ item.projectName }}</q-item-label>
              <q-item-label caption lines="2">{{
                  item.projectAddress
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator/>
        </template>
        <q-item v-if="!filterList.length">
          <q-item-section>
            <q-item-label caption>暂无匹配数据</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-inner-loading :showing="listLoading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em"/>
      </q-inner-loading>
    </div>
  </div>
</template>
<script>
import {PROJECT, TERMINAL_MAP} from "src/api/module.js";
import {computed, inject, onBeforeUnmount, ref, shallowRef} from "vue";
import GlobalMap from "components/map";
import {notifyWarn} from "src/util/common";

export default {
  components: {
    GlobalMap,
  },
  setup() {
    let districtSearch = null; // 地图查找省市对象
    let cluster = null; //地图点聚合对象
    let projectFenceObj = {} //存储所有项目围栏对象 {围栏ID：地图围栏对象}
    let hasRenderMarkerFenceIds = []; //存储已经加载过项目设备坐标集的项目ID
    let provincePolygons = [], //存取省级围栏[Polygon,Polygon,..]
      cityPolygons = [],     //存取市级围栏[Polygon,Polygon,..]
      districtPolygons = []; //存取县级围栏[Polygon,Polygon,..]

    const listLoading = ref(false)
    const map = inject("map");
    // select下拉框基本属性配置
    const baseSelectProps = {
      class: "aa absolute-top-right bg-white shadow-2",
      dense: true,
      clearable: true,
      borderless: true,
      optionsDense: true,
      style: "right: 15px; width: 260px; border-radius: 2px",
      "popup-content-class": "text-grey-7 select__content",
    };
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


    // 围栏的显示与隐藏
    const fnToggleAreas = (type, flag) => {
      if (type === "province") {
        provincePolygons.forEach((el) => {
          flag ? el.show() : el.hide();
        });
        flag && map.value.setFitView(provincePolygons, true, [20, 20, 20, 300], 22);
        console.log(`${flag ? '显示' : '隐藏'}了省级`)
      } else if (type === "city") {
        cityPolygons.forEach((el) => {
          flag ? el.show() : el.hide();
        });
        flag && map.value.setFitView(cityPolygons, true, [20, 20, 20, 300], 22);
        console.log(`${flag ? '显示' : '隐藏'}了市级`)
      } else if (type === "district") {
        districtPolygons.forEach((el) => {
          flag ? el.show() : el.hide();
        });
        flag && map.value.setFitView(districtPolygons, true, [20, 20, 20, 300], 22);
        console.log(`${flag ? '显示' : '隐藏'}了县级`)
      }
    };
    // 销毁地区围栏
    const destroyFence = (type) => {
      if (type === "province") {
        provincePolygons.forEach((el) => {
          map.value.remove(el)
          el.destroy();
        });
        provincePolygons = []
        console.log('销毁了省级')
      } else if (type === "city") {
        cityPolygons.forEach((el) => {
          map.value.remove(el)
          el.destroy();
        });
        cityPolygons = []
        console.log('销毁了市级')
      } else if (type === "district") {
        districtPolygons.forEach((el) => {
          map.value.remove(el)
          el.destroy();
        });
        districtPolygons = []
        console.log('销毁了县级')
      }
    };
    // 渲染生成地区围栏
    const renderAreaFence = (type, bounds) => {
      const arr = [];
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          const polygon = new AMap.Polygon({
            map: map.value,
            zIndex: 10,
            strokeWeight: 1,
            strokeColor: "#0091ea",
            fillColor: "#80d8ff",
            fillOpacity: 0.1,
            path: bounds[i],
          });
          arr.push(polygon);
        }
        if (type === "province") {
          provincePolygons = arr;
          console.log('生成了省级')
        } else if (type === "city") {
          cityPolygons = arr;
          console.log('生成了市级')
        } else if (type === "district") {
          console.log('生成了县级')
          districtPolygons = arr;
        }
        map.value.setFitView(arr, true, [20, 20, 20, 300], 22); //地图自适应
      }
    };
    // 省级选择改变
    const onProvinceChange = (val) => {
      filterText.value = "";
      city.value = "";
      district.value = "";
      cityOptions.value = [];
      districtOptions.value = [];
      destroyFence("city");
      destroyFence("district");
      destroyFence("province");
      if (!val) {
        map.value.setZoomAndCenter(5, [110.850831, 36.86837, true, false]);
      } else {
        districtSearch.setLevel("province");
        districtSearch.setSubdistrict(2);
        districtSearch.search(val, function (status, result) {
          if (status == "complete") {
            const data = result.districtList[0];
            const {districtList, boundaries, citycode} = data;
            console.log('获取到省级数据', data)
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
                cityOptions.value = ['直辖市'];
                city.value = '直辖市';
                districtOptions.value = arr;
              } else {
                if (districtList) { // 特别行政区
                  districtList.forEach((el) => {
                    arr.push(el["name"]);
                  });
                  cityOptions.value = ["特别行政区"];
                  city.value = "特别行政区";
                  districtOptions.value = arr;
                } else { // 台湾省
                  cityOptions.value = [];
                  city.value = '';
                  districtOptions.value = [];
                }
              }

            }
            renderAreaFence("province", boundaries);
          }
        });
      }
    };
    // 市级选择改变
    const onCityChange = (val) => {
      // console.log("市级选择改变", val);
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
        fnToggleAreas("province", false);
        districtSearch.search(val, function (status, result) {
          if (status == "complete") {
            // console.log("根据市级查找信息", result);
            const data = result.districtList[0];
            const {districtList, boundaries} = data;
            districtOptions.value = districtList.map((el) => el.name);
            renderAreaFence("city", boundaries);
          }
        });
      }
    };
    // 县级选择改变
    const onDistrictChange = (val) => {
      // console.log("县级选择改变", val, typeof val);
      filterText.value = "";
      destroyFence("district");
      if (!val) {
        if (["直辖市", "特别行政区"].includes(city.value)) {
          // console.log(1)
          destroyFence("city");
          fnToggleAreas("province", true);
        } else {
          // console.log(2)
          fnToggleAreas("province", false);
          fnToggleAreas("city", true);
        }
      } else {
        // console.log(3)
        fnToggleAreas("province", false);
        fnToggleAreas("city", false);
        districtSearch.setLevel("district");
        districtSearch.setSubdistrict(1);
        districtSearch.search(val, function (status, result) {
          if (status == "complete") {
            // console.log("根据区县查找信息", result);
            const data = result.districtList[0];
            const {boundaries} = data;
            renderAreaFence("district", boundaries);
          }
        });
      }
    };

    // 渲染所有设备定位图标通过项目
    const renderTerminalsByProject = (projectId) => {
      if (hasRenderMarkerFenceIds.includes(projectId)) {
        // console.log('不需要发送请求项目的所有设备了。')
        projectFenceObj[projectId].clearEvents()
        return;
      }
      TERMINAL_MAP.gpsList({projectId})
        .then((res) => {
          // console.log('根据项目id查询到所有设备定位信息:', res)
          hasRenderMarkerFenceIds.push(projectId);
          projectFenceObj[projectId].clearEvents();
          (res || []).forEach(el => {
            const {type, onlineStatus, terminalId, gpsInfo} = el
            const gpsArr = gpsInfo.split(',');
            const position = new AMap.LngLat(+gpsArr[0], +gpsArr[1])
            // 新建自定义图标
            const icon = new AMap.Icon({
              size: new AMap.Size(36, 40),    // 图标尺寸
              image: `./images/type${type}-status${onlineStatus}.png`,  // Icon的图像
              // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
              imageSize: new AMap.Size(36, 40)   // 根据所设置的大小拉伸或压缩图片
            });
            // // 将 Icon 实例添加到 marker 上:
            new AMap.Marker({
              map: map.value,
              position,
              icon: icon, // 添加 Icon 实例
              title: `设备号：${terminalId}`,
            });
          })
        })
        .catch((err) => {
        });
    }
    // 渲染所有项目围栏
    const renderAllProjectFence = (list) => {
      list.map(el => {
        const {id, path} = el
        const polygon = new AMap.Polygon({
          map: map.value,
          zIndex: 12,
          strokeWeight: 1,
          strokeColor: "#0091ea",
          fillColor: "#80d8ff",
          fillOpacity: 0.3,
          path,
          id,
        });

        polygon.on("click", function () {
          renderTerminalsByProject(id);
        });
        projectFenceObj[id] = polygon;
      })
    }
    // 渲染所有项目点聚合
    const renderAllProjectGps = (points) => {
      const renderMarker = (context) => {
        const {projectName} = context["data"][0];
        const content = `
          <div class="q-badge q-badge--single-line bg-blue q-pa-sm shadow-1">项目：${projectName}</div>
        `;
        context.marker.setContent(content);
      };
      AMap.plugin(["AMap.MarkerCluster"], function () {
        cluster = new AMap.MarkerCluster(map.value, points, {
          gridSize: 80, // 聚合网格像素大小
          maxZoom: 20,
          renderMarker,
        });
      });
    }
    // 获取所有项目信息
    const getAllProjectInfo = () => {
      listLoading.value = true;
      PROJECT.list({page: 1, pageSize: 999}).then(res => {
        const {results} = res;
        const points = []
        const fenceList = []
        results.forEach((el) => {
          const {id, mapStr, projectName} = el;
          const [gpsStr, fenceStr] = mapStr.split(";");
          if (!gpsStr || !fenceStr) return;
          const locationGpsArr = gpsStr.split(",");
          points.push({lnglat: locationGpsArr, id, projectName});
          fenceList.push({
            id,
            path: JSON.parse(fenceStr).map((el) => {
              const {longitude, latitude} = el;
              return new AMap.LngLat(longitude, latitude);
            })
          })
        });
        renderAllProjectGps(points);
        renderAllProjectFence(fenceList);
        projectList.value = results;
        // console.log('渲染所有项目围栏及项目点聚合', results)
      }).finally(() => {
        listLoading.value = false
      })
    }
    // 加载省下拉框列表的所有选项值
    const fnProvinceOption = () => {
      map.value.setZoomAndCenter(5, [110.850831, 36.86837, true, false]);
      AMap.plugin(["AMap.DistrictSearch"], function () {
        districtSearch = new AMap.DistrictSearch({
          level: "country",
          extensions: "all",
          subdistrict: 1,
        });
        districtSearch.search("中国", function (status, result) {
          if (status == "complete") {
            const data = result.districtList[0];
            const {districtList} = data;
            provinceOptions.value = districtList.map((el) => el.name);
          }
        });
      });
    }
    // 当前选择项目改变事件
    const onSelectProjectItem = (row) => {
      const {id} = row;
      selectProjectId.value = id;
      const polygon = projectFenceObj[id]
      if (!polygon) {
        notifyWarn('地图资源加载中，请稍后重试！')
        return
      }
      renderTerminalsByProject(id)
      map.value.setFitView([projectFenceObj[id]], true, [20, 20, 20, 300], 22);
    };
    // 地图加载成功事件
    const onMapLoadSuccess = () => {
      fnProvinceOption();
      getAllProjectInfo();
    };


    onBeforeUnmount(() => {
      if (!map.value) return
      if (cluster) {
        map.value.remove(cluster)
        cluster = null;
      }
      destroyFence("city");
      destroyFence("district");
      destroyFence("province");
    });

    return {
      listLoading,

      baseSelectProps,
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

      onSelectProjectItem,
      onProvinceChange,
      onCityChange,
      onDistrictChange,
      onMapLoadSuccess,
    };
  },
};
</script>
