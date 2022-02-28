<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="max-width: 98vw; width: 300px"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">开关设置</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />
      <q-list dense>
        <q-item
          tag="label"
          v-ripple
          v-for="(item, index) in options"
          :key="index"
        >
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="blue"
              :model-value="item.value"
              @update:model-value="onSwitchChange($event, index)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import { useDialogPluginComponent } from "quasar";
import { ref } from "vue";
import { TERMINAL_CONTROL } from "src/api/module.js";
import { load } from "@amap/amap-jsapi-loader";
export default {
  emits: [...useDialogPluginComponent.emits],
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const loading = ref(false);
    const options = ref([]);
    const fnSwitch = (res) => {
      console.log("getInfo", res);
      if (!res) {
        // loading.value = false;
        return;
      }
      const { number, status } = res;
      if (!status) {
        // loading.value = false;
        return;
      }
      // 8个开关以内
      if (number < 8) {
        const str = parseInt(status).toString(2);
        const length = str.length;
        if (length < number) {
          const zeroArr = Array.from({ length: number - length }, () => 0);
          const startArr = str.split("").reverse();
          const switchArr = [...startArr, ...zeroArr];
          options.value = switchArr.map((el, index) => {
            return {
              label: `开关${index + 1}`,
              value: el == 1,
            };
          });
          console.log("switchArr", switchArr, options.value);
        }
      } else {
        // loading.value = false;
      }
    };
    const getInfo = () => {
      loading.value = true;
      TERMINAL_CONTROL.switchInfo({ terminalId: props.data.terminalId })
        .then((res) => {
          fnSwitch(res);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onSwitchChange = (val, index) => {
      loading.value = true;
      TERMINAL_CONTROL.singleControl({
        index: index + 1,
        phone: props.data.terminalId,
        status: val ? "1" : 0,
      })
        .then((res) => {
          fnSwitch(res);
        })
        .finally(() => {
          loading.value = false;
        });
    };
    getInfo();
    return {
      dialogRef,
      loading,
      options,
      onDialogHide,
      onSwitchChange,
    };
  },
};
</script>
