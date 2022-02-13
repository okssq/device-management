<template>
  <q-btn flat size="12px" color="grey-7" icon="qr_code">
    <q-tooltip class="bg-blue-10" :offset="[10, 6]"> 扫码下载APP </q-tooltip>
    <q-menu
      class="z-max"
      anchor="bottom middle"
      self="top middle"
      :offset="[0, 6]"
    >
      <q-list dense>
        <q-item-label header>手机浏览器扫码下载</q-item-label>
        <q-separator />
        <q-item tag="label" v-ripple v-for="item in qrCodes" :key="item.src">
          <q-item-section side style="margin-right: -20px">
            <q-icon :name="item.icon" size="20px"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label header>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-tooltip
            class="z-max bg-grey-1 shadow-9"
            anchor="center left"
            self="center end"
            transition-show="fade"
            transition-hide="fade"
          >
            <q-img class="q-pd-md" width="140px" height="140px" :src="item.src">
            </q-img>
          </q-tooltip>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
export default {
  setup() {
    const qrCodes = [
      {
        icon: "airplay",
        label: "平台APP(苹果版)",
        src: "https://web.idas168.com/cdn/img/qrcode/plat-app-ios.png",
      },
      {
        icon: "android",
        label: "平台APP(安卓版)",
        src: "https://web.idas168.com/cdn/img/qrcode/plat-app.png",
      },
      {
        icon: "android",
        label: "装机APP(安卓版)",
        src: "https://web.idas168.com/cdn/img/qrcode/install-app.png",
      },
    ];
    return {
      qrCodes,
    };
  },
};
</script>
