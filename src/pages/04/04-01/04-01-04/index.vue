<template>
  <div class="my-box column no-wrap">
    <search-bar
      :tree-list="treeList"
      :searching="searching"
      @search="onSearch"
      @bind="onBind"
    />
    <q-separator />
    <div class="flex1 overflow-hidden">
      <result-table
        expand
        row-key="rIndex"
        :rows="rows"
        :columns="columns"
        :loading="searching"
        :page="page"
        :page-size="pageSize"
        :total-count="totalCount"
        :total-page="totalPage"
        @page="onPageChange"
      >
        <template #expand="{ row }">
          <div class="q-gutter-sm q-ml-sm text-body2">
            <div class="item row">
              <div class="label">设备别名:</div>
              <div class="value">{{ row.terminalName }}</div>
            </div>
            <div class="item row">
              <div class="label">所属公司:</div>
              <div class="value">{{ row.companyName }}</div>
            </div>
            <div class="item row">
              <div class="label">项目ID:</div>
              <div class="value">{{ row.projectId }}</div>
            </div>
            <div class="item row">
              <div class="label">项目名称:</div>
              <div class="value">{{ row.projectName }}</div>
            </div>
            <div class="item row">
              <div class="label">当前位置:</div>
              <div class="value">{{ row.address }}</div>
            </div>
            <div class="item row">
              <div class="label">创建时间:</div>
              <div class="value">{{ row.createTime }}</div>
            </div>
            <div class="item row">
              <div class="label">最后更新时间:</div>
              <div class="value">{{ row.updateTime }}</div>
            </div>
          </div>
        </template>
        <template #custom-gpsInfo="{ val }">
          <div
            class="text-primary cursor-pointer"
            style="text-decoration: underline"
          >
            <div>经度: {{ (val || "").split(",")[0] || "-" }}</div>
            <div>纬度: {{ (val || "").split(",")[1] || "-" }}</div>
          </div>
        </template>

        <template #custom-onlineStatus="{ row, val }">
          <div class="row no-wrap justify-center">
            <q-icon
              v-if="val"
              size="22px"
              class="q-mr-sm"
              :color="
                row.checkType !== row.type
                  ? 'red'
                  : onlineStatusColor[val] || 'primary'
              "
              :name="
                row.checkType !== row.type
                  ? 'device_unknown'
                  : onlineStatusIcon[val] || 'primary'
              "
            />
            <q-badge
              dense
              :label="
                row.checkType !== row.type
                  ? '设备类型不匹配'
                  : onlineStatusText[val] || '-'
              "
              :color="
                row.checkType !== row.type
                  ? 'red'
                  : onlineStatusColor[val] || 'pramary'
              "
            />
          </div>
        </template>
        <template #op="{ row }">
          <div class="q-gutter-sm">
            <q-btn
              title="编辑"
              flat
              dense
              size="10px"
              round
              color="blue-5"
              icon="edit"
              @click.stop="onEdit(row)"
            />
            <q-btn
              title="删除"
              flat
              dense
              size="10px"
              round
              color="red-5"
              icon="clear"
              @click.stop="onDel(row)"
            />
          </div>
        </template>
      </result-table>
    </div>
  </div>
</template>

<script>
import SearchBar from "./search-bar.vue";
import ResultTable from "components/table";
import DelConfirm from "components/del-confirm.vue";
import DetailForm from "./detail-form.vue";
import UnbindPanel from "./unbind-panel.vue";
import { reactive, ref, shallowRef, toRefs } from "vue";
import { TERMINAL } from "src/api/module.js";
import { notifySuccess } from "src/util/common";
import { useQuasar } from "quasar";
import { useCompanyTree } from "components/company/useCompayTree";
export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const { treeList } = useCompanyTree();
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
    const $q = useQuasar();
    const columns = [
      {
        name: "onlineStatus",
        field: "onlineStatus",
        label: "状态",
        align: "left",
        type: "custom",
      },
      {
        name: "terminalId",
        field: "terminalId",
        label: "设备号",
        align: "left",
      },
      {
        name: "projectName",
        field: "projectName",
        label: "所属项目",
        align: "left",
      },

      {
        name: "companyName",
        field: "companyName",
        label: "所属公司",
        align: "left",
      },
      {
        name: "gpsInfo",
        field: "gpsInfo",
        label: "GPS定位",
        align: "left",
        type: "custom",
      },
      {
        name: "address",
        field: "address",
        label: "项目所在位置",
        align: "left",
      },
      {
        name: "onlineTime",
        field: "onlineTime",
        label: "最近在线时间",
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
      TERMINAL.list(searchData)
        .then((res) => {
          const { results, totalCount, totalPage } = res;
          results.forEach((el, index) => {
            el.rIndex = index;
          });
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
      console.log("searchData", searchData);
    };
    // 表格pagination改变回调
    const onPageChange = (val) => {
      const { pageSize, page } = val;
      page && (pagination.page = page);
      pageSize && (pagination.pageSize = pageSize);
      searchData && (searchData = { ...searchData, ...val });
      getList();
    };
    // 未注册设备按钮回调
    const onBind = () => {
      $q.dialog({
        component: UnbindPanel,
      });
    };
    // 编辑按钮回调
    const onEdit = (row) => {
      $q.dialog({
        component: DetailForm,
        componentProps: {
          type: "edit",
          formData: row,
        },
      }).onOk(() => {
        notifySuccess("更新成功");
        getList();
      });
    };

    const onDel = (row) => {
      $q.dialog({
        component: DelConfirm,
        componentProps: { row },
      }).onOk(() => {
        searching.value = true;
        TERMINAL.del({ terminalId: row.terminalId })
          .then(() => {
            notifySuccess("删除成功");
            getList();
          })
          .catch(() => {})
          .finally(() => {
            searching.value = false;
          });
      });
    };

    return {
      treeList,
      onlineStatusText,
      onlineStatusColor,
      onlineStatusIcon,
      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onPageChange,
      onSearch,
      onBind,
      // onInsert,
      onEdit,
      onDel,
    };
  },
};
</script>
<style scoped>
.label {
  margin-right: 8px;
  color: #446ba4;
  font-weight: bold;
}
</style>
