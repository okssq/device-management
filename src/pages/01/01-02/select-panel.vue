<template>
  <div
    class="absolute-top-right q-ma-md column no-wrap items-end q-gutter-sm overflow-hidden"
    style="widdh: 310px; max-height: 100%"
  >
    <q-select
      v-bind="selectBaseProps"
      :options="province"
      v-model="fisrtLevel"
      @update:model-value="onFirstLevelChange"
    >
      <template #prepend>
        <div class="text-subtitle2 text-bold">省市区：</div>
      </template>
    </q-select>
    <q-select
      v-bind="selectBaseProps"
      :options="secondLevelOptions"
      v-model="secondLevel"
      @update:model-value="$emit('province-change', $event)"
    >
      <template #prepend>
        <div class="text-subtitle2 text-bold">地级市：</div>
      </template>
    </q-select>
    <div
      class="bg-white shadow-2 overflow-hidden"
      style="width: 256px; border-radius: 4px"
    >
      <q-input
        dense
        borderless
        placeholder="请输入项目名称"
        class="q-mx-md q-my-sm"
      >
        <template #append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-separator />
      <q-list>
        <template v-for="item in list" :key="item.id">
          <q-item clickable>
            <q-item-section>
              <q-item-label lines="2">{{ item.projectName }}</q-item-label>
              <q-item-label caption>{{ item.companyName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </template>
      </q-list>

      <!-- <q-list></q-list> -->
    </div>
  </div>
</template>
<script>
import { computed, ref, shallowRef, toRaw, onMounted } from "vue";
export default {
  emits: ["province-change"],
  props: {
    province: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    optionsTree: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    const selectBaseProps = {
      dense: true,
      borderless: true,
      clearable: true,
      style: "width:256px;background:#fff;border-radius: 4px;",
      class: "bg-white q-px-md q-py-sm shadow-2",
    };

    const firstLevelOptions = computed(() => {
      if (!props.optionsTree) return [];
      else {
        return Object.keys(props.optionsTree);
      }
    });
    const secondLevelOptions = shallowRef([]);
    const filterList = shallowRef([]);
    const fisrtLevel = ref("");
    const secondLevel = ref("");

    const onFirstLevelChange = (val) => {
      console.log("val", val);
      secondLevel.value = "";
      if (!val) {
        secondLevelOptions.value = [];
        filterList.value = toRaw(props.list);
      } else {
        secondLevelOptions.value = props.optionsTree[val];
        filterList.value = props.list.filter((el) => {
          return el["city"] === val || el["district"] === val;
        });
      }
    };
    const onSeconLevndelChange = (val) => {
      if (val) {
        filterList.value = toRaw(props.list);
      }
    };

    const fnfirstLevelOptions = () => {};
    onMounted(() => {});
    return {
      selectBaseProps,
      firstLevelOptions,
      secondLevelOptions,
      filterList,
      fisrtLevel,
      secondLevel,

      onFirstLevelChange,
      onSeconLevndelChange,
    };
  },
};
</script>
