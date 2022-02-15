<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <input-filter-company :treeList="treeList" v-model="companyId" />
      <q-input
        outlined
        dense
        style="width: 240px"
        input-class="text-caption"
        placeholder="请输入用户账号"
        v-model="userName"
      >
        <template #before>
          <span class="text-caption text-bold">用户账号：</span>
        </template>
      </q-input>

      <date-picker-range />
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
import DatePickerRange from "components/dateTimePicker/range.vue";
import "vue-datepicker-next/index.css";
import { ref } from "vue";
export default {
  emits: ["search"],
  components: {
    InputFilterCompany,
    DatePickerRange,
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
