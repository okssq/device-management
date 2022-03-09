<template>
  <top page="14"/>
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">
    <q-btn color="grey-6" disable icon="task_alt" round size="16px" unelevated></q-btn>
    <div class="text-h6 text-grey-10">柜门已开，感谢使用。</div>
    <div class="text-center" style="max-width: 70%">
      您可在手机小程序上"我的-储物柜使用"中找到订单相关信息
    </div>
    <q-btn color="grey-6" disable size="16px" unelevated>返回首页</q-btn>
  </div>
  <bottom page="14"/>
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
