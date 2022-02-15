<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="width: 700px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">未注册设备</div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />
      <div class="column q-pb-md overflow-hidden" style="max-height: 400px">
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
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import SearchBar from "./unbind-content/search-bar.vue";
import ResultTable from "components/table";
import DetailForm from "./unbind-content/detail-form.vue";
import { useDialogPluginComponent } from "quasar";
import { reactive, ref, shallowRef, toRefs } from "vue";
import { TERMINAL } from "src/api/module";
import { useQuasar } from "quasar";
export default {
  emits: [...useDialogPluginComponent.emits],
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
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
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const loading = ref(false);
    const $q = useQuasar();
    const columns = [
      {
        name: "terminalId",
        field: "terminalId",
        label: "设备IMEI",
        align: "left",
      },
      {
        name: "type",
        field: "type",
        label: "设备类型",
        align: "left",
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
    const onBind = (row) => {
      $q.dialog({
        component: DetailForm,
        componentProps: {
          formData: row,
        },
      });
    };
    return {
      onlineStatusText,
      onlineStatusColor,
      onlineStatusIcon,
      typeText,
      typeColor,
      dialogRef,
      loading,

      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onSearch,
      onPageChange,
      onBind,
      onDialogHide,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 260px;
}
.my-form-label {
  max-width: 80px;
}
</style>
