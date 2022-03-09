<template>
  <q-separator inset vertical/>
  <q-btn-dropdown
    :label="loginInfo ? loginInfo.realName : ''"
    class="q-mx-sm"
    flat
  >
    <div class="q-ma-md text-right">
      <q-btn
        v-close-popup
        class="full-width "
        color="primary"
        label="退出"
        size="sm"
        unelevated
        @click="onLoginOut"
      />
    </div>
  </q-btn-dropdown>
</template>

<script>
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {inject} from "vue";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loginInfo = inject("loginInfo");
    const onLoginOut = () => {
      $q.localStorage.remove("loginInfo");
      loginInfo.value = null
      router.push("/login");
    };
    return {
      loginInfo,
      onLoginOut,
    };
  }
}
</script>
