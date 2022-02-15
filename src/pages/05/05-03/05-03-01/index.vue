<template>
  <div class="my-box column no-wrap">
    <search-bar
      :searching="searching"
      :tree-list="treeList"
      @search="onSearch"
    />
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
        <template #custom-host="{ val }">
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
import { useCompanyTree } from "components/company/useCompayTree";
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
        name: "host",
        field: "host",
        label: "IP地址",
        align: "left",
        type: "custom",
      },
      {
        name: "createTime",
        field: "createTime",
        label: "登录时间",
        align: "left",
        type: "custom",
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

    const { treeList } = useCompanyTree();
    const getList = () => {
      searching.value = true;
      LOGS.loginList(searchData)
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
      treeList,
    };
  },
};
</script>
