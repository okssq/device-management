<template>
  <top page="2"/>
  <div class="flex1 q-pa-md column justify-between no-wrap">
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
</template>

<script>
import Top from "./top.vue";

export default {
  components: {
    Top,
  },
  setup() {
    return {}
  }
};
</script>
