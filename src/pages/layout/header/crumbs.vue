<template>
  <q-breadcrumbs v-show="crumbs" gutter="sm" class="gt-xs text-grey-7">
    <template #separator>
      <q-icon size="1em" name="navigate_next" color="grey-7" />
    </template>
    <q-breadcrumbs-el
      v-for="(item, index) in crumbs"
      :key="index"
      :label="item"
    />
  </q-breadcrumbs>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

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
