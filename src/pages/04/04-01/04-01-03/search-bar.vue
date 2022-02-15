<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <q-input input-class="text-caption" outlined dense v-model="companyId">
        <template #before>
          <span class="text-caption text-bold">公司ID：</span>
        </template>
      </q-input>
      <q-input input-class="text-caption" outlined dense v-model="projectId">
        <template #before>
          <span class="text-caption text-bold">项目ID：</span>
        </template>
      </q-input>
      <q-input input-class="text-caption" outlined dense v-model="terminalId">
        <template #before>
          <span class="text-caption text-bold">设备IMEI：</span>
        </template>
      </q-input>
      <q-btn
        icon="search"
        color="primary"
        dense
        type="submit"
        :disable="searching"
      />
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  emits: ["search"],
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const companyId = ref("");
    const projectId = ref("");
    const terminalId = ref("");

    const onSubmit = () => {
      emit("search", {
        companyId: companyId.value,
        projectId: projectId.value,
        terminalId: terminalId.value,
        type: 10,
      });
    };
    onSubmit();

    return {
      companyId,
      projectId,
      terminalId,
      onSubmit,
    };
  },
};
</script>
