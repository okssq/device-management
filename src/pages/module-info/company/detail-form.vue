<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="width: 570px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-text-subtitle2 text-bold">
          {{ type === "insert" ? "新增" : "更新" }}公司信息
        </div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />

      <q-scroll-area style="height: 290px; max-height: 50vh; padding: 16px">
        <q-form class="row q-gutter-md items-center">
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="companyName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >公司名称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="companyCode"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >公司编号：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="contact"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">联系人：</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="contactPhone"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >联系电话：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            type="textarea"
            class="my-form-item"
            v-model="companyAddress"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >公司地址：</span
              >
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
import { COMPANY } from "src/api/module";
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
      companyAddress: "",
      companyCode: "",
      companyName: "",
      contact: "",
      contactPhone: "",
    });
    const loading = ref(false);

    if (props.type === "edit") {
      const { createTime, updateTime, ...param } = toRaw(props.formData);
      formData = reactive({ ...param });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        COMPANY.insert(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        COMPANY.update(param)
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
  min-width: 70px;
  max-width: 70px;
  text-align: right;
  word-wrap: break-word;
}
</style>
