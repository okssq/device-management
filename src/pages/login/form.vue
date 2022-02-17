<template>
  <div class="login-form-wrap">
    <q-form @submit="onSubmit" class="q-gutter-xs login-form">
      <!-- <div
        class="full-width row justify-center items-center"
        style="margin-bottom: 20px; margin-top: 10px"
      > -->
      <div class="q-py-md text-center text-subtitle1 text-grey-7 text-bold">
        您好，欢迎登录使用！
      </div>
      <!-- </div> -->
      <q-input
        dense
        outlined
        v-model="name"
        lazy-rules
        autofocus
        :rules="[(val) => (val && val.length > 0) || '用户名不能为空']"
      >
        <template #prepend>
          <div class="text-subtitle2 text-grey-8 text-bold">用户名:</div>
        </template>
        <template #append>
          <q-icon name="person_outline" />
        </template>
      </q-input>
      <q-input
        dense
        outlined
        type="password"
        v-model="pass"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || '密码不能为空']"
      >
        <template #prepend>
          <div class="text-subtitle2 text-grey-8 text-bold">密码:</div>
        </template>
        <template #append>
          <q-icon name="lock_outline" />
        </template>
      </q-input>
      <div class="row no-wrap">
        <q-btn
          :loading="loading"
          unelevated
          class="flex1"
          label="登录"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { login } from "src/api/module";
import { notifySuccess } from "src/util/common";
export default {
  emits: ["ok"],
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const LOAD = inject("LOAD");
    const name = ref("");
    const pass = ref("");
    const loading = ref(false);

    LOAD.user = false;
    LOAD.loginInfo = null;
    const fnLogin = (res) => {
      $q.localStorage.set("loginInfo", res);
      const routerPath = $q.localStorage.getItem("router-path");

      LOAD.loginInfo = res;
      LOAD.user = true;
      router.push(routerPath || "/01-01");
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
        .catch((err) => {})
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
  top: 56%;
  transform: translate(-50%, -70%);
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  box-sizing: content-box;
  width: 290px;
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
