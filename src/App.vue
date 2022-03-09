<template>
  <router-view/>
</template>
<script>
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {provide, reactive, ref, shallowRef, toRaw} from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const map = shallowRef(null)
    const mapTeleportTo = ref('#global-map-wrap')
    const loginInfo = shallowRef(null)
    const setting = reactive({
      bell: true,
      notify: false,
      voice: false
    })
    provide('map', map)
    provide('mapTeleportTo', mapTeleportTo)
    provide('loginInfo', loginInfo)
    provide('setting', setting)

    const renderSetBell = () => {
      const localSetting = $q.localStorage.getItem("setting");
      if (!localSetting) {
        $q.localStorage.set('setting', toRaw(setting))
      } else {
        setting.bell = !!localSetting['bell']
        setting.notify = !!localSetting['notify']
        setting.voice = !!localSetting['voice']
      }
    }

    const renderLogin = () => {
      const localLoginInfo = $q.localStorage.getItem("loginInfo");
      const routerPath = $q.sessionStorage.getItem("router-path");
      loginInfo.value = localLoginInfo
      router.push(localLoginInfo ? (routerPath || '/map/terminal') : "/login");
    }

    renderSetBell()
    renderLogin()
  },
};
</script>
