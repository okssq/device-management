<template>
  <div class="absolute-full">
    <global-map @load-success="onMapLoadSuccess" />
    <q-select
      v-bind="baseSelectProps"
      style="top: 20px"
      v-model="province"
      :options="provinceOptions"
      @update:model-value="onProvinceChange"
    >
      <template #prepend>
        <div class="text-subtitle2 text-bold q-ml-md">省级：</div>
      </template>
      <template #after>
        <div class="text-subtitle2 text-bold q-mr-sm"></div>
      </template>
    </q-select>
    <q-select
      v-bind="baseSelectProps"
      :clearable="!(city === '直辖市' || city === '特别行政区')"
      style="top: 74px"
      v-model="city"
      :options="cityOptions"
      @update:model-value="onCityChange"
    >
      <template #prepend>
        <div class="text-subtitle2 text-bold q-ml-md">地级：</div>
      </template>
      <template #after>
        <div class="text-subtitle2 text-bold q-mr-sm"></div>
      </template>
    </q-select>
    <q-select
      v-bind="baseSelectProps"
      style="top: 128px"
      v-model="district"
      :options="districtOptions"
      @update:model-value="onDistrictChange"
    >
      <template #prepend>
        <div class="text-subtitle2 text-bold q-ml-md">县级：</div>
      </template>
      <template #after>
        <div class="text-subtitle2 text-bold q-mr-sm"></div>
      </template>
    </q-select>
    <div
      class="absolute-top-right bg-white shadow-2"
      style="width: 260px; top: 182px; right: 20px; border-radius: 2px"
    >
      <q-input
        dense
        borderless
        debounce="500"
        placeholder="请输入项目名称"
        class="q-mx-md q-my-sm"
        v-model="filterText"
      >
        <template #append>
          <q-icon name="search"></q-icon>
        </template>
      </q-input>
      <q-separator />
      <q-list>
        <template v-for="item in filterList" :key="item.id">
          <q-item
            clickable
            :active="selectProjectId === item.id"
            @click="onSelectProjrctItem(item)"
          >
            <q-item-section>
              <q-item-label lines="2">{{ item.projectName }}</q-item-label>
              <q-item-label caption lines="2">{{
                item.projectAddress
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </template>
        <q-item v-if="!filterList.length">
          <q-item-section>
            <q-item-label caption>暂无匹配数据</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import GlobalMap from "components/map";
import useMain from "./useMain";
import { onBeforeUnmount } from "vue";
export default {
  components: {
    GlobalMap,
  },
  setup() {
    const baseSelectProps = {
      class: "aa absolute-top-right bg-white shadow-2",
      dense: true,
      clearable: true,
      borderless: true,
      optionsDense: true,
      "popup-content-class": "text-grey-7 select__content",
      style: "right: 20px; width: 260px; border-radius: 2px",
    };
    const {
      projectList,
      provinceOptions,
      cityOptions,
      districtOptions,
      province,
      city,
      district,
      filterText,
      filterList,
      selectProjectId,

      onSelectProjrctItem,
      onProvinceChange,
      onCityChange,
      onDistrictChange,
      onMapLoadSuccess,
      clearMap,
    } = useMain();

    onBeforeUnmount(() => {
      clearMap();
    });

    return {
      baseSelectProps,
      projectList,
      provinceOptions,
      cityOptions,
      districtOptions,
      province,
      city,
      district,
      filterText,
      filterList,
      selectProjectId,

      onSelectProjrctItem,
      onProvinceChange,
      onCityChange,
      onDistrictChange,
      onMapLoadSuccess,
    };
  },
};
</script>
