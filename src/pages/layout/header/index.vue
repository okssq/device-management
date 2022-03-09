<template>
  <div class="row no-wrap items-center shadow-1 layout-header">
    <div class="row no-wrap items-center" style="width: 230px">
      <img
        src="~assets/images/logo.jpg"
        style="width: 40px; margin: 0 3px 0 9px"
      />
      <img src="~assets/images/logo-text.jpg"/>
    </div>
    <div class="bd gt-sm"/>
    <crumbs/>
    <q-space/>
    <div class="q-px-xs text-grey-7 row no-wrap">
      <!--二维码-->
      <qrcode/>
      <!--铃铛与设置-->
      <set-bell/>
      <!--用户名-->
      <user/>
    </div>

  </div>
</template>
<script>

import Crumbs from "./crumbs.vue";
import Qrcode from './qrcode.vue'
import SetBell from "./set-bell.vue";
import User from "./user.vue";


export default {
  components: {
    User,
    SetBell,
    Crumbs,
    Qrcode,
  },
  setup() {

  },
};
</script>
<style scoped>
.layout-header {
  height: 56px;
  z-index: 11;
}

.bd {
  width: 1px;
  background-color: #75757590;
  height: 10px;
  margin-right: 16px;
}
</style>
