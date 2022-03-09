<template>
  <div class="relative-position">
    <q-card style="width: 320px">
      <div class="row no-wrap items-center q-px-md q-py-sm">
        <span class="text-subtitle2 text-bold text-primary">
          设备号：{{ data ? data.terminalId : '' }}
        </span>
        <q-space/>
        <q-btn
          class="absolute-top-right"
          color="red-5"
          dense
          icon="clear"
          round
          size="10px"
          style="transform: translate(50%, -50%)"
          @click="$emit('close')"
        />
      </div>
      <q-separator/>
      <q-list class="text-bold text-grey-10 q-pb-md" dense>


        <q-item>
          <q-item-section side>状态：</q-item-section>
          <q-item-section v-if="data" side>
            <q-badge
              :color="data.onlineStatus == 0 ? 'grey' : 'green'"
              :label="data.onlineStatus == 0 ? '离线' : '在线'"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>类型：</q-item-section>
          <q-item-section v-if="data">
            {{ termTypeText[data.type] }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>项目：</q-item-section>
          <q-item-section v-if="data">
            {{ data.projectName }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>时间：</q-item-section>
          <q-item-section v-if="data"> {{ data.onlineTime }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>地址：</q-item-section>
          <q-item-section v-if="data"> {{ data.address }}</q-item-section>
        </q-item>
      </q-list>
      <q-separator/>
      <div class="q-px-sm q-py-xs">
        <div class="q-gutter-xs text-grey-8">
          <q-btn
            dense
            flat
            icon="toggle_on"
            round
            @click="onSwitch"
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              设备使用状态
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="data && [3].includes(+data.type)"
            dense
            flat
            icon="o_smart_display"
            round
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              视频播放
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="data && [2,3].includes(+data.type)"
            dense
            flat
            icon="o_restart_alt"
            round
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              远程重启
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="data && [2,3].includes(+data.type)"
            dense
            flat
            icon="o_branding_watermark"
            round
            size="12px"
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              屏幕截图
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="data && [2,3].includes(+data.type)"
            dense
            flat
            icon="o_volume_up"
            round
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              音量调节
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="data && [2,3].includes(+data.type)"
            dense
            flat
            icon="o_text_fields"
            round
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              文本下发
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="data && [2,3].includes(+data.type)"
            dense
            flat
            icon="o_light_mode"
            round
            size="12px"
          >
            <q-tooltip :offset="[10, 10]" class="bg-orange text-black shadow-4">
              亮度调节
            </q-tooltip>
          </q-btn>
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
import {toRaw} from "vue";
import {useQuasar} from "quasar";
import DialogSwitch from "./dialog/switch/index.vue";


export default {
  emits: ["close", "video"],
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
  setup(props, {emit}) {
    const termTypeText = {
      1: "智能座椅",
      2: "智能瓶类回收",
      3: "智能储物柜",
      4: "智能大屏",
    }
    const $q = useQuasar();
    const onSwitch = () => {
      const data = toRaw(props.data);
      $q.dialog({
        component: DialogSwitch,
        componentProps: {data},
      });
    };
    return {
      termTypeText,
      onSwitch,
    };
  },
};
</script>
