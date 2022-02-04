<template>
  <q-expansion-item v-if="nav.children" class="q-mb-xs" :class="navItemClass">
    <template #header>
      <div class="flex1 row items-center">
        <q-icon
          style="margin-left: 6px; margin-right: 16px"
          :size="iconSize"
          :name="iconName"
        />
        <div class="nav-label">{{ nav.label }}</div>
      </div>
    </template>
    <q-list padding>
      <nav-item
        v-for="item in nav.children"
        :key="item.id"
        :nav="item"
        :level="level + 1"
      />
    </q-list>
  </q-expansion-item>
  <q-item
    v-else
    clickable
    v-ripple
    class="q-mb-xs text-grey-7"
    :class="navItemClass"
    :to="nav.path || void 0"
  >
    <div class="row items-center">
      <q-icon
        style="margin-left: 6px; margin-right: 16px"
        :size="iconSize"
        :name="iconName"
      />
      <div class="nav-label">{{ nav.label }}</div>
    </div>
  </q-item>
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "nav-item",
  props: {
    nav: {
      type: Object,
      default: () => ({ label: "" }),
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const route = useRoute();
    const activeArr = computed(() => {
      const str = route.path.substring(1);
      const length = str.split("-").length;
      const arr = [];
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          arr.push(str.substring(0, 2));
        } else if (i === length - 1) {
          arr.push(str.substring(0));
        } else {
          arr.push(str.substring(0, 2 * (i + 1) + 2 * i - 1));
        }
      }
      return arr;
    });
    const iconSize = computed(() => {
      if (props.level === 0) return "24px";
      if (props.level === 1) return "10px";
      return "12px";
    });
    const iconName = computed(() => {
      if (props.level === 0) return props.nav.icon;
      if (props.level === 1)
        return activeArr.value.includes(props.nav.id)
          ? "radio_button_checked"
          : "radio_button_unchecked";
      return "insert_drive_file";
    });
    const navItemClass = computed(() => {
      const partA = activeArr.value.includes(props.nav.id)
        ? "active-nav"
        : "text-grey-7";
      const partB = `nav-level${props.level}`;
      return `${partB} ${partA}`;
    });
    return {
      activeArr,
      iconSize,
      iconName,
      navItemClass,
    };
  },
};
</script>
