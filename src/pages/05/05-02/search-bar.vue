<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <q-input outlined dense v-model="companyId">
        <template #prepend>
          <span class="text-caption text-bold">公司ID</span>
        </template>
      </q-input>
      <q-input outlined dense v-model="roleName">
        <template #prepend>
          <span class="text-caption text-bold">角色名称</span>
        </template>
      </q-input>
      <q-btn
        icon="search"
        color="primary"
        dense
        type="submit"
        :disable="searching"
      />
      <q-btn icon="add" color="primary" dense @click="$emit('insert')" />
    </q-form>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  emits: ["search", "insert"],
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const companyId = ref("");
    const roleName = ref("");
    const onSubmit = () => {
      emit("search", {
        companyId: companyId.value,
        roleName: roleName.value,
      });
    };
    onSubmit();

    return {
      companyId,
      roleName,
      onSubmit,
    };
  },
};
</script>
