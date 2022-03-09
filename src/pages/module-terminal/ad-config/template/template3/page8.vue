<template>
  <top page="8"/>
  <div class="flex1 q-pa-md column justify-around items-center no-wrap">

    <div class="text-center">
      <q-icon color="grey-6" name="o_account_circle" size="60px"/>
      <div class="text-subtitle2 text-grey-8 q-mt-sm">感谢您为西湖垃圾做出的贡献</div>
    </div>

    <div class="text-center text-grey-6 text-subtitle1">
      <div>本次共投递3个可回收塑料瓶</div>
      <div>为地球减少了5g碳排放</div>
      <div>获得30g绿色能量</div>
    </div>

    <div class="text-center text-grey-6">
      <div class="text-caption">您可在手机小程序上"我的-智能设备使用"中找到相关信息</div>
      <q-btn class="q-mt-sm" color="grey-6" disable label="关闭" padding="6px 50px" rounded size="14px"/>
    </div>
    <div class="full-width text-right">
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
};
</script>
