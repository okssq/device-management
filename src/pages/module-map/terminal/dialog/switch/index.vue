<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="max-width: 98vw; width: 300px"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">开关设置</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />
      <q-list dense v-if="options.length">
        <q-item
          tag="label"
          v-ripple
          v-for="item in options"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label>{{ item.indexName }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="blue"
              :true-value="1"
              :false-value="0"
              :model-value="item.useStatus"
              @update:model-value="onSwitchChange(item)"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="q-px-md q-py-lg text-grey-6">
        暂无开关配置信息
      </div>
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
import {notifySuccess} from "src/util/common";
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
      options.value = res || []
    };
    const getInfo = () => {
      loading.value = true;
      TERMINAL_CONTROL.switchInfo({ terminalId: props.data.terminalId })
        .then((res) => {
          fnSwitch(res)
        })
        .finally(() => {
          loading.value = false;
        });
    };
    const onSwitchChange = (item) => {
      loading.value = true;
      TERMINAL_CONTROL.singleControl({
        index: item.index,
        phone: item.terminalId,
        status: item.useStatus ? 0 : 1,
      })
        .then((res) => {
          item.useStatus = item.useStatus ? 0 : 1
          notifySuccess('设置成功')
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
