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
            dense
            :label="typeText[val] || '未知类型'"
            :color="typeColor[val] || 'blue-grey'"
          />
        </template>
        <template #custom-onlineStatus="{ val }">
          <div class="row no-wrap justify-center">
            <q-icon
              v-if="val"
              size="22px"
              class="q-mr-sm"
              :color="onlineStatusColor[val] || 'primary'"
              :name="onlineStatusIcon[val]"
            />
            <q-badge
              dense
              :label="onlineStatusText[val] || '-'"
              :color="onlineStatusColor[val] || 'primary'"
            />
          </div>
        </template>
        <template #op="{ row }">
          <div class="q-gutter-sm">
            <q-btn
              dense
              size="10px"
              color="indigo"
              icon="tune"
              label="注册设备"
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
import { reactive, ref, shallowRef, toRefs } from "vue";
import { TERMINAL } from "src/api/module";
import DetailForm from "./detail-form.vue";
import useBind from "./useBind";
import { useCompanyTree } from "components/company/useCompayTree";
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

    const onlineStatusText = {
      0: "离线",
      1: "在线",
    };
    const onlineStatusColor = {
      0: "grey-8",
      1: "green",
    };
    const onlineStatusIcon = {
      0: "power_off",
      1: "electrical_services",
    };
    const typeText = {
      1: "座椅",
      2: "储物柜",
      3: "打卡桩",
      4: "大屏",
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
        label: "在线时间",
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
      onlineStatusText,
      onlineStatusColor,
      onlineStatusIcon,
      typeText,
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
