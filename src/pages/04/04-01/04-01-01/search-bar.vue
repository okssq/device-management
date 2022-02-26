<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <input-filter-company :treeList="treeList" v-model="companyId" />
      <q-input
        input-class="text-caption"
        placeholder="请输入项目ID"
        outlined
        dense
        v-model="projectId"
      >
        <template #before>
          <span class="text-caption text-bold">项目ID：</span>
        </template>
      </q-input>
      <q-input
        input-class="text-caption"
        placeholder="请输入设备号"
        outlined
        dense
        v-model="terminalId"
      >
        <template #before>
          <span class="text-caption text-bold">设备号：</span>
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
import InputFilterCompany from "components/company/input-filter-company.vue";
export default {
  emits: ["search"],
  components: {
    InputFilterCompany,
  },
  props: {
    treeList: {
      type: Array,
      default: () => [],
    },
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
        type: 4,
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
