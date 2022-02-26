<template>
  <top></top>
  <div class="flex1 q-px-lg q-py-sm column no-wrap relative-position">
    <div class="flex1 column no-wrap justify-around items-center">
      <div class="text-h6 text-center text-bold q-mb-md">问题反馈</div>
      <div style="width: 80%">
        <div class="text-subtitle1">选择您遇到的问题(可多选)</div>
        <div class="text-caption">若有其他问题请直接致电西湖游客服务中心</div>
        <div class="q-my-sm" style="margin-left: -2px">
          <div
            class="row no-wrap items-center"
            v-for="(item, index) in options"
            :key="index"
          >
            <q-checkbox dense v-model="select" :val="item" :label="item" />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn unelevated color="green">提交</q-btn>
    </div>
    <div
      class="absolute-center bg-white shadow-5 q-pa-md column no-wrap justify-around items-center"
      style="width: 60%; height: 90%"
    >
      <q-btn unelevated round color="green" icon="task_alt" size="16px"></q-btn>

      <div class="flex1 column no-wrap justify-around items-center q-mt-md">
        <div class="text-center text-bold">
          您的问题已被接受，若有必要工作人员将会在三个工作日内联系您。
        </div>
        <div>若情况紧急，您可拨打园区热线。</div>
      </div>
      <div class="text-center">
        <q-btn unelevated size="sm" color="green">返回首页</q-btn>
      </div>
    </div>
  </div>
  <bottom></bottom>
</template>

<script>
import { ref } from "vue";
import Top from "./top.vue";
import Bottom from "./bottom.vue";
export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const select = ref([]);
    const options = ref([
      "柜门无法关闭",
      "柜门关闭后还有物品在柜",
      "扣除绿色能量后柜门未开启",
      "使用未超过4小时被扣除文明分",
      "无法支付绿色能量",
    ]);

    return {
      select,
      options,
    };
  },
};
</script>

<style></style>
