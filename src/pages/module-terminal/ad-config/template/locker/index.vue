<template>
  <div class="absolute fit bg-white z-max overflow-hidden column no-wrap">
    <div class="row justify-between items-center no-wrap q-px-md q-py-sm bg-grey-1">
      <q-btn flat icon="undo" color="primary" @click="onBack">返回</q-btn>
      <div class="text-subtitle1">
        智能座椅v1.1.0自定义样式配置
      </div>
    </div>
    <q-separator />
    <div class="flex1 row no-wrap overflow-hidden">
      <resource />
      <q-separator vertical />
<!--      <component :is="templateComponent" />-->
    </div>
  </div>
</template>

<script>
import Resource from "../resource";
import { useRouter } from 'vue-router'
import { computed } from "vue";
export default {
  components: {
    Resource,
  },
  props: {
    data: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    const router = useRouter()
    // 返回按钮
    const onBack = () => {
      router.push('/terminal/adconfig')
    }
    // const templateComponent = computed(() => {
    //   if (!props.data) return "";
    //   else return templateComponentById[props.data.id];
    // });


    return {
      onBack,
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
