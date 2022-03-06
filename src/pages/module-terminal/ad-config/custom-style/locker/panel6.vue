<template>
  <top></top>
  <div class="relative-position flex1 q-px-lg q-py-lg column no-wrap">
    <div class="flex1 column no-wrap justify-around items-center q-mt-sm">
      <p class="text-h6 text-center text-bold">使用须知</p>
      <ul>
        <li class="">
          <span>单次使用储物柜需要消耗</span>
          <span class="text-green-5">50绿色能量</span>
        </li>
        <li>
          为方便广大游客使用及园区管控，本储物柜每24小时清空一次，
          误清理的物品请联系西湖公园游客中心取回。
        </li>
        <li>
          存储时间超过4小时，将会被认为是占柜不取行为，系统将扣除一部分文明发。
        </li>
      </ul>
    </div>
    <div class="text-center">
      <q-btn unelevated color="orange">我知道了，开柜（10s）</q-btn>
    </div>
    <div
      class="absolute-center bg-white shadow-5 q-pa-md column no-wrap justify-around items-center"
      style="width: 70%; height: 80%"
    >
      <q-btn
        unelevated
        round
        color="orange"
        icon="privacy_tip"
        size="20px"
      ></q-btn>
      <div>
        <span>是否要消耗</span>
        <span class="text-green-5">50绿色能量</span>
        <span>使用储物柜？</span>
      </div>
      <div class="row justify-around">
        <q-btn unelevated color="grey-5" class="q-mr-lg">返回</q-btn>
        <q-btn unelevated color="primary">确定</q-btn>
      </div>
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
