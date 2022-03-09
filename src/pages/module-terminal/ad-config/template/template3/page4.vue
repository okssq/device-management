<template>
  <top page="4"/>
  <div class="flex1 q-pa-md column justify-between no-wrap">
    <div class="text-right text-bold text-grey-6">
      <span style="font-size: 20px">32</span>
      <span style="font-size: 14px">S</span>
    </div>
    <div class="text-center">
      <q-icon
        color="grey-5"
        name="o_auto_graph"
        size="200px"
      />
      <div class="text-subtitle2 text-grey-8 q-my-md">
        <div>投递口已开启</div>
        <div class="">请依次投入回收瓶</div>
      </div>
      <q-btn color="grey-6" disable label="结束投递" padding="6px 50px" rounded size="14px"/>
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
