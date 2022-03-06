<template>
  <div class="bg-white q-pl-md q-pb-md q-mt-md">
    <q-form class="q-gutter-sm row items-center" @submit="onSubmit">
<!--      <q-input-->
<!--        outlined-->
<!--        dense-->
<!--        v-model="terminalId"-->
<!--        input-class="text-caption"-->
<!--        placeholder="请输入设备ID"-->
<!--      >-->
<!--        <template #before>-->
<!--          <span class="text-caption text-bold">设备ID：</span>-->
<!--        </template>-->
<!--      </q-input>-->
      <q-select
        input-class="text-caption"
        placeholder="请选择设备类型"
        style="width: 240px"
        dense
        outlined
        :clearable="!!type"
        lazy-rules
        v-model="type"
        emit-value
        map-options
        :options="options"
        @clear="type=''"
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
import { termTypeText } from 'src/util/common'
export default {
  emits: ["search"],
  props: {
    searching: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // const terminalId = ref("");
    const type = ref("");
    const termTypeOptions = Object.keys(termTypeText).map(key=> {
      return {label:termTypeText[key],value:key}
    })
    const options =[
      {label: '请选择',value: ''},
      ...termTypeOptions
    ];
    const onSubmit = () => {
      emit("search", {
        // terminalId: terminalId.value,
        type: type.value,
      });
    };
    onSubmit();

    return {
      // terminalId,
      type,
      options,
      onSubmit,
    };
  },
};
</script>
