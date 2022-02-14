<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
      <q-input outlined dense v-model="terminalId">
        <template #prepend>
          <span class="text-caption text-bold">设备ID</span>
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
    const terminalId = ref("");
    const onSubmit = () => {
      emit("search", {
        terminalId: "",
        type: "1",
      });
    };
    onSubmit();

    return {
      terminalId,
      onSubmit,
    };
  },
};
</script>
