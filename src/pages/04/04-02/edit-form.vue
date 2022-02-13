<template>
  <q-card style="width: 590px; max-width: 80vw">
    <!-- <q-card-section> -->
    <div class="row q-px-md q-py-xs items-center justify-between">
      <div class="text-body1">项目信息</div>
      <q-btn flat round size="12px" icon="clear" @click="$emit('cancel')" />
    </div>
    <!-- <div class="text-h6">Terms of Agreement</div> -->
    <!-- </q-card-section> -->

    <q-separator />

    <q-card-section style="max-height: 50vh" class="scroll">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="row q-gutter-md items-center"
      >
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
        <div class="row no-wrap items-center my-form-item">
          <div class="text-body2 my-form-label">label：</div>
          <q-input dense outlined lazy-rules class="flex1 overflow-hidden" />
        </div>
      </q-form>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="取消" color="primary" @click="$emit('cancel')" />
      <q-btn label="确定" color="primary" @click="onOk" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  emits: ["cancel", "ok"],
  setup(props, { emit }) {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const onOk = () => {
      emit("ok");
    };
    return {
      name,
      age,
      onOk,
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
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
