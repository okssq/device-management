<template>
  <div class="my-box column no-wrap">
    <search-bar :searching="searching" @search="onSearch" />
    <q-separator />
    <div class="flex1 overflow-hidden">
      <result-table
        :rows="rows"
        :columns="columns"
        :loading="searching"
        :page="page"
        :page-size="pageSize"
        :total-count="totalCount"
        :total-page="totalPage"
        @page="onPageChange"
      >
        <template #custom-operType="{ val }">
          <q-badge dense color="blue-5" :label="val" />
        </template>
        <template #custom-operIp="{ val }">
          <div class="text-subtitle2 text-primary" style="font-size: 13px">
            {{ val }}
          </div>
        </template>
        <template #custom-createTime="{ val }">
          <div class="text-subtitle2 text-deep-orange" style="font-size: 13px">
            {{ val }}
          </div>
        </template>
      </result-table>
    </div>
  </div>
</template>

<script>
import SearchBar from "./search-bar.vue";
import ResultTable from "components/table";
import { reactive, ref, shallowRef, toRefs } from "vue";
import { LOGS } from "src/api/module.js";
export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const columns = [
      {
        name: "userName",
        field: "userName",
        label: "用户账号",
        align: "left",
      },
      {
        name: "companyName",
        field: "companyName",
        label: "公司名称",
        align: "left",
      },
      {
        name: "operType",
        field: "operType",
        label: "操作类型",
        align: "left",
        type: "custom",
      },
      {
        name: "operModel",
        field: "operModel",
        label: "操作模块",
        align: "left",
      },

      {
        name: "operIp",
        field: "operIp",
        label: "IP地址",
        align: "left",
        type: "custom",
      },
      {
        name: "createTime",
        field: "createTime",
        label: "操作时间",
        align: "left",
        type: "custom",
      },
      {
        name: "operDesc",
        field: "operDesc",
        label: "操作描述",
        align: "left",
      },
    ];
    const rows = shallowRef([]);
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
    });
    const searching = ref(false);
    let searchData;

    const getList = () => {
      searching.value = true;
      LOGS.operationList(searchData)
        .then((res) => {
          const { results, totalCount, totalPage } = res;
          rows.value = results;
          pagination.totalCount = totalCount;
          pagination.totalPage = totalPage;
        })
        .catch(() => {})
        .finally(() => {
          searching.value = false;
        });
    };
    // 搜索回调
    const onSearch = (val) => {
      pagination.page = 1;
      searchData = {
        ...val,
        page: 1,
        pageSize: pagination.pageSize,
      };
      getList();
    };
    // 表格pagination改变回调
    const onPageChange = (val) => {
      const { pageSize, page } = val;
      page && (pagination.page = page);
      pageSize && (pagination.pageSize = pageSize);
      searchData && (searchData = { ...searchData, ...val });
      getList();
    };
    return {
      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onSearch,
      onPageChange,
    };
  },
};
</script>
