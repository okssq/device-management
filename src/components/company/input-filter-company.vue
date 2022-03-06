<template>
  <div>
    <q-input
      dense
      outlined
      clearable
      style="width: 240px"
      :style="$attrs.style"
      input-class="text-caption"
      placeholder="请输入关键字选择公司"
      :model-value="filterResultVisible ? inputFilter : selectLabel"
      @update:model-value="filter"
      @clear="onClear"

      @focusin="onFocus"
    >
      <template #before>
        <span :style="labelStyle" class="text-caption text-bold"
          >{{ labelText }}：</span
        >
      </template>
      <!-- <template #prepend>
        <q-icon size="16px" name="drive_file_rename_outline" color="primary" />
      </template> -->
      <q-menu
        fit
        no-parent-event
        no-refocus
        no-focus
        anchor="bottom left"
        self="top left"
        v-model="filterResultVisible"
        @hide="onHide"
      >
        <q-virtual-scroll
          separator
          style="max-width:234px;max-height: 240px"
          :items="filterList"
          :style="$attrs.style"
          :class="$attrs.class"

        >
          <template #default="{ item, index }">
            <slot :item="item" :index="index">
              <q-item  clickable @click="onSelectItem(item)" class="q-px-md q-py-none" style="min-height: 36px">
                <q-item-section
                  class="ellipsis q-pa-none"
                  :class="
                    item.id === modelValue ? 'text-primary' : 'text-grey-7'
                  "
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
  </div>
</template>
<script>
import { ref, shallowRef, computed, watch } from "vue";
export default {
  emit: ["update:modelValue", "select"],
  props: {
    labelText: {
      type: String,
      default: "公司名称",
    },
    labelStyle: {
      type: [String, Array],
      default: "",
    },
    filterText: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    treeList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const selectLabel = ref(props.filterText || "");
    const inputFilter = ref("");
    const filterResultVisible = shallowRef(false);
    const filterList = ref([]);
    const noResult = computed(() => {
      return !!(inputFilter.value || "").trim() && !filterList.value.length;
    });

    const filter = (val) => {
      inputFilter.value = val
      // filterResultVisible.value = true;
      const currentValue = (val || "").trim();
      if (!currentValue) {
        filterList.value = props.treeList;
      } else {
        const text = currentValue.toLowerCase();
        filterList.value = props.treeList.filter((el) =>
          el["label"].toLowerCase().includes(text)
        );
      }
    };
    const onFocus = () => {
      filterResultVisible.value = true;
      inputFilter.value = ''
      filterList.value = props.treeList;
    };
    const onClear = () => {
      inputFilter.value = ''
      selectLabel.value = "";
      emit("update:modelValue", "");
    };
    const onHide = () => {
      // inputFilter.value = "";
      // if (props.modelValue) {
      //   inputFilter.value = selectLabel.value;
      // }
    };
    const onSelectItem = (item) => {
      filterResultVisible.value = false;
      inputFilter.value = '';
      selectLabel.value = item.label;
      emit("update:modelValue", item.id);
    };
    watch(
      () => props.treeList,
      (val) => {
        filterList.value = val;
      }
    );
    return {
      selectLabel,
      inputFilter,
      filterResultVisible,
      filterList,
      noResult,

      filter,
      onFocus,
      onClear,
      onHide,
      onSelectItem,
    };
  },
};
</script>
