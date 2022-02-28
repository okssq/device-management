<template>
  <div class="absolute-full">
    <info-window
      ref="refInfoWindow"
      v-show="infoWindoVisible"
      :data="infoWindoData"
      @close="infoWindoVisible = false"
    />
    <global-map @load-success="onMapLoadSuccess" />
    <div
      class="absolute-top-right shadow-2 bg-white"
      style="max-height: 100%; top: 15px; right: 15px"
    >
      <tab-tree
        v-if="treeNode.length"
        v-model:tab="tab"
        :tree-list="treeList"
        :tree-node="treeNode"
        @update:tab="onTabChange"
        @com-select="onComSelect"
        @prj-select="onPrjSelect"
        @term-select="onTermSelect"
      />
    </div>
  </div>
</template>

<script>
import TabTree from "./tree/index.vue";
import GlobalMap from "components/map/index.vue";
import InfoWindow from "./info-window.vue";
import { LEVEL, TERMINAL_MAP } from "src/api/module";
import {
  ref,
  inject,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  toRaw,
} from "vue";
export default {
  components: {
    TabTree,
    GlobalMap,
    InfoWindow,
  },
  setup() {
    let gpsArr = [];
    let cluster,
      fenceObj = {},
      fencePolygon,
      infoWindow;

    const LOAD = inject("LOAD");

    const refInfoWindow = ref(null);
    const infoWindoVisible = ref(false);
    const infoWindoData = shallowRef(null);

    const tab = ref(0);
    const treeList = shallowRef([]);
    const treeNode = shallowRef([]);
    const FORMAT_VEHICLE_TREE = (oldArr, pIndex, vList = [], vObj = {}) => {
      const tree = [];
      let count = 0;
      let offlineCount = 0;
      let noVehicleCompanyCount = 0;
      oldArr.forEach((el, index) => {
        const { id, label, type, children, others } = el;
        const treeItem = { label, type };
        if (type == 1 || type == 2) {
          const _index =
            pIndex === undefined ? `${index}` : `${pIndex}-${index}`;
          treeItem["id"] = `${type == 1 ? "com" : "prj"}_${id}`;
          treeItem["index"] = _index;
          treeItem["count"] = 0;
          treeItem["offlineCount"] = 0;
          treeItem["onlineCount"] = 0;
          tree.push(treeItem);
          if (children) {
            const {
              tree: subTree,
              count: subCount,
              offlineCount: subOfflineCount,
            } = FORMAT_VEHICLE_TREE(children, _index, vList, vObj);
            if (subCount) {
              subTree.length && (treeItem.children = subTree);
              count += subCount;
              offlineCount += subOfflineCount;
              treeItem.count = subCount;
              treeItem.offlineCount = subOfflineCount;
              treeItem.onlineCount = subCount - subOfflineCount;
            } else {
              noVehicleCompanyCount += 1;
            }
          }
        } else if (type == 3) {
          const _index =
            pIndex === undefined
              ? index - noVehicleCompanyCount
              : `${pIndex}-${index - noVehicleCompanyCount}`;
          const status = others.onlineStatus;
          const termType = others.type;
          vList.push({
            id: "term_" + id,
            label,
            status,
            index: _index,
            termType,
          });
          vObj[`term_${id}`] = { label, status, index: _index };
          tree.push({
            id: "term_" + id,
            label,
            type,
            status,
            index: _index,
            termType,
          });
          count += 1;
          if (status === 0) offlineCount += 1;
        }
      });
      return { tree, count, offlineCount, vList, vObj };
    };

    // 渲染项目围栏
    const fnProjectFence = (row) => {
      const { id } = row;
      const pId = id.slice(4);
      if (fenceObj[pId]) {
        Object.keys(fenceObj).forEach((key) => {
          if (key === pId) {
            fenceObj[key].show();
            LOAD.mapObj.setFitView(fenceObj[key]);
          } else {
            fenceObj[key].hide();
          }
        });
      } else {
        TERMINAL_MAP.projectBounds({
          list: [pId],
        }).then((res) => {
          console.log("bianjie", res);
          const result = res[0];
          if (!result) return;
          const { mapStr } = result;
          const [gps, fenceStr] = mapStr.split(";");
          const path = JSON.parse(fenceStr).map((el) => {
            const { longitude, latitude } = el;
            return new AMap.LngLat(longitude, latitude);
          });
          const polygon = new AMap.Polygon({
            map: LOAD.mapObj,
            zIndex: 12,
            strokeWeight: 1,
            strokeColor: "#0091ea",
            fillColor: "#80d8ff",
            fillOpacity: 0.3,
            path,
          });
          fenceObj[pId] = polygon;
          LOAD.mapObj.setFitView(polygon);
        });
      }
    };
    // 渲染infoWindow
    const fnInfowWindow = (row) => {
      if (!infoWindow) {
        infoWindow = new window.AMap.InfoWindow({
          isCustom: true,
          autoMove: false,
          content: refInfoWindow.value.$el,
          anchor: "bottom-center",
          offset: new window.AMap.Pixel(3, -30),
        });
      }
      const { id } = row;
      const tId = id.slice(5);
      TERMINAL_MAP.gpsList({
        terminalIds: [tId],
      }).then((res) => {
        const { gpsInfo, projectId } = res[0];
        fnProjectFence({ id: `prj_${projectId}` });
        // const arr = gpsInfo.split(",");
        // const gps = new AMap.LngLat(arr[0], arr[1]);
        // infoWindoData.value = res[0];
        // infoWindoVisible.value = true;
        // infoWindow.setPosition(gps);
        // infoWindow.open(LOAD.mapObj, gps);
        // LOAD.mapObj.panTo(gps);

        setTimeout(() => {
          const arr = gpsInfo.split(",");
          const gps = new AMap.LngLat(arr[0], arr[1]);
          infoWindoData.value = res[0];
          infoWindoVisible.value = true;
          infoWindow.setPosition(gps);
          infoWindow.open(LOAD.mapObj);
        }, 500);
        console.log("获取当前设备详情信息", res);
      });

      //
    };

    // 渲染点聚合
    const fnMarkerCluster = (arr) => {
      const points = arr.map((el) => {
        const { gpsInfo } = el;
        const lnglat = gpsInfo.split(",");
        return {
          ...el,
          lnglat,
        };
      });
      const count = points.length;
      const renderClusterMarker = (context) => {
        const factor = Math.pow(context.count / count, 1 / 18);
        const div = document.createElement("div");
        const Hue = 180 - factor * 180;
        const bgColor = "hsla(" + Hue + ",100%,40%,0.7)";
        const fontColor = "hsla(" + Hue + ",100%,90%,1)";
        const borderColor = "hsla(" + Hue + ",100%,40%,1)";
        const shadowColor = "hsla(" + Hue + ",100%,90%,1)";
        div.style.backgroundColor = bgColor;
        const size = Math.round(
          30 + Math.pow(context.count / count, 1 / 5) * 20
        );
        div.style.width = div.style.height = size + "px";
        div.style.border = "solid 1px " + borderColor;
        div.style.borderRadius = size / 2 + "px";
        div.style.boxShadow = "0 0 5px " + shadowColor;
        div.innerHTML = context.count;
        div.style.lineHeight = size + "px";
        div.style.color = fontColor;
        div.style.fontSize = "14px";
        div.style.textAlign = "center";
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
        context.marker.setContent(div);
      };
      const renderMarker = (context) => {
        const { type, onlineStatus } = context["data"][0];
        var content = `
          <img src="./images/type${type}-status${onlineStatus}.png">
        `;

        // var offset = new AMap.Pixel(-9, -9);
        context.marker.setContent(content);
        // context.marker.setOffset(offset);
      };
      AMap.plugin(["AMap.MarkerCluster"], function () {
        cluster = new AMap.MarkerCluster(LOAD.mapObj, points, {
          gridSize: 80, // 聚合网格像素大小
          maxZoom: 22,
          // renderClusterMarker, // 自定义聚合点样式
          renderMarker, // 自定义非聚合点样式
        });
        cluster.on("click", function (obj) {
          console.log("a", obj);
          const { clusterData } = obj;
          if (clusterData.length !== 1) return;
          const row = clusterData[0];
          fnInfowWindow({ id: `term_${row["terminalId"]}` });
        });
      });
    };

    // 获取树数据
    const getTreeData = () => {
      LEVEL.treeList().then((res) => {
        const { tree, vList } = FORMAT_VEHICLE_TREE([res]);
        treeList.value = vList;
        treeNode.value = tree;
      });
    };
    // 获取GPS点信息by-companyeId/projectId,terminaslId,
    const getGpsData = (param) => {
      TERMINAL_MAP.gpsList(param)
        .then((res) => {
          gpsArr = JSON.parse(JSON.stringify(res));
          fnMarkerCluster(gpsArr);
          console.log("gpsList", res);
        })
        .catch(() => {});
    };

    // 全部/在线/离线选项卡改变事件
    const onTabChange = (val) => {};
    // 公司选择改变事件
    const onComSelect = (item) => {
      console.log("item", item);
    };
    // 项目选择改变事件
    const onPrjSelect = (item) => {
      console.log("item", item);
      fnProjectFence(item);
    };
    // 设备选择改变事件
    const onTermSelect = (item) => {
      console.log("item", item);
      fnInfowWindow(item);
    };
    // 地图加载完成事件
    const onMapLoadSuccess = () => {
      LOAD.mapObj.setZoomAndCenter(5, [110.850831, 36.86837]);
      // LOAD.mapObj.setFitView([], false, [60, 60, 60, 300], 5);
      getGpsData();
      getTreeData();
    };

    onMounted(() => {});
    onBeforeUnmount(() => {
      if (cluster) {
        cluster.clearEvents("click");
        cluster.setMap(null);
        cluster = null;
      }
    });

    return {
      refInfoWindow,
      infoWindoVisible,
      infoWindoData,

      tab,
      treeList,
      treeNode,

      onTabChange,
      onComSelect,
      onPrjSelect,
      onTermSelect,
      onMapLoadSuccess,
    };
  },
};
</script>
