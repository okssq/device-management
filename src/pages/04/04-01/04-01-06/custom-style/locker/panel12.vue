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
    <div class="flex1 column no-wrap justify-around items-center q-my-md">
      <div class="text-h6 text-center text-bold">您已在使用储物柜</div>
      <div class="bg-grey-1 column no-wrap items-center q-my-sm q-pa-sm">
        <div class="text-subtitle1 text-bold">0小时20分</div>
        <div class="text-red">
          柜门只能开启一次，请去除全部物品后再关闭柜门。
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn unelevated color="orange">我知道了，开柜(10s)</q-btn>
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
