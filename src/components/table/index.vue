<template>
  <q-table
    flat
    hide-pagination
    binary-state-sort
    align="left"
    separator="cell"
    :rows="rows"
    :columns="columns"
    :loading="loading"
    :pagination="{ page: 1, rowsPerPage: 0 }"
    :rows-per-page-options="[0]"
    :row-key="rowKey"
    class="my-table"
    style="max-height: 100%"
  >
    <!-- 自定义表header -->
    <template #header="props">
      <q-tr :props="props">
        <q-th auto-width v-if="expand" />
        <q-th auto-width v-if="index">序号</q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <!-- 自定义表body -->
    <template #body="props">
      <q-tr :props="props" @click="handleRowClick(props)">
        <q-td auto-width v-if="expand">
          <q-btn
            flat
            round
            dense
            size="sm"
            color="primary"
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'expand_less' : 'expand_more'"
          />
        </q-td>
        <q-td auto-width v-if="index"> #{{ props.rowIndex + 1 }} </q-td>
        <q-td v-for="col in props.cols" :key="col.field" :props="props">
          <template v-if="col.type && col.type === 'custom'">
            <slot
              :name="`custom-${col.field}`"
              :val="col.value"
              :row="props.row"
            />
          </template>
          <template v-else-if="col.field === 'op'">
            <slot name="op" :val="col.value" :row="props.row" />
          </template>
          <template v-else>
            {{ col.value }}
          </template>
        </q-td>
      </q-tr>
      <q-tr v-if="expand" v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <slot name="expand" :row="props.row"></slot>
        </q-td>
      </q-tr>
    </template>
    <!-- 自定义表bottom-->
    <template #bottom>
      <div class="full-width row items-center" style="margin: -6px">
        <span class="text-subtitle2 text-grey-7">
          共搜索到
          <span class="text-primary text-bold">{{ total }} </span> 条数据
        </span>
        <q-space />
        <div class="row items-center justify-end">
          <q-select
            outlined
            dense
            options-dense
            emit-value
            map-options
            hide-dropdown-icon
            style="width: 90px"
            class="q-ma-sm"
            :model-value="pageSize"
            :options="pageSizes"
            @update:model-value="pageSizeChange"
          />
          <q-pagination
            size="12px"
            class="q-ma-sm"
            boundary-links
            :max="totalPage"
            :max-pages="5"
            :model-value="page"
            @update:model-value="pageChange"
          />
          <q-input
            outlined
            dense
            min="1"
            type="number"
            style="width: 140px"
            class="q-ma-sm"
            :max="totalPage"
            v-model.number="inputPage"
            @keyup.enter="inputPageChange"
          >
            <template #prepend>
              <span class="text-caption text-bold">跳转到</span>
            </template>
            <template #append>
              <span class="text-caption text-bold">页</span>
            </template>
          </q-input>
        </div>
      </div>
    </template>
  </q-table>
</template>

<script>
import { computed, ref } from "vue";
export default {
  emits: ["insert", "edit", "del", "page"],
  props: {
    expand: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Boolean,
      default: true,
    },
    rowKey: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const totalPage = computed(() => Math.ceil(props.total / props.pageSize));
    const pageSizes = [10, 20, 30, 50, 100].map((el) => ({
      label: `${el}条/页`,
      value: el,
    }));

    const inputPage = ref(null);

    const pageChange = (page, pageSize) => {
      const pagination = {
        total: props.total,
        pageSize: pageSize || props.pageSize,
        page,
      };
      if (
        pagination.pageSize === props.pageSize &&
        pagination.page === props.page
      )
        return;
      emit("page", pagination);
    };
    const pageSizeChange = (pageSize) => {
      if (props.pageSize === pageSize) return;
      pageChange(1, pageSize);
    };
    const inputPageChange = () => {
      const value = inputPage.value + 0;
      if (!/^[0-9]+$/.test(value)) return;
      if (!value && value !== 0) return;
      if (value > totalPage.value) {
        inputPage.value = totalPage.value;
      } else if (value < 1) {
        inputPage.value = 1;
      }
      if (inputPage.value !== props.page) {
        const pagination = {
          total: props.total,
          page: inputPage.value,
          pageSize: props.pageSize,
        };
        emit("page", pagination);
      }
    };

    const handleRowClick = (props) => {
      console.log("props", props);
    };

    return {
      totalPage,
      pageSizes,
      inputPage,

      inputPageChange,
      pageSizeChange,
      pageChange,
      handleRowClick,
    };
  },
};
</script>

<style scoped></style>
