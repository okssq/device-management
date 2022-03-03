<template>
<!--  <div class="q-pa-md row no-wrap">-->
    <q-input
      dense
      borderless
      debounce="350"
      class="q-px-md q-py-sm"
      placeholder="请输入设备号"
      :model-value="filterText"
      @update:model-value="onFilter"
      @focus.prevent.stop="listVisible = true"
    >
      <template #before>
        <q-icon name="search"></q-icon>
      </template>
      <q-menu
        fit
        no-parent-event
        no-refocus
        no-focus
        anchor="bottom left"
        self="top left"
        v-model="listVisible"
      >
        <q-virtual-scroll
          separator
          style="max-height: 240px"
          :items="filterList"
          :style="$attrs.style"
          :class="$attrs.class"
          :virtual-scroll-slice-size="20"
          :virtual-scroll-item-size="32"
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
      </q-menu>
    </q-input>
<!--  </div>-->
</template>

<script>
import { computed, ref, shallowRef } from "vue";

export default {
  emits: ["select", "update:filter-text"],
  props: {
    treeList: {
      type: Array,
      default: () => [],
    },
    filterText: {
      type: String,
      default: "",
    },
    selectId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const listVisible = ref(false);
    const filterList = shallowRef(props.treeList);
    const noResult = computed(() => {
      return !(props.filterTxt || "").trim() && !filterList.value.length;
    });

    // 输入文字过滤列表方法
    const onFilter = (val) => {
      emit("update:filter-text", val);
      const currentValue = val.trim();
      if (!currentValue) {
        filterList.value = props.treeList;
      } else {
        const text = currentValue.toLowerCase();
        filterList.value = props.treeList.filter((el) =>
          el["label"].toLowerCase().includes(text)
        );
      }
    };
    // 选中单项方法
    const onSelectItem = (item) => {
      listVisible.value = false;
      const { label } = item;
      emit("update:filter-text", label);
      emit("select", item);
    };

    return {
      listVisible,
      filterList,
      noResult,

      onFilter,
      onSelectItem,
    };
  },
};
</script>
