<template>
  <div class="absolute-full">
    <global-map @load-success="onMapLoadSuccess"/>
    <info-window
      v-show="infoWindowVisible"
      ref="refInfoWindow"
      :data="infoWindowData"
      :loading="infoWindowLoading"
      @close="infoWindowVisible = false"
    />
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
    <q-resize-observer @resize="onResize"/>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>

<script>

import GlobalMap from "components/map/index.vue";
import TabTree from "./tree/index.vue";
import InfoWindow from "./info-window.vue";
import {LEVEL, TERMINAL_MAP} from "src/api/module";
import {notifyWarn} from "src/util/common";
import {inject, onBeforeUnmount, ref, shallowRef,} from "vue";


export default {
  components: {
    GlobalMap,
    TabTree,
    InfoWindow
  },
  setup() {
    let allPoints = []; // 存储所有GPS点 [{设备ID,lnglat,项目ID,...详细信息}]
    let allFenceObj = {}; // 存储所有围栏对象 {围栏ID：地图围栏对象}
    let cluster = null;  // 点聚合地图对象
    let infoWindow = null; // 信息窗口地图对象
    let width = 0;   // 地图宽度
    let height = 0; // 地图高度
    let firstProjectId = null //第一个项目ID

    const currentTerminalId = ref('')
    const loading = ref(true)
    const map = inject("map");
    const loginInfo = inject('loginInfo')

    const tab = ref(0);
    const treeList = shallowRef([]);
    const treeNode = shallowRef([]);

    const refInfoWindow = ref(null);
    const infoWindowLoading = ref(false);
    const infoWindowVisible = ref(false);
    const infoWindowData = shallowRef(null);


    // 格式化树列表所需要的数据格式
    const formatTreeData = (oldArr, pIndex, vList = [], vObj = {}) => {
      const tree = [];
      let count = 0;
      let offlineCount = 0;
      let noVehicleCompanyCount = 0;
      oldArr.forEach((el, index) => {
        const {id, label, type, children, others} = el;
        const treeItem = {label, type};
        if (type == 1 || type == 2) {
          const _index =
            pIndex === undefined ? `${index}` : `${pIndex}-${index}`;
          if (type == 2 && !firstProjectId) {
            firstProjectId = id
          }
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
            } = formatTreeData(children, _index, vList, vObj);
            subTree.length && (treeItem.children = subTree);
            if (subCount) {
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
          vObj[`term_${id}`] = {label, status, index: _index};
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
      return {tree, count, offlineCount, vList, vObj};
    };
    // 渲染tab页面对应[全部/在线/离线]GPS点
    const renderTabGps = (type) => {
      map.value.setZoomAndCenter(5, [110.850831, 36.86837], true, false);
      let data = []
      if (type === 0) {
        data = JSON.parse(JSON.stringify(allPoints))
      } else if (type === 1) {
        data = JSON.parse(JSON.stringify(allPoints.filter(el => {
          return el['onlineStatus'] === '1'
        })))
      } else if (type === 2) {
        data = JSON.parse(JSON.stringify(allPoints.filter(el => {
          return el['onlineStatus'] === '0'
        })))
      }
      cluster.setData(data)
    }
    // 渲染自定义卡片
    const renderInfoWindow = (row) => {
      const {id} = row;
      const tId = id.slice(5);

      const findItem = allPoints.find(el => el.terminalId === tId)
      if (!findItem) {
        notifyWarn('没有查询到设备坐标')
        return false
      }
      currentTerminalId.value = tId
      infoWindowLoading.value = true
      infoWindowVisible.value = true;
      const {lnglat} = findItem
      const position = JSON.parse(JSON.stringify(lnglat));
      console.log('定位到设备ID：', tId, '坐标：', position)
      if (!infoWindow) {
        infoWindow = new window.AMap.InfoWindow({
          isCustom: true,
          autoMove: false,
          content: refInfoWindow.value.$el,
          offset: new window.AMap.Pixel(9, -40),
          position
        });
      }
      infoWindow.close()


      setTimeout(function () {
        infoWindow.open(map.value, position, 30);
      }, 400);

      map.value.setZoomAndCenter(30, position, true, false)
      // (树列表宽度340+树列表左右各15+卡片320+卡片左右各12 = 914)
      // (卡片高度250+marker高度40 = 300)
      // (height/2) - (( height - 300 ) / 2 )
      const panLeft = width < 914 ? -(width / 4) : -((width / 2) - ((width - 340 - 30) / 2))
      const panTop = (height / 2) - ((height - 300) / 2)
      map.value.panBy(panLeft, panTop)


      TERMINAL_MAP.gpsList({terminalIds: [tId],})
        .then((res) => {
          if (currentTerminalId.value && res[0]['terminalId'] !== currentTerminalId.value) {
            return false
          }
          infoWindowData.value = res[0];
          console.log("获取当前设备详情信息", res[0]);
        }).finally(() => {
        infoWindowLoading.value = false
      });

      //
    };
    // 渲染树
    const renderTree = () => {
      getTreeData().then(res => {
        const {tree, vList} = formatTreeData([res]);
        treeList.value = vList;
        treeNode.value = tree;
        if (firstProjectId && allFenceObj[firstProjectId] && loginInfo.value.companyId != 1) {
          console.log('定位到第一个项目ID围栏：', firstProjectId)
          map.value.setFitView(allFenceObj[firstProjectId], true, [60, 60, 60, 400], 20);
        }
      }).catch(err => {
        console.log('<<getTreeData err>>', err)
      }).finally(() => {
        loading.value = false
      })
    }
    // 渲染所有gps点
    const renderAllGps = (list) => {
      console.log('list', list);
      list.forEach((el) => {
        console.log('el', el)
        const {gpsInfo} = el;
        if (gpsInfo) {
          const gpsArr = gpsInfo.split(",");
          if (gpsArr.length === 2) {
            allPoints.push({
              ...el,
              lnglat: gpsArr
            })
          }
        }
      });
      const renderMarker = (context) => {
        const {type, onlineStatus} = context["data"][0];
        const content = `
          <img style="width: 36px" src="./images/type${type}-status${onlineStatus}.png">
        `;
        context.marker.setContent(content);
      };
      AMap.plugin(["AMap.MarkerCluster"], function () {
        cluster = new AMap.MarkerCluster(
          map.value,
          JSON.parse(JSON.stringify(allPoints)),
          {
            gridSize: 80, // 聚合网格像素大小
            maxZoom: 20,
            renderMarker, // 自定义非聚合点样式
          }
        );
        cluster.on("click", function (obj) {
          const {clusterData} = obj;
          if (clusterData.length === 1) {
            const row = clusterData[0];
            renderInfoWindow({id: `term_${row["terminalId"]}`});
          }
        });
      });
    }
    // 渲染所有项目围栏
    const renderAllFence = (list) => {
      list.map((el, index) => {
        const {projectId, mapStr} = el
        const [gps, fenceStr] = mapStr.split(";");
        if (!fenceStr) return
        const path = JSON.parse(fenceStr).map((el) => {
          const {longitude, latitude} = el;
          return new AMap.LngLat(longitude, latitude);
        });
        const polygon = new AMap.Polygon({
          map: map.value,
          zIndex: 12,
          strokeWeight: 1,
          strokeColor: "#0091ea",
          fillColor: "#80d8ff",
          fillOpacity: 0.3,
          path,
        });
        allFenceObj[projectId] = polygon;
      })
    }
    // 获取所有GPS点
    const getAllGps = () => TERMINAL_MAP.gpsList()
    // 获取所有项目边界
    const getAllFence = () => TERMINAL_MAP.projectBounds()
    // 获取树数据
    const getTreeData = () => LEVEL.treeList()

    // 全部/在线/离线选项卡改变事件
    const onTabChange = (val) => {
      infoWindowVisible.value = false
      renderTabGps(val)
    };
    // 公司选择改变事件
    const onComSelect = (item) => {
      // console.log("item", item);
    };
    // 项目选择改变事件
    const onPrjSelect = (item) => {
      infoWindowVisible.value = false;
      const projectId = item.id.slice(4);
      map.value.setFitView(allFenceObj[projectId], true, [60, 60, 60, 400], 20);
    };
    // 设备选择改变事件
    const onTermSelect = (item) => {
      // console.log("设备选择改变事件", item);
      renderInfoWindow(item)
    };
    // 地图加载完成事件
    const onMapLoadSuccess = () => {

      console.log('定位到5层级地图！')
      Promise.all([getAllGps(), getAllFence()])
        .then(([gpsData, fenceData]) => {
          // console.log('gpsData', gpsData)
          // console.log('fenceData', fenceData)
          map.value.setZoomAndCenter(5, [110.850831, 36.86837], true, false);
          renderAllGps(gpsData)
          renderAllFence(fenceData)
          renderTree()
        }).catch(err => {
        loading.value = false
        console.log('<<onMapLoadSuccess => Promise.all事件发生错误>> ', err)
      })
    };
    // 地图窗口大小改变事件
    const onResize = (size) => {
      width = size.width
      height = size.height
    }

    onBeforeUnmount(() => {
      if (!map.value) return
      console.log('清除设备分布页面生成的地图对象~~')
      if (infoWindow) {
        infoWindow.clearEvents()
        map.value.remove(infoWindow)
        infoWindow = null
      }
      if (cluster) {
        cluster.clearEvents();
        map.value.remove(cluster)
        cluster = null;
      }
      allPoints = null
      allFenceObj = null
    });

    return {
      loading,

      tab,
      treeList,
      treeNode,

      refInfoWindow,
      infoWindowVisible,
      infoWindowLoading,
      infoWindowData,

      onMapLoadSuccess,
      onResize,
      onTabChange,
      onComSelect,
      onPrjSelect,
      onTermSelect,
    };
  },
};
</script>
