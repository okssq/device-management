<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-positon overflow-hidden"
          style="width: 500px; max-width: 98vw"
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
          <q-separator />
          <div style="height: 320px">
            <global-map></global-map>
          </div>
        </q-card>
      </div>
    </div>
  </teleport>
</template>
<script>
import GlobalMap from "components/map/index.vue";
import { inject, onMounted, onBeforeUnmount, toRaw } from "@vue/runtime-core";
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
    const LOAD = inject("LOAD");
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
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">设备类型：</div>
                <div class="text-primary ellipsis-3-lines">${
                  typeText[row.type] || "未知类型"
                }</div>
              </div>
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">设备ID：</div>
                <div class="text-primary ellipsis-3-lines">${
                  row.terminalId
                }</div>
              </div>
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">所属项目：</div>
                <div class="text-primary ellipsis-3-lines">${
                  row.projectName
                }</div>
              </div>
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">所属公司：</div>
                <div class="text-primary ellipsis-3-lines">${
                  row.companyName
                }</div>
              </div>
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">上传时间：</div>
                <div class="text-primary ellipsis-3-lines">${
                  row.onlineTime
                }</div>
              </div>
              <div class="flex q-pb-sm">
                <div class="text-no-wrap text-bold">上传位置：</div>
                <div class="text-primary ellipsis-3-lines">${
                  result.regeocode.formattedAddress
                }</div>
              </div>
            `;

            infoWindow.setContent(
              `<div class="q-pl-sm q-py-sm text-subtitle2"">${content}</div>`
            );
          }
          geocoder = null;
          LOAD.mapObj.panBy(0, 50);
        });
      });
    };
    const openInfoWindow = () => {
      infoWindow && infoWindow.open(LOAD.mapObj);
    };
    // 渲染自定义小车
    const fnMaker = () => {
      icon = new AMap.Icon({
        size: new AMap.Size(32, 32),
        image: require("./point.png"),
        imageSize: new AMap.Size(32, 32),
      });
      const row = toRaw(props.gpsData);
      const { gpsInfo } = row;
      const gpsArr = gpsInfo.split(",");
      const arr = [Number(gpsArr[0]), Number(gpsArr[1])];
      position = new AMap.LngLat(arr[0], arr[1]);

      if (!marker) {
        marker = new AMap.Marker({
          position,
          map: LOAD.mapObj,
          icon,
          offset: new AMap.Pixel(-18, 0),
        });
      } else {
        marker.setPosition(position);
      }
      marker.off("click", openInfoWindow);
      marker.on("click", openInfoWindow);
      LOAD.mapObj.setCenter(position,true,false);
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
      infoWindow.open(LOAD.mapObj);
      getFormatContent();
    };

    onMounted(() => {
      fnMaker();
      fnInfoWindow();
    });

    onBeforeUnmount(() => {
      icon && (icon = null);
      if (marker) {
        marker.off("click", openInfoWindow);
        marker.setMap(null);
        marker = null;
      }
      if (infoWindow) {
        infoWindow.close();
        LOAD.mapObj.clearInfoWindow();
        infoWindow = null;
      }
      position = null;
      LOAD.mapObj.clearMap();
    });
  },
};
</script>
