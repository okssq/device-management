<template>
  <div class="relative-position">
    <q-card style="width: 320px">
      <div class="row no-wrap items-center q-px-md q-py-sm">
        <span class="text-subtitle2 text-bold text-primary">
          {{
            data
              ? typeText[data.type] || "未知设备" + "-" + data.terminalId
              : ""
          }}</span
        >
        <q-space />
        <q-btn
          round
          size="10px"
          icon="clear"
          color="red-5"
          dense
          class="absolute-top-right"
          style="transform: translate(50%, -50%)"
          @click="$emit('close')"
        />
      </div>
      <q-separator />
      <q-list class="text-bold text-grey-10 q-pb-md" dense>
        <q-item>
          <q-item-section side>项目：</q-item-section>
          <q-item-section v-if="data">
            {{ data.projectName }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>状态：</q-item-section>
          <q-item-section side v-if="data">
            <q-badge
              :color="data.onlineStatus == 0 ? 'grey' : 'green'"
              :label="data.onlineStatus == 0 ? '离线' : '在线'"
            />
          </q-item-section>
        </q-item>
        <!-- <q-item>
          <q-item-section side>信息：</q-item-section>
          <q-item-section v-if="data"> </q-item-section>
        </q-item> -->
        <q-item>
          <q-item-section side>时间：</q-item-section>
          <q-item-section v-if="data"> {{ data.onlineTime }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>地址：</q-item-section>
          <q-item-section v-if="data"> {{ data.address }}</q-item-section>
        </q-item>
      </q-list>
      <q-separator />
      <div class="q-px-sm q-py-xs">
        <div class="text-grey-8">
          <q-btn
            flat
            round
            dense
            icon="toggle_on"
            class="q-mr-xs"
            title="开关设置"
            @click="onSwitch"
          />
        </div>
      </div>
      <div class="tip-shadow relative-position"></div>
    </q-card>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>
<script>
import { ref, toRaw } from "@vue/reactivity";
import { useQuasar } from "quasar";
import DialogSwitch from "./dialog/switch/index.vue";
export default {
  emits: ["close", "video"],
  // eslint-disable-next-line vue/no-unused-components
  components: { DialogSwitch },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: [null, Object],
      default: null,
    },
  },
  setup(props, { emit }) {
    const typeText = {
      1: "座椅",
      2: "瓶子回收",
      3: "储物柜",
      4: "大屏",
    };
    const $q = useQuasar();
    const onSwitch = () => {
      const data = toRaw(props.data);
      $q.dialog({
        component: DialogSwitch,
        componentProps: { data },
      });
    };
    return {
      typeText,
      onSwitch,
    };
  },
};
</script>
