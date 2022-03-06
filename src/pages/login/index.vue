<template>
  <div class="login-page">
    <div class="full-width row items-center q-mt-lg q-pl-lg">
      <img style="width: 140px" src="~assets/images/logo-white.jpg" alt="上海蚁探智能科技有限公司" />
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
};
</script>
<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url("src/assets/images/lg-bg.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
}
</style>
