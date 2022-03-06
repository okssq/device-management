<template>
  <router-view />
</template>
<script>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, shallowRef, provide, shallowReactive } from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const map = shallowRef(null)
    const mapTeleportTo = ref('#global-map-wrap')
    const loginInfo = shallowRef(null)
    provide('map',map)
    provide('mapTeleportTo',mapTeleportTo)
    provide('loginInfo',loginInfo)


    const localLoginInfo = $q.localStorage.getItem("loginInfo");
    const routerPath = $q.localStorage.getItem("router-path");
    loginInfo.value = localLoginInfo
    router.push(!!localLoginInfo ? routerPath || "/map/terminal" : "/login");
  },
};
</script>
