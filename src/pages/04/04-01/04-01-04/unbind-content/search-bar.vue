<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <q-input outlined dense v-model="terminalId">
        <template #before>
          <span class="text-caption text-bold">设备ID：</span>
        </template>
      </q-input>
      <q-select
        style="width: 240px"
        dense
        outlined
        clearable
        lazy-rules
        v-model="type"
        emit-value
        map-options
        :options="options"
      >
        <template #before>
          <span class="text-caption text-bold">设备类型：</span>
        </template>
      </q-select>
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
    const terminalId = ref("");
    const type = ref("1");
    const options = [
      { label: "座椅", value: "1" },
      { label: "储物柜", value: "2" },
      { label: "打卡桩", value: "3" },
      { label: "大屏", value: "4" },
    ];
    const onSubmit = () => {
      emit("search", {
        terminalId: terminalId.value,
        type: type.value,
      });
    };
    onSubmit();

    return {
      terminalId,
      type,
      options,
      onSubmit,
    };
  },
};
</script>
