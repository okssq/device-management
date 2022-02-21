<template>
  <div class="absolute-full">
    <global-map />
    <div
      class="absolute-top-right bg-white q-ma-md column no-wrap items-end q-gutter-sm overflow-hidden"
      style="widdh: 310px; max-height: 100%"
    >
      <q-select
        clearable
        :options="provinceOptions"
        v-model="province"
        @update:model-value="onProvinceChange"
      >
        <template #prepend>
          <div class="text-subtitle2 text-bold">省市区：</div>
        </template>
      </q-select>
      <q-select
        clearable
        :options="districtOptions"
        v-model="district"
        @update:model-value="onDistrictChange"
      >
        <template #prepend>
          <div class="text-subtitle2 text-bold">地级市：</div>
        </template>
      </q-select>

      <q-input
        dense
        borderless
        debounce="500"
        placeholder="请输入项目名称"
        class="q-mx-md q-my-sm"
        v-model="filterText"
        @update:model-value="onFilterChange"
      >
        <template #append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-separator />
      <q-list v-if="filterList.length">
        <template v-for="item in filterList" :key="item.id">
          <q-item clickable>
            <q-item-section>
              <q-item-label lines="2">{{ item.projectName }}</q-item-label>
              <q-item-label caption>{{ item.companyName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </template>
      </q-list>
    </div>
  </div>
</template>
<script>
import GlobalMap from "components/map";
import useMain from "./useMain";
import { onMounted } from "vue";
export default {
  components: {
    GlobalMap,
  },
  setup() {
    const {
      projectList,
      provinceOptions,
      districtOptions,
      province,
      district,
      filterText,
      filterList,

      onProvinceChange,
      onDistrictChange,
      onFilterChange,
      initMap,
      getProjectList,
    } = useMain();

    onMounted(() => {
      getProjectList();
      setTimeout(() => {
        initMap();
      }, 1000);
    });

    return {
      projectList,
      provinceOptions,
      districtOptions,
      province,
      district,
      filterText,
      filterList,

      onProvinceChange,
      onDistrictChange,
      onFilterChange,
      initMap,
      getProjectList,
    };
  },
};
</script>
