<template>
  <div class="login-form-wrap">
    <q-form class="q-gutter-xs login-form" @submit="onSubmit">
      <div class="q-ma-none q-pb-md q-pt-xs text-center text-subtitle1 text-grey-9 text-bold">
        智慧设备管控平台
      </div>
      <q-input
        v-model="name"
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
        autofocus
        dense
        lazy-rules
        outlined
      >
        <template #prepend>
          <q-icon name="person_outline" size="16px"/>
          <div class="text-caption text-grey-7 text-bold">用户名:</div>
        </template>
      </q-input>
      <q-input
        v-model="pass"
        :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
        dense
        lazy-rules
        outlined
        type="password"
      >
        <template #prepend>
          <q-icon name="o_lock" size="14px"/>
          <div class="text-caption text-grey-7 text-bold">密码:</div>
        </template>
      </q-input>
      <div class="row no-wrap">
        <q-btn
          :loading="loading"
          class="flex1"
          color="primary"
          label="登录"
          type="submit"
          unelevated
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import {inject, ref} from "vue";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {login} from "src/api/module";
import {notifySuccess} from "src/util/common";

export default {
  emits: ["ok"],
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const loginInfo = inject('loginInfo');
    loginInfo.value = null;

    const name = ref("");
    const pass = ref("");
    const loading = ref(false);


    const fnLogin = (res) => {
      $q.localStorage.set("loginInfo", res);
      loginInfo.value = res
      router.push('/');
      notifySuccess("登录成功！");
    };
    const onSubmit = () => {
      loading.value = true;
      login
        .login({
          userName: name.value,
          password: pass.value,
        })
        .then((res) => {
          fnLogin(res);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    return {
      name,
      pass,
      loading,
      onSubmit,
    };
  },
};
</script>
<style scoped>
.login-form-wrap {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -70%);
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  box-sizing: content-box;
  width: 300px;
}

.login-form {
  background: #fff;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: translate(20px);
  padding: 10px 24px 24px 20px;
  margin: 0 0 0 -20px;
  border-radius: 4px;
}
</style>
