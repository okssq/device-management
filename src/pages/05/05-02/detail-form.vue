<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="width: 292px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-body1">
          {{ type === "insert" ? "新增" : "更新" }}角色信息
        </div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />

      <q-scroll-area style="height: 130px; max-height: 50vh; padding: 16px">
        <q-form class="row q-gutter-md items-center">
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="roleName"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold"
                >角色名称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="remark"
          >
            <template #prepend>
              <span class="text-subtitle2 text-grey-8 text-bold">备注：</span>
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
import { ROLE } from "src/api/module";
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
      companyId: 1,
      remark: "",
      roleName: "",
    });
    const loading = ref(false);

    if (props.type === "edit") {
      console.log("formData", props.formData);
      const { id, companyId, remark, roleName } = toRaw(props.formData);
      formData = reactive({
        id,
        companyId,
        roleName,
        remark,
      });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        ROLE.insert(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        ROLE.update(param)
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
