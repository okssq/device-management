<template>
  <div class="absolute fit bg-white z-max overflow-hidden column no-wrap">
    <div class="row justify-between items-center no-wrap q-px-md q-py-sm bg-grey-1">
      <q-btn flat icon="undo" color="primary" to="/terminal/adconfig">返回</q-btn>
      <div class="text-subtitle1">
        templateId：{{ templateId }}
      </div>
    </div>
    <q-separator/>
    <div class="flex1 row no-wrap overflow-hidden">
      <resource/>
      <q-separator vertical/>
      <component :is="templateComponent" />
    </div>
  </div>
</template>

<script>
import Resource from "./resource";
import {computed} from "vue";
import template2 from'./template2'
import template3 from'./template3'

export default {
  components: {
    Resource,
  },
  props: {
    templateId: {
      type: String,
      default: '0'
    }
  },

  setup(props) {
    const templateComponentById = {
      2: template2,
      3: template3,
    }
    const templateComponent = computed(() => {
      if (!props.templateId) return "";
      return templateComponentById[props.templateId];
    });


    return {
      templateComponent
    };
  },
};
</script>


