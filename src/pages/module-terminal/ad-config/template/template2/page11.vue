<template>
  <top page="11" />
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">
    <q-btn
      disable
      unelevated
      round
      color="grey-6"
      icon="o_info"
      size="16px"
    />
    <div class="text-center">
      <div class="text-h6 text-grey-10">您已在使用储物柜</div>
      <div class="text-h6 text-grey-10 q-my-md">请您确认后再次进行开柜</div>
    </div>
    <q-btn
      unelevated
      color="grey-6"
      size="16px"
      label="返回首页"
    />
  </div>
  <bottom page="11" />
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
