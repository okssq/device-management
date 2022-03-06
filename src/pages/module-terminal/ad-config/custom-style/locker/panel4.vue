<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <div class="text-center">
      <q-btn
        unelevated
        round
        color="orange"
        icon="warning_amber"
        size="20px"
      ></q-btn>
    </div>
    <div class="flex1 column no-wrap justify-around items-center q-mt-md">
      <p class="text-h6 text-center text-bold">您已在使用储物柜</p>
      <p>一个账号只能同时使用一个储物柜，请您谅解！</p>
    </div>
    <div class="text-center">
      <q-btn unelevated color="orange">返回首页</q-btn>
    </div>
  </div>
  <bottom></bottom>
</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
export default {
  components: {
    Top,
    Bottom,
  },
};
</script>

<style></style>
