<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="max-width: 98vw; width: 330px"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">更新密码</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />
      <q-scroll-area style="max-height: 50vh; padding: 16px; height: 240px">
        <q-form class="row q-gutter-md items-center">
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="realName"
            disable
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >用户昵称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="userName"
            disable
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >用户账号：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            type="password"
            v-model="userPassword"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">密码：</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            type="password"
            class="my-form-item"
            v-model="confirmUserPassword"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >确认密码：</span
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
import { USER } from "src/api/module";
export default {
  emits: [...useDialogPluginComponent.emits],
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
    let formData = reactive({
      userName: "",
      userName: "",
      userPassword: "",
      confirmUserPassword: "",
    });
    const loading = ref(false);

    const { realName, userName, id } = toRaw(props.formData);
    formData = reactive({
      realName,
      userName,
      id,
      userPassword: "",
      confirmUserPassword: "",
    });

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);

      USER.updatePassword(param)
        .then(() => {
          onDialogOK();
        })
        .catch(() => {})
        .finally(() => {
          loading.value = false;
        });
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
  width: 280px;
}
.my-form-label {
  min-width: 70px;
  max-width: 70px;
  text-align: right;
  word-wrap: break-word;
}
</style>
