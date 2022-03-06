<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <div class="text-center">
      <q-btn unelevated round color="red" icon="gpp_bad" size="20px"></q-btn>
    </div>
    <div class="flex1 column no-wrap justify-around items-center q-mt-md">
      <p class="text-subtitle1 text-center text-bold">开柜失败</p>
      <p class="text-subtitle1 text-center text-bold">文明分等级过低</p>
      <p>您可在西湖游园小程序上获取更多文明分。</p>
    </div>
    <div class="text-center">
      <q-btn unelevated color="red">返回首页</q-btn>
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
