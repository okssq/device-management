<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="width: 342px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-text-subtitle2 text-bold">新增开关配置</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide"/>
      </div>
      <q-separator/>

      <q-scroll-area style="height: 140px;max-height: 140px; padding: 16px">
        <q-form class="row q-gutter-md items-center">
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            :model-value="index"
            disable
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">Index：</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="indexName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">开关名称：</span>
            </template>
          </q-input>
        </q-form>
      </q-scroll-area>
      <q-separator/>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="onDialogHide" />
        <q-btn label="确定" color="primary" @click="onSubmit" />
      </q-card-actions>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em"/>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import {useDialogPluginComponent} from "quasar";
import {toRefs, ref, toRaw,reactive} from "vue";
import {TEMPLATE} from 'src/api/module'

export default {
  emits: [...useDialogPluginComponent.emits],
  components: {},
  props: {
    formData: {
      type: [Object,null],
      default: null
    }
  },
  setup(props) {
    const {dialogRef, onDialogHide,onDialogOK} = useDialogPluginComponent();
    const formData = reactive({
      index: props.formData.index,
      indexName: props.formData.indexName,
      templateId:  props.formData.templateId,
    });
    const loading = ref(false);

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      TEMPLATE.insertSwitch(param).then(() => {
        onDialogOK()
      }).finally(() => {
        loading.value = false
      })

    }



    return {
      dialogRef,
      ...toRefs(formData),
      loading,

      onDialogHide,
      onSubmit,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 310px;
}

.my-form-label {
  min-width: 70px;
  max-width: 70px;
  text-align: right;
  word-wrap: break-word;
}
</style>
