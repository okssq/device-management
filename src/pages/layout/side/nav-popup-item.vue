<template>
  <q-item clickable v-ripple :class="navItemClass" :to="nav.path || void 0">
    <div class="flex1 row items-center">
      <q-icon v-if="level === 0" size="24px" :name="nav.icon" />
      <q-icon
        v-else
        style="margin-right: 6px"
        :size="iconSize"
        :name="iconName"
      />
      <div v-if="nav.label && level !== 0" class="nav-label">
        {{ nav.label }}
      </div>
    </div>
    <q-menu
      v-if="nav.children"
      anchor="top right"
      self="top left"
      class="z-max popup-nav"
      :offset="[5, 0]"
    >
      <q-list>
        <nav-item
          v-for="item in nav.children"
          :key="item.id"
          :nav="item"
          :level="level + 1"
        />
      </q-list>
    </q-menu>
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
      const partC = props.level === 0 ? "q-mb-xs" : "";
      return `${partB} ${partA} ${partC}`;
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
