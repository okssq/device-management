<template>
  <top page="16"/>
  <div class="flex1 q-px-lg column no-wrap items-center justify-between relative-position">
    <div class="text-h6 text-grey-10">问题反馈</div>
    <div style="width: 94%">
      <div class="text-subtitle2">
        选择您遇到的问题(可多选)
      </div>
      <div class="text-caption q-mb-md">
        若有其他问题请直接致电西湖游客服务中心
      </div>
      <div class="q-pa-md " style="margin-lef:0;outline: 1px dashed #ccc">
        <div
          class="row no-wrap items-center"
          v-for="(item, index) in options"
          :key="index"
        >
          <q-checkbox dense size="xs" :model-value="false" :label="item"/>
          <q-btn
            dense
            round
            flat
            size="12px"
            color="red"
            class="q-ml-lg"
            icon="close"
          />
        </div>
      </div>
    </div>
    <q-btn size="14px" disable unelevated color="grey-6">提交</q-btn>
    <div
      class="absolute-center bg-white shadow-2 q-pa-md column no-wrap justify-around items-center"
      style="width: 70%; height: 80%"
    >
      <q-btn unelevated round color="grey-6" icon="task_alt" size="16px"></q-btn>

      <div style="width: 70%" class="text-center">
        <div class="text-center text-bold">
          您的问题已被接受，若有必要工作人员将会在三个工作日内联系您。
        </div>
        <div class="q-mt-md">若情况紧急，您可拨打园区热线。</div>
      </div>
      <div class="text-center">
        <q-btn disable unelevated size="sm" color="grey-6">返回首页</q-btn>
      </div>
    </div>
  </div>
  <bottom page="16"/>

</template>

<script>
import {ref} from "vue";
import Top from "./top.vue";
import Bottom from "./bottom.vue";

export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const options = ref([
      "柜门无法关闭",
      "柜门关闭后还有物品在柜",
      "扣除绿色能量后柜门未开启",
      "使用未超过4小时被扣除文明分",
      "无法支付绿色能量",
    ]);



    return {
      options,
    };
  },
};
</script>

<style></style>
