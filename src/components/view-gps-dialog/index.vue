<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 800px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">查看设备定位信息</div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator/>
          <div style="height: 450px">
            <global-map @load-success="onMapLoadSuccess"/>
          </div>
        </q-card>
      </div>
    </div>
  </teleport>
</template>
<script>
import GlobalMap from "components/map";
import {inject, onBeforeUnmount, toRaw} from "vue";
import {TERMINAL_MAP} from 'src/api/module'
import {notifyWarn} from "src/util/common";

export default {
  emits: ["cancel"],
  components: {
    GlobalMap,
  },
  props: {
    gpsData: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    const map = inject("map");
    let icon = null;
    let marker = null;
    let infoWindow = null;
    let position = null;
    const typeText = {
      1: "座椅",
      2: "储物柜",
      3: "充电桩",
      4: "大屏",
    };
    // 生成从高德api获取到的地址后的content,
    const getFormatContent = () => {
      AMap.plugin("AMap.Geocoder", () => {
        let geocoder = new AMap.Geocoder();
        geocoder.getAddress(position, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            const row = toRaw(props.gpsData);
            let content = `
              <div class="row items-center no-wrap q-my-xs">
                <div style="min-width:75px" class="text-right">设备ID：</div>
                <div>${row.terminalId}</div>
              </div>
              <div class="row items-center no-wrap  q-mb-xs">
                <div style="min-width:75px" class="text-right">设备类型：</div>
                <div>${typeText[row.type] || "未知类型"}</div>
              </div>
              <div class="row items-center no-wrap q-mb-xs">
                <div style="min-width:75px" class="text-right">所属项目：</div>
                <div>${row.projectName}</div>
              </div>
              <div class="row items-center no-wrap q-mb-xs">
                <div style="min-width:75px" class="text-right">所属公司：</div>
                <div>${row.companyName}</div>
              </div>
              <div class="row items-center no-wrap q-mb-xs">
                <div style="min-width:75px" class="text-right">上传时间：</div>
                <div>${row.onlineTime}</div>
              </div>
              <div class="row items-start no-wrap">
                <div style="min-width:75px" class="text-right">上传位置：</div>
                <div>${result.regeocode.formattedAddress}</div>
              </div>
            `;
            infoWindow.setContent(
              `<div style="max-width: 280px" class="text-capitalize text-grey-9 text-bold">${content}</div>`
            );
          }
          geocoder = null;
          map.value.panBy(0, 50);
        });
      });
    };
    const openInfoWindow = () => {
      infoWindow && infoWindow.open(map.value);
    };
    // 渲染自定义小车
    const fnMaker = () => {
      const {type, onlineStatus} = toRaw(props.gpsData)
      icon = new AMap.Icon({
        size: new AMap.Size(36, 40),
        image: `./images/type${type}-status${onlineStatus}.png`,
        imageSize: new AMap.Size(36, 40),
      });
      const row = toRaw(props.gpsData);
      const {gpsInfo} = row;
      const gpsArr = gpsInfo.split(",");
      const arr = [Number(gpsArr[0]), Number(gpsArr[1])];
      position = new AMap.LngLat(arr[0], arr[1]);

      if (!marker) {
        marker = new AMap.Marker({
          position,
          map: map.value,
          icon,
          offset: new AMap.Pixel(-18, 0),
        });
      } else {
        marker.setPosition(position);
      }
      marker.off("click", openInfoWindow);
      marker.on("click", openInfoWindow);
      // map.value.setCenter(position, true, false);
    };
    // 渲染自定义卡片
    const fnInfoWindow = () => {
      if (infoWindow) {
        infoWindow.close();
      }
      if (!infoWindow) {
        infoWindow = new AMap.InfoWindow({
          position,
          retainWhenClose: true,
          closeWhenClickMap: true,
          showShadow: true,
          content: "获取信息中...</br>加载内容中...",
        });
      } else {
        infoWindow.setPosition(position);
      }
      infoWindow.open(map.value);
      getFormatContent();
    };
    // 渲染围栏
    const fnPolygon = () => {
      const item = toRaw(props.gpsData)
      const {projectId} = item
      TERMINAL_MAP.projectBounds({
        list: [projectId]
      }).then(res => {
        if (!(res || []).length) return
        const {mapStr} = res[0]
        if (mapStr) {
          const [gpsStr, fenceStr] = mapStr.split(";");
          if (!fenceStr) {
            notifyWarn('项目围栏地址不存在!')
            return;
          }
          try {
            const path = JSON.parse(fenceStr).map((el) => {
              const {longitude, latitude} = el;
              return new AMap.LngLat(longitude, latitude);
            });

            new window.AMap.Polygon({
              path,
              map: map.value,
              draggable: false,
              fillColor: '#7bccc4',
              strokeOpacity: 1,
              fillOpacity: 0.3,
              strokeColor: '#2b8cbe',
              strokeWeight: 2,
              strokeStyle: 'dashed',
              strokeDasharray: [5, 5],
            });
            setTimeout(() => {
              map.value.setFitView(false, true)
            });
          } catch (e) {
            console.log("error", e);
            notifyWarn('渲染项目围栏错误!')
          }
        }
        console.log('查询项目边界', mapStr)
      })
    }
    const onMapLoadSuccess = () => {
      fnMaker();
      fnInfoWindow();
      fnPolygon()
    };


    onBeforeUnmount(() => {
      icon && (icon = null);
      if (marker) {
        marker.off("click", openInfoWindow);
        marker.setMap(null);
        marker = null;
      }
      if (infoWindow) {
        infoWindow.close();
        map.value.clearInfoWindow();
        infoWindow = null;
      }
      position = null;
      map.value.clearMap();
    });

    return {
      onMapLoadSuccess
    }
  },
};
</script>
