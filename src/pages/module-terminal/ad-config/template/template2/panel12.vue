<template>
  <top page="12"/>
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">

    <q-btn
      disable
      unelevated
      round
      color="grey-6"
      icon="o_info"
      size="16px"
    />
    <div class="text-h6 text-grey-10">您已在使用储物柜</div>
    <div class="text-center">
      <div class="text-subtitle1 text-grey-10">0小时20分</div>
      <div class="text-subtitle2">
        柜门只能开启一次，请去除全部物品后再关闭柜门。
      </div>
    </div>

    <q-btn disable size="16px" unelevated color="grey-6">我知道了，开柜(10s)</q-btn>

  </div>
  <bottom page="12"/>
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
