<template>
  <div class="row no-wrap items-center shadow-2 my-header">
    <div class="row no-wrap items-center" style="width: 220px">
      <img
        src="~assets/images/logo.jpg"
        style="width: 40px; margin: 0 3px 0 9px"
      />
      <img src="~assets/images/logo-text.jpg" class="gt-xs" />
    </div>
    <div class="bd" />
    <crumbs />
    <q-space />
    <qr-code />
    <q-btn-dropdown flat icon="account_circle" color="grey-7" label="Admin">
      <div class="q-pa-sm text-right">
        <q-btn
          class="full-width"
          color="primary"
          label="退出"
          push
          size="sm"
          v-close-popup
          to="/login"
        />
      </div>
    </q-btn-dropdown>
  </div>
</template>
<script>
import Crumbs from "./crumbs.vue";
import QrCode from "./qr-code.vue";
export default {
  components: { Crumbs, QrCode },
  setup() {
    const handleSelect = () => {};
    return {};
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
