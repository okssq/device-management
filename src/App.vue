<template>
  <router-view />
</template>
<script>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { reactive, provide, shallowReactive } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const LOAD = shallowReactive({
      user: false,
      loginInfo: null,
      map: false,
      mapObj: null,
      mapTeleportTo: "#global-map-wrap",
    });
    provide("LOAD", LOAD);

    const loginInfo = $q.localStorage.getItem("loginInfo");
    const routerPath = $q.localStorage.getItem("router-path");
    LOAD.user = !!loginInfo;
    LOAD.loginInfo = loginInfo;
    router.push(LOAD.user ? routerPath || "/01-01" : "/login");
  },
};
</script>
