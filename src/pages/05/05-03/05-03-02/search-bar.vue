<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <input-filter-company :treeList="treeList" v-model="companyId" />
      <q-input
        input-class="text-caption"
        outlined
        dense
        v-model="userName"
        placeholder="请输入用户账号"
      >
        <template #before>
          <span class="text-caption text-bold">用户账号：</span>
        </template>
      </q-input>
      <q-input outlined dense v-model="time" placeholder="时间控件，未完成">
        <template #prepend>
          <span class="text-caption text-bold">操作时间</span>
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
import InputFilterCompany from "components/company/input-filter-company.vue";
import { ref } from "vue";
export default {
  components: {
    InputFilterCompany,
  },
  emits: ["search"],
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
    const time = ref("");
    const onSubmit = () => {
      emit("search", {
        companyId: companyId.value,
        userName: userName.value,
        startTime: "",
        endTime: "",
      });
    };
    onSubmit();

    return {
      companyId,
      userName,
      time,
      onSubmit,
    };
  },
};
</script>
