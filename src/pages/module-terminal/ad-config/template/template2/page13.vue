<template>
  <top page="13"/>
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">
    <q-btn
      color="grey-6"
      disable
      icon="o_info"
      round
      size="16px"
      unelevated
    />
    <div class="text-h6 text-grey-10">您已在使用储物柜</div>
    <div class="text-center">
      <div class="text-subtitle1 text-grey-10">0小时20分</div>
      <div class="text-subtitle2">
        柜门只能开启一次，请去除全部物品后再关闭柜门。
      </div>
    </div>
    <div class="text-center text-caption">
      <q-btn color="grey-6" disable size="16px" unelevated>我知道了，开柜(10s)</q-btn>
      <div class="q-mt-sm"> 超过4小时未取，系统将自动扣除您2文明分。</div>
      <div>
        请您遵守园区秩序，文明分过低将不能使用储物柜。
      </div>
    </div>
  </div>
  <bottom page="13"/>
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
