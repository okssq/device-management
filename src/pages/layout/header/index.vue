<template>
  <div class="row no-wrap items-center shadow-2 my-header">
    <div class="row no-wrap items-center">
      <img
        src="~assets/images/logo.jpg"
        alt
        style="width: 40px; margin: 0 3px 0 9px"
      />
      <img src="~assets/images/logo-text.jpg" class="gt-xs" alt />
    </div>
    <!-- <q-separator vertical style="height: 30px" /> -->
    <div class="bd" />
    <q-btn
      flat
      round
      dense
      class="text-grey-7"
      icon="menu"
      @click="NAV_ISMINI = !NAV_ISMINI"
    />
    <div class="bd" />
    <crumbs />
    <q-space />
    <q-btn-dropdown flat icon="account_circle" color="primary" label="Admin">
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
import { inject } from "@vue/runtime-core";
import Crumbs from "./crumbs.vue";
export default {
  components: { Crumbs },
  setup() {
    const NAV_ISMINI = inject("NAV_ISMINI");
    const handleSelect = () => {};
    return {
      NAV_ISMINI,
    };
  },
};
</script>
<style>
.my-header {
  height: 56px;
  z-index: 11;
}
.bd {
  width: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  height: 12px;
  margin: 0 16px;
}
</style>
