<template>
  <div class="absolute fit bg-white z-max overflow-hidden column no-wrap">
    <div
      class="row justify-between items-center no-wrap q-px-md q-py-sm bg-grey-1"
    >
      <q-btn flat icon="undo" color="primary" @click="$emit('cancel')"
        >返回</q-btn
      >
      <div class="text-subtitle1">
        {{ data ? data.label + data.version : "" }}样式配置
      </div>
    </div>
    <q-separator />
    <div class="flex1 row no-wrap">
      <component :is="templateComponent"></component>
      <q-separator vertical></q-separator>
      <resource />
    </div>
  </div>
</template>

<script>
import Resource from "./resource/index.vue";
import Template1 from "./locker";
import { computed } from "vue";
export default {
  emits: ["cancel"],
  components: {
    Resource,
    Template1,
  },
  props: {
    data: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    const templateComponentById = {
      1: Template1,
    };
    const templateComponent = computed(() => {
      if (!props.data) return "";
      else return templateComponentById[props.data.id];
    });

    return {
      templateComponent,
    };
  },
};
</script>

<style scoped>
.item-resource video {
  object-fit: fill;
}
.sence {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
