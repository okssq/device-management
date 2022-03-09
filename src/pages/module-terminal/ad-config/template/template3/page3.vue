<template>
  <div class="full-height column no-wrap relative-position">
    <q-separator/>
    <div class="relative-position bg-grey-1" style="height: 22%">
      <div class="absolute-center text-no-wrap text-grey-6 text-subtitle1">
        广告
      </div>
    </div>
    <q-separator/>
    <div class="flex1 q-pa-md flex1 column justify-between no-wrap">
      <div class="text-left">
        <q-btn color="grey-6" disable padding="3px 12px" rounded>
          <q-icon name="arrow_back_ios" size="16px"/>
          返回
        </q-btn>
      </div>
      <div class="text-center">
        <img alt="" src="./b1.png" style="width: 200px;filter: grayscale(100%);">
        <div class="text-subtitle2 text-grey-8 q-my-md">
          <div>提示灯光亮起即可开始投递</div>
          <div>请依次投入回收瓶</div>
        </div>
        <q-btn color="grey-6" disable label="开始投递" padding="6px 50px" rounded size="14px"/>
      </div>
      <div class="text-right">
        <q-btn color="grey-6" disable padding="2px 8px" rounded>
          <q-icon name="help_outline" size="18px"/>
          问题反馈
        </q-btn>
      </div>
    </div>
    <div class="absolute-full" style="background-color: rgba(0,0,0,.2);">
      <div class="absolute-center shadow-1 rounded-borders bg-white q-pa-md" style="width:60%;">
        <div class="text-right text-grey-6">
          3S后自动关闭
        </div>
        <div class="text-center q-my-md">
          <q-btn color="grey-6" disable icon="o_report_problem" round size="16px"/>
        </div>
        <div class="text-center q-my-md column no-wrap items-center">
          <div>提示灯光亮起后即可开始投递</div>
          <div>请依次投入回收瓶</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
};
</script>
