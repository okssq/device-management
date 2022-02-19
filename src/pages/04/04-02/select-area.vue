<template>
  <div class="fullscreen dimmed">
    <div class="absolute-center bg-white column no-wrap z-top">
      <q-card
        class="relative-positon overflow-hidden"
        style="width: 690px; max-width: 98vw"
      >
        <div class="row q-px-md q-py-xs items-center justify-between">
          <div class="text-subtitle2 text-bold">选择区域围栏</div>
          <q-btn flat round size="12px" icon="clear" />
        </div>
        <q-separator />

        <q-scroll-area style="max-height: 50vh; padding: 16px; height: 260px">
          <q-form class="row q-gutter-md items-center">
            <q-input
              dense
              outlined
              lazy-rules
              class="my-form-item"
              v-model="city"
            >
              <template #before>
                <span class="text-caption text-bold my-form-label">城市:</span>
              </template>
            </q-input>
            <q-input
              dense
              outlined
              lazy-rules
              class="my-form-item"
              v-model="address"
            >
              <template #before>
                <span class="text-caption text-bold my-form-label">地址：</span>
              </template>
            </q-input>
            <div class="flex1">
              <global-map></global-map>
            </div>
          </q-form>
        </q-scroll-area>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" />
          <q-btn label="确定" color="primary" @click="onSubmit" />
        </q-card-actions>
        <q-inner-loading :showing="loading" style="z-index: 100">
          <q-spinner-tail color="primary" size="2em" />
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>
<script>
import { reactive, ref, toRaw, toRefs } from "vue";
import GlobalMap from "components/map";
export default {
  emits: [],
  components: { GlobalMap },
  props: {
    loginCompanyId: {
      type: [String, Number],
      default: "",
    },
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
    let formData = reactive({
      city: "",
      address: "",
    });
    const loading = ref(false);

    const onSubmit = () => {
      // loading.value = true;
    };

    return {
      ...toRefs(formData),
      loading,

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
  min-width: 100px;
  max-width: 100px;
  text-align: right;
  word-wrap: break-word;
}
</style>
