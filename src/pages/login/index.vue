<template>
  <div class="login-page">
    <div class="full-width row items-center q-mt-lg q-pl-lg">
      <img style="width: 70px" src="~assets/images/logo2.jpg" alt />
      <div class="text-h4 text-white text-bold q-ml-md">智慧设备管控平台</div>
    </div>
    <login-canvas />
    <login-form />
  </div>
</template>
<script>
import LoginCanvas from "./canvas.vue";
import LoginForm from "./form.vue";
export default {
  components: { LoginCanvas, LoginForm },
  setup() {},
};
</script>
<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url("assets/images/lg-bg.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
</style>
