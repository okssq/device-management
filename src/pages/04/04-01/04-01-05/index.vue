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
        <template #custom-type="{ val }">
          <q-badge
            outline
            :label="termTypeText[val] || `未知类型type${val}`"
            :color="typeColor[val] || 'blue-grey'"
          />
        </template>
        <template #custom-onlineStatus="{ val }">
          <div class="row no-wrap justify-center">
            <q-icon
              size="22px"
              class="q-mr-sm"
              :color="onlineStatusColor[val] || 'primary'"
              :name="onlineStatusIcon[val]"
            />
            <q-badge
              dense
              :label="termStatusText[val] || '-'"
              :color="onlineStatusColor[val] || 'primary'"
            />
          </div>
        </template>
        <template #op="{ row }">
          <div class="q-gutter-sm">
            <q-btn
              flat
              round
              size="12px"
              color="indigo"
              icon="phonelink_setup"
              title="注册设备"
              @click.stop="onBind(row)"
            />
          </div>
        </template>
      </result-table>
    </div>
  </div>
  <detail-form
    v-if="bindDialogVisible"
    :tree-list="treeList"
    :select-company-id="selectCompanyId"
    :select-company-name="selectCompanyName"
    :form-data="bindData"
    @cancel="bindDialogVisible = false"
    @ok="onConfirmBind"
  ></detail-form>
</template>
<script>
import SearchBar from "./search-bar.vue";
import ResultTable from "components/table";
import DetailForm from "./detail-form.vue";
import { reactive, ref, shallowRef, toRefs } from "vue";
import { TERMINAL } from "src/api/module";
import useBind from "./useBind";
import { useCompanyTree } from "components/company/useCompayTree";
import { termTypeText,termStatusText } from 'src/util/common'
export default {
  emits: ["cancel"],
  components: {
    SearchBar,
    ResultTable,
    DetailForm,
  },
  setup() {
    const { treeList } = useCompanyTree();
    const selectCompanyId = ref("");
    const selectCompanyName = ref("");

    const onlineStatusColor = {
      0: "grey-8",
      1: "green",
    };
    const onlineStatusIcon = {
      0: "power_off",
      1: "electrical_services",
    };

    const typeColor = {
      1: "pink",
      2: "purple",
      3: "indigo",
      4: "blue",
    };
    const loading = ref(false);
    const columns = [
      {
        name: "terminalId",
        field: "terminalId",
        label: "设备ID",
        align: "left",
      },
      {
        name: "type",
        field: "type",
        label: "设备类型",
        align: "left",
        type: "custom",
      },
      {
        name: "onlineStatus",
        field: "onlineStatus",
        label: "在线状态",
        align: "left",
        type: "custom",
      },
      {
        name: "onlineTime",
        field: "onlineTime",
        label: "最后在线时间",
        align: "left",
      },
      {
        name: "op",
        label: "操作",
        field: "op",
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
      TERMINAL.unbindList(searchData)
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
    // 表格pagination改变回调
    const onPageChange = (val) => {
      const { pageSize, page } = val;
      page && (pagination.page = page);
      pageSize && (pagination.pageSize = pageSize);
      searchData && (searchData = { ...searchData, ...val });
      getList();
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

    const { bindDialogVisible, bindData, onBind, onConfirmBind } = useBind(
      treeList,
      selectCompanyId,
      selectCompanyName,
      getList
    );
    return {
      termStatusText,
      onlineStatusColor,
      onlineStatusIcon,
      termTypeText,
      typeColor,
      loading,
      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onSearch,
      onPageChange,

      bindDialogVisible,
      bindData,
      onBind,
      onConfirmBind,

      treeList,
      selectCompanyId,
      selectCompanyName,
    };
  },
};
</script>
