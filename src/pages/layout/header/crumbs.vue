<template>

  <q-breadcrumbs v-show="crumbs" class="gt-sm text-grey-7" gutter="sm">
    <template #separator>
      <q-icon color="grey-7" name="navigate_next" size="1em"/>
    </template>
    <q-breadcrumbs-el
      v-for="(item, index) in crumbs"
      :key="index"
      :label="item"
    />
  </q-breadcrumbs>

</template>

<script>
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  setup() {
    const route = useRoute();
    const crumbs = computed(() => {
      return route.meta.crumbs;
    });
    return {
      crumbs,
    };
  },
};
</script>
