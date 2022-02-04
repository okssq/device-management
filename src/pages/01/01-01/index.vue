<template>
  <div class="absolute-full" id="t-map"></div>
  <q-card ref="refInfoWindow" v-show="visible" style="width: 320px">
    <div class="row no-wrap items-center justify-between q-px-md q-py-sm">
      <span class="text-subtitle2 text-bold text-primary">
        {{ tObj[curType] }}-2384tfg45</span
      >
      <q-btn
        round
        flat
        icon="mdi-close"
        color="grey-7"
        dense
        @click="visible = false"
      />
    </div>
    <q-separator />
    <q-list class="text-bold text-grey-10 q-pb-md" dense>
      <q-item>
        <q-item-section side>状态</q-item-section>
        <q-item-section side>
          <q-badge color="green" label="在线" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section side>时间</q-item-section>
        <q-item-section> 2021/12/01 20:02:02</q-item-section>
      </q-item>
      <q-item>
        <q-item-section side> 其他信息</q-item-section>
        <q-item-section> xxxxxxxxxxxx</q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
import { ref, inject, onBeforeUnmount, onMounted } from "vue";
export default {
  setup() {
    const MAP = inject("MAP");
    const MAP_ISLOAD = inject("MAP_ISLOAD");
    const MAP_TELEPORT_TO = inject("MAP_TELEPORT_TO");
    const refInfoWindow = ref(null);
    const visible = ref(false);
    const curType = ref(0);
    const tObj = {
      0: "监控设备",
      1: "打卡设备",
      2: "充电设备",
    };

    let gpsArr = [
      [114.056996, 22.542088],
      [114.057082, 22.5407],
      [114.058369, 22.54074],
      [114.062704, 22.540383],
      [114.062446, 22.542286],
      [114.059099, 22.541929],
    ];
    let markerArr = [];
    let infoWindow;

    const onClick = (e) => {
      const { gps: position, type } = e.target.w;
      curType.value = type;
      visible.value = true;
      infoWindow.setPosition(position);
      infoWindow.open(MAP.value, position);
      MAP.value.panTo(position);
      console.log(type);
    };
    const fnMap = () => {
      // 加载infowindow
      infoWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: false,
        content: refInfoWindow.value.$el,
        anchor: "bottom-center",
        offset: new window.AMap.Pixel(3, 0),
      });
      // 加载marker
      gpsArr.forEach((el, index) => {
        const type = index % 3;
        const marker = new AMap.Marker({
          type,
          gps: el,
          position: el,
          offset: new AMap.Pixel(-10, 0),
          icon: `images/tt${type}.png`, // 添加 Icon 图标 URL
        });
        marker.on("click", onClick);
        MAP.value.add(marker);
        markerArr.push(marker);
      });
      // infoWindow.open(map,[116.401337,39.907886])
      // 加载infoWindow
      setTimeout(() => {
        MAP.value.setFitView(markerArr, false, [60, 60, 60, 60], 17);
      }, 500);
    };
    onMounted(() => {
      MAP_TELEPORT_TO.value = "#t-map";
      fnMap();
    });
    onBeforeUnmount(() => {
      if (!MAP.value) return;
      if (markerArr.length) {
        markerArr.forEach((el) => {
          el.setMap(null);
          el = null;
        });
        markerArr = [];
      }
      MAP.value.clearMap();
      MAP_TELEPORT_TO.value = "#hidden-map";
    });

    return {
      MAP,
      MAP_ISLOAD,
      refInfoWindow,
      visible,
      curType,
      tObj,
    };
  },
};
</script>
