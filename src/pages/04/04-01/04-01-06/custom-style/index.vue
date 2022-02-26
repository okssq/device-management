<template>
  <div class="absolute fit bg-white z-max overflow-hidden column no-wrap">
    <div class="row justify-between items-center no-wrap q-px-md bg-grey-2">
      <q-btn flat icon="arrow_back" color="grey-7" @click="$emit('cancel')"
        >返回</q-btn
      >
      <div class="text-subtitle1" style="margin: 0 50px">储物柜自定义样式</div>
      <q-tabs
        class="flex1 overflow-hidden"
        v-model="currentTab"
        inline-label
        outside-arrows
        mobile-arrows
        indicator-color="primary"
        active-color="primary"
      >
        <q-tab
          v-for="item in tabs"
          :key="item.name"
          :name="item.name"
          :label="item.label"
        />
      </q-tabs>
    </div>
    <q-separator />
    <div class="flex1 row no-wrap">
      <div class="full-height column no-wrap" style="width: 260px">
        <q-scroll-area class="flex1 q-px-md">
          <div v-for="n in 10" :key="n" class="q-py-xs">
            图片或者视频素材！ Lorem ipsum dolor sit amet, consectetur
            adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>
      </div>
      <q-separator vertical></q-separator>
      <div class="flex1 row justify-center items-center">
        <div
          class="sence column no-wrap"
          :style="{ width: height / 1.4 + 'px', height: height + 'px' }"
        >
          <component :is="currentPanel"></component>
        </div>

        <q-resize-observer @resize="onResize" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Panel1 from "./locker/panel1.vue";
import Panel2 from "./locker/panel2.vue";
import Panel3 from "./locker/panel3.vue";
import Panel4 from "./locker/panel4.vue";
import Panel5 from "./locker/panel5.vue";
import Panel6 from "./locker/panel6.vue";
import Panel7 from "./locker/panel7.vue";
import Panel8 from "./locker/panel8.vue";
import Panel9 from "./locker/panel9.vue";
import Panel10 from "./locker/panel10.vue";
import Panel11 from "./locker/panel11.vue";
import Panel12 from "./locker/panel12.vue";
import Panel13 from "./locker/panel13.vue";
import Panel14 from "./locker/panel14.vue";
import Panel15 from "./locker/panel15.vue";
import Panel16 from "./locker/panel16.vue";

export default {
  emits: ["cancel"],
  components: {
    Panel1,
    Panel2,
    Panel3,
    Panel4,
    Panel5,
    Panel6,
    Panel7,
    Panel8,
    Panel9,
    Panel10,
    Panel11,
    Panel12,
    Panel13,
    Panel14,
    Panel15,
    Panel16,
  },
  setup() {
    const tabs = [
      { name: "panel1", label: "首页" },
      { name: "panel2", label: "1.1存" },
      { name: "panel3", label: "1.1.1无法开始状态1" },
      { name: "panel4", label: "1.1.1无法开始状态2" },
      { name: "panel5", label: "1.2使用须知" },
      { name: "panel6", label: "1.2.1确认弹窗" },
      { name: "panel7", label: "1.3.1开柜" },
      { name: "panel8", label: "1.3.2开柜失败状态1" },
      { name: "panel9", label: "1.3.3开柜失败状态2" },
      { name: "panel10", label: "2.1取" },
      { name: "panel11", label: "2.1.1无法开柜状态" },
      { name: "panel12", label: "2.2.1开柜提示1" },
      { name: "panel13", label: "2.2.2开柜提示2" },
      { name: "panel14", label: "2.3开柜成功" },
      { name: "panel15", label: "3.1问题反馈" },
      { name: "panel16", label: "3.1问题反馈-1" },
    ];
    const currentTab = ref("panel1");
    const currentPanel = computed(() => {
      const findItem = tabs.find((el) => el.name === currentTab.value);
      return findItem ? findItem.name : "panel1";
    });

    const height = ref("1");
    const onResize = (report) => {
      height.value = report.height > 80 ? report.height - 80 : 0;
    };
    return {
      tabs,
      currentTab,
      currentPanel,
      height,
      onResize,
    };
  },
};
</script>

<style scoped>
.sence {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
