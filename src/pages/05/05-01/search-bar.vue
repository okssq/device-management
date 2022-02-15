<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <input-filter-company :treeList="treeList" v-model="companyId" />
      <q-input
        input-class="text-caption"
        outlined
        dense
        placeholder="请输入用户账号"
        v-model="userName"
      >
        <template #before>
          <span class="text-caption text-bold">用户账号：</span>
        </template>
      </q-input>
      <q-input
        input-class="text-caption"
        placeholder="请输入用户昵称"
        outlined
        dense
        v-model="realName"
      >
        <template #before>
          <span class="text-caption text-bold">用户昵称：</span>
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
import InputFilterCompany from "components/company/input-filter-company.vue";
import { ref } from "vue";
export default {
  emits: ["search", "insert"],
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
