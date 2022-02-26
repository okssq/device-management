<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <div class="text-center">
      <q-btn unelevated round color="green" icon="task_alt" size="20px"></q-btn>
    </div>
    <div class="flex1 column no-wrap justify-around items-center q-mt-md">
      <p class="text-subtitle1 text-center text-bold">柜门已开</p>
      <p class="text-subtitle1 text-center text-bold">08列07排23号柜</p>
      <p>存储超过4小时将扣减文明分，请留意使用时间。</p>
    </div>
    <div class="text-center">
      <q-btn unelevated color="green">返回首页</q-btn>
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
