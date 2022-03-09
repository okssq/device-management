<template>
  <div class="full-height column no-wrap relative-position">
    <q-separator/>
    <div class="relative-position bg-grey-1" style="height: 20%">
      <div class="absolute-center text-grey-6 text-no-wrap text-subtitle1">
        广告
      </div>
    </div>
    <q-separator/>
    <div class="q-pa-xs">
      <q-btn color="grey-7" dense disable flat icon="chevron_left">返回</q-btn>
    </div>
    <div class="flex1 q-px-lg column no-wrap items-center justify-between relative-position">
      <div class="text-h6 text-grey-10">问题反馈</div>
      <div style="width: 94%">
        <div class="text-subtitle2">
          选择您遇到的问题(可多选)
        </div>
        <div class="text-caption q-mb-md">
          若有其他问题请直接致电西湖游客服务中心
        </div>
        <div class="q-pa-md " style="outline: 1px dashed #ccc">
          <div
            v-for="(item, index) in options"
            :key="index"
            class="row no-wrap items-center"
          >
            <q-checkbox :label="item" :model-value="false" dense size="xs"/>
            <q-btn
              class="q-ml-lg"
              color="red"
              dense
              flat
              icon="close"
              round
              size="12px"
            />
          </div>
        </div>
      </div>
      <q-btn color="grey-6" disable size="14px" unelevated>提交</q-btn>
    </div>
    <div class="q-pb-sm">
      <q-btn color="grey-6" disable icon="help_outline" size="14px" unelevated>遇到问题？</q-btn>
    </div>
    <q-separator/>
    <div class="overflow-hidden row q-px-md q-py-lg justify-between items-center no-wrap justify-center">
      <div class="text-no-wrap flex1">
        <div class="row no-wrap items-center">
          西湖公园游客服务中心
        </div>
        <div class="row no-wrap items-center">
          服务电话：12345678
        </div>
        <div class="row no-wrap items-center">
          服务时间：08:00-18:00
        </div>
        <div class="row no-wrap items-center">
          服务地址：福州市鼓楼区左海湖滨路70号
        </div>
      </div>
      <div class="column items-center no-wrap text-no-wrap">
        <div class="relative-position">
          <img class="full-width" src="./qrcode.png"/>
        </div>
        <div class="row no-wrap items-center">
          智慧西湖小程序
        </div>
      </div>
    </div>
    <div class="absolute-full" style="background-color: rgba(0,0,0,.2)">
      <div
        class="absolute-center bg-white shadow-2 q-pa-lg column no-wrap justify-around items-center"
        style="width: 70%;"
      >
        <q-btn color="grey-6" icon="task_alt" round size="16px" unelevated></q-btn>

        <div class="text-center q-my-md" style="width: 70%">
          <div class="text-center text-bold">
            您的问题已被接受，若有必要工作人员将会在三个工作日内联系您。
          </div>
          <div class="q-mt-md">若情况紧急，您可拨打园区热线。</div>
        </div>
        <div class="text-center">
          <q-btn color="grey-6" disable size="sm" unelevated>返回首页</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    const options = [
      "柜门无法关闭",
      "柜门关闭后还有物品在柜",
      "扣除绿色能量后柜门未开启",
      "使用未超过4小时被扣除文明分",
      "无法支付绿色能量",
    ];

    return {
      options,
    };
  },
};
</script>
