<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <q-input outlined dense v-model="companyId">
        <template #prepend>
          <span class="text-caption text-bold">公司ID</span>
        </template>
      </q-input>
      <q-input outlined dense v-model="userName">
        <template #prepend>
          <span class="text-caption text-bold">用户账号</span>
        </template>
      </q-input>
      <q-input outlined dense v-model="realName">
        <template #prepend>
          <span class="text-caption text-bold">用户昵称</span>
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
    const userName = ref("");
    const realName = ref("");
    const onSubmit = () => {
      emit("search", {
        companyId: companyId.value,
        userName: userName.value,
        realName: realName.value,
      });
    };
    onSubmit();

    return {
      companyId,
      userName,
      realName,
      onSubmit,
    };
  },
};
</script>
