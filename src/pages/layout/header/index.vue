<template>
  <div class="row no-wrap items-center shadow-2 my-header">
    <div class="row no-wrap items-center" style="width: 230px">
      <img
        src="~assets/images/logo.jpg"
        style="width: 40px; margin: 0 3px 0 9px"
      />
      <img src="~assets/images/logo-text.jpg" />
    </div>
    <div class="bd" />
    <crumbs />
    <q-space />
    <qr-code />
    <q-btn-dropdown
      flat
      icon="account_circle"
      color="grey-7"
      :label="LOAD.user ? LOAD.loginInfo.realName : ''"
    >
      <div class="q-pa-sm text-right">
        <q-btn
          class="full-width"
          color="primary"
          label="退出"
          push
          size="sm"
          v-close-popup
          @click="onLoginOut"
        />
      </div>
    </q-btn-dropdown>
  </div>
</template>
<script>
import Crumbs from "./crumbs.vue";
import QrCode from "./qr-code.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { inject } from "vue";
export default {
  components: { Crumbs, QrCode },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const LOAD = inject("LOAD");
    const onLoginOut = () => {
      $q.localStorage.remove("loginInfo");
      $q.localStorage.remove("router-path");
      LOAD.loginInfo = null;
      LOAD.user = false;
      router.push("/login");
    };
    return {
      LOAD,
      onLoginOut,
    };
  },
};
</script>
<style scoped>
.my-header {
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
