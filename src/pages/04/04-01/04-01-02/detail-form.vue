<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="width: 292px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">
          {{ type === "insert" ? "新增" : "更新" }}设备信息
        </div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />

      <q-scroll-area style="max-height: 50vh; padding: 16px; height: 230px">
        <q-form class="row q-gutter-md items-center">
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="terminalName"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold"
                >设备别名:</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="projectId"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold">
                项目ID:
              </span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="gpsInfo"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold">GPS定位:</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="address"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold">
                设备地址:
              </span>
            </template>
          </q-input>
        </q-form>
      </q-scroll-area>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="onDialogHide" />
        <q-btn label="确定" color="primary" @click="onSubmit" />
      </q-card-actions>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import { useDialogPluginComponent } from "quasar";
import { reactive, ref, toRaw, toRefs } from "vue";
import { TERMINAL } from "src/api/module";
export default {
  emits: [...useDialogPluginComponent.emits],
  props: {
    type: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
    let formData = reactive({
      type: "1",
      terminalName: "",
      terminalId: "",
      projectId: "",
      gpsInfo: "",
      address: "",
    });
    const loading = ref(false);
    if (props.type === "edit") {
      console.log("formData", props.formData);
      const { createTime, updateTime, ...param } = toRaw(props.formData);
      formData = reactive({ ...param });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        return;
        TERMINAL.update(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        TERMINAL.update(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      }
    };

    return {
      dialogRef,
      ...toRefs(formData),
      loading,

      onSubmit,
      onDialogHide,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 260px;
}
.my-form-label {
  max-width: 80px;
}
</style>
