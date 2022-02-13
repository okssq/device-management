<template>
  <q-virtual-scroll
    separator
    style="max-height: 240px"
    :items="filterList"
    :style="$attrs.style"
    :class="$attrs.class"
    :virtual-scroll-slice-size="fnCount"
    :virtual-scroll-item-size="itemHeight"
  >
    <template #default="{ item, index }">
      <slot :item="item" :index="index">
        <q-item dense clickable @click="onSelectItem(item)">
          <q-item-section
            :class="item.id === selectId ? 'text-primary' : 'text-grey-7'"
          >
            #{{ index + 1 }} - {{ item.label }}
          </q-item-section>
        </q-item>
      </slot>
    </template>
  </q-virtual-scroll>
  <q-item v-show="noResult">
    <q-item-section class="text-grey-6">暂无匹配数据</q-item-section>
  </q-item>
</template>

<script>
import { computed, shallowRef, watch } from "vue";
import { vList } from "./tree-date.js";
export default {
  emits: ["select", "check"],
  props: {
    filterTxt: {
      type: String,
      default: "",
    },
    selectId: {
      type: String,
      default: "",
    },
    fnCount: {
      type: [Number, String],
      default: 20,
    },
    itemHeight: {
      type: [Number, String],
      default: 32,
    },
    emitType: {
      type: String,
      default: "check",
    },
  },
  setup(props, { emit }) {
    const filterList = shallowRef([]);
    const noResult = computed(() => {
      return props.filterTxt.trim() && !filterList.value.length;
    });
    const onSelectItem = ({ id, label }) => {
      emit("select", { id, label });
    };

    watch(
      () => props.filterTxt,
      (val) => {
        const currentValue = val.trim();
        if (!currentValue) {
          filterList.value = [];
        } else {
          const text = currentValue.toLowerCase();
          filterList.value = vList.filter((el) =>
            el["label"].toLowerCase().includes(text)
          );
        }
        if (props.emitType !== "check") return false;
        const checkIds = filterList.value.map((el) => el.id);
        emit("check", currentValue ? (checkIds.length ? checkIds : null) : []);
      },
      { immediate: true }
    );

    return {
      filterList,
      noResult,
      onSelectItem,
    };
  },
};
</script>
