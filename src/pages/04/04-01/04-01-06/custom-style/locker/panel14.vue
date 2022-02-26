<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <div class="text-center">
      <q-btn unelevated round color="green" icon="task_alt" size="20px"></q-btn>
    </div>
    <div class="flex1 column no-wrap justify-around items-center q-my-md">
      <p class="text-subtitle1 text-center text-bold">柜门已开，感谢使用。</p>
      <div style="max-width: 60%" class="text-center">
        您可在手机小程序上"我的-储物柜使用"中找到订单相关信息
      </div>
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
