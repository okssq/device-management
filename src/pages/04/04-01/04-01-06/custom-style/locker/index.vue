<template>
  <div class="flex1 row no-wrap overflow-hidden ">
    <div class="flex1 column justify-center items-center relative-position overflow-hidden">
      <div :style="{ width: height / 1.4 + 'px', height: height + 'px' }" class="sence column no-wrap">
        <component :is="currentPanel" />
      </div>
      <q-resize-observer @resize="onResize"/>
    </div>
    <q-separator vertical/>
    <q-tabs
      class="full-height text-grey-7"
      style="width: 200px;min-width: 200px;"
      v-model="currentTab"
      align="left"
      switch-indicator
      vertical
      outside-arrows
      mobile-arrows
      inline-label
      active-color="black"
      active-bg-color="blue-1"
      indicator-color="transparent"
    >
      <q-tab
        v-for="item in tabs"
        :key="item.name"
        :name="item.name"
        :label="item.label"
      />
    </q-tabs>
  </div>
</template>

<script>
import Panel1 from "./panel1.vue";
import Panel2 from "./panel2.vue";
import Panel3 from "./panel3.vue";
import Panel4 from "./panel4.vue";
import Panel5 from "./panel5.vue";
import Panel6 from "./panel6.vue";
import Panel7 from "./panel7.vue";
import Panel8 from "./panel8.vue";
import Panel9 from "./panel9.vue";
import Panel10 from "./panel10.vue";
import Panel11 from "./panel11.vue";
import Panel12 from "./panel12.vue";
import Panel13 from "./panel13.vue";
import Panel14 from "./panel14.vue";
import Panel15 from "./panel15.vue";
import Panel16 from "./panel16.vue";
import {ref, computed, reactive} from 'vue'
import {UI} from "src/api/module";

export default {
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
      {name: "panel1", label: "首页"},
      {name: "panel2", label: "1.1存"},
      {name: "panel3", label: "1.1.1无法开始状态1"},
      {name: "panel4", label: "1.1.1无法开始状态2"},
      {name: "panel5", label: "1.2使用须知"},
      {name: "panel6", label: "1.2.1确认弹窗"},
      {name: "panel7", label: "1.3.1开柜"},
      {name: "panel8", label: "1.3.2开柜失败状态1"},
      {name: "panel9", label: "1.3.3开柜失败状态2"},
      {name: "panel10", label: "2.1取"},
      {name: "panel11", label: "2.1.1无法开柜状态"},
      {name: "panel12", label: "2.2.1开柜提示1"},
      {name: "panel13", label: "2.2.2开柜提示2"},
      {name: "panel14", label: "2.3开柜成功"},
      {name: "panel15", label: "3.1问题反馈"},
      {name: "panel16", label: "3.1问题反馈-1"},
    ];
    const currentTab = ref("panel1");
    const currentPanel = computed(() => {
      const findItem = tabs.find((el) => el.name === currentTab.value);
      return findItem ? findItem.name : "panel1";
    });
    const height = ref("1");
    const onResize = (report) => {
      height.value = report.height
    };

    const templateDataObj = reactive({})
    const getPageInfo = () => {
      UI.templateInfo({templateId: 1}).then(res => {

        (res || []).forEach(el => {
          const {page, txt} = el
          templateDataObj[page] = txt
        })
        console.log('res', res, 'templateDataObj', templateDataObj);
      }).finally()
    }
    getPageInfo()
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

<style>
.sence {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
