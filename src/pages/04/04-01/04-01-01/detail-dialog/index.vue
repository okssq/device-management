<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-positon overflow-hidden"
          style="width: 292px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">更新设备信息</div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator />

          <q-scroll-area style="max-height: 50vh; padding: 16px; height: 130px">
            <q-form class="row q-gutter-md items-center">
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="terminalName"
              >
                <template #before>
                  <span class="text-subtitle2 text-grey-8 text-bold"
                    >设备别名:</span
                  >
                </template>
              </q-input>
              <q-field
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="address"
              >
                <template #before>
                  <span class="text-subtitle2 text-grey-8 text-bold"
                    >设备地址:</span
                  >
                </template>
                <q-btn
                  dense
                  flat
                  class="full-width"
                  icon="gps_fixed"
                  label="地图选址"
                  @click="onChooseGps"
                />
              </q-field>
            </q-form>
          </q-scroll-area>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" @click="$emit('cancel')" />
            <q-btn label="确定" color="primary" @click="onSubmit" />
          </q-card-actions>
          <q-inner-loading :showing="loading" style="z-index: 100">
            <q-spinner-tail color="primary" size="2em" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </teleport>
  <choose-gps-dialog
    v-if="chooseGpsDialogVisible"
    :row="chooseGpsDialogData"
    @cancel="chooseGpsDialogVisible = false"
    @ok="onConfirmChooseGps"
  ></choose-gps-dialog>
</template>
<script>
import chooseGpsDialog from "components/choose-gps-dialog";
import { reactive, ref, toRaw, toRefs } from "vue";
import { TERMINAL } from "src/api/module";
export default {
  emits: ["cancel", "ok"],
  components: {
    chooseGpsDialog,
  },
  props: {
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    let formData = reactive({
      type: "1",
      terminalName: "",
      terminalId: "",
      projectId: "",
      gpsInfo: "",
      address: "",
    });
    const loading = ref(false);
    const { createTime, updateTime, ...param } = toRaw(props.formData);
    formData = reactive({ ...param });

    const chooseGpsDialogVisible = ref(false);
    const chooseGpsDialogData = ref(null);
    const onChooseGps = () => {
      chooseGpsDialogData.value = toRaw(props.formData);
      chooseGpsDialogVisible.value = true;
    };
    const onConfirmChooseGps = ({ lat, lng, address }) => {
      formData.address = address;
      formData.gpsInfo = `${lng},${lat}`;
      chooseGpsDialogVisible.value = false;
    };
    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);

      TERMINAL.update(param)
        .then(() => {
          emit("ok", param);
        })
        .catch(() => {})
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      ...toRefs(formData),
      loading,

      onSubmit,

      chooseGpsDialogVisible,
      chooseGpsDialogData,
      onChooseGps,
      onConfirmChooseGps,
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
