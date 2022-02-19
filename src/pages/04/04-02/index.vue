<template>
  <div class="my-box column no-wrap">
    <search-bar
      :tree-list="treeList"
      :searching="searching"
      @search="onSearch"
      @insert="onInsert"
    />
    <q-separator />
    <div class="flex1 overflow-hidden">
      <result-table
        expand
        row-key="id"
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
              <div class="label">项目ID:</div>
              <div class="value">{{ row.id }}</div>
            </div>
            <div class="item row">
              <div class="label">项目简介:</div>
              <div class="value">{{ row.describeStr }}</div>
            </div>
            <div class="item row">
              <div class="label">项目区域:</div>
              <div class="value">{{ row.projectCity }}</div>
            </div>
            <div class="item row">
              <div class="label">项目详细地址:</div>
              <div class="value">{{ row.projectAddress }}</div>
            </div>
            <div class="item row">
              <div class="label">创建时间:</div>
              <div class="value">{{ row.createTime }}</div>
            </div>
            <div class="item row">
              <div class="label">最后更新时间:</div>
              <div class="value">{{ row.createTime }}</div>
            </div>
          </div>
        </template>
        <template #custom-mapStr="{ row }">
          <span>{{ row.mapStr }}</span>
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
  <detail-form
    v-if="detailVisible"
    :login-company-id="loginCompanyId"
    :type="detailType"
    :form-data="detailData"
  />
</template>

<script>
import SearchBar from "./search-bar.vue";
import ResultTable from "components/table";
import DelConfirm from "components/del-confirm.vue";
import DetailForm from "./detail-form.vue";
import { reactive, ref, shallowRef, toRefs, inject } from "vue";
import { PROJECT } from "src/api/module.js";
import { notifySuccess } from "src/util/common";
import { useQuasar } from "quasar";
import { useCompanyTree } from "components/company/useCompayTree";
export default {
  components: {
    SearchBar,
    ResultTable,
    DetailForm,
  },
  setup() {
    const LOAD = inject("LOAD");
    const { treeList } = useCompanyTree();
    const $q = useQuasar();
    const columns = [
      {
        name: "projectName",
        field: "projectName",
        label: "项目名称",
        align: "left",
      },
      {
        name: "companyName",
        field: "companyName",
        label: "所属公司",
        align: "left",
      },
      {
        name: "concat",
        field: "concat",
        label: "负责人",
        align: "left",
      },
      {
        name: "concatPhone",
        field: "concatPhone",
        label: "负责人电话",
        align: "left",
      },
      {
        name: "mapStr",
        field: "mapStr",
        label: "项目所属地区",
        align: "left",
        type: "custom",
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

    const detailVisible = ref(false);
    const detailType = ref("inset");
    const loginCompanyId = LOAD.loginInfo.companyId;
    const detailData = ref(null);
    let searchData;

    const getList = () => {
      searching.value = true;
      PROJECT.list(searchData)
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
    // 新增按钮回调
    const onInsert = () => {
      detailData.value = null;
      detailType.value = "insert";
      detailVisible.value = true;
      // notifySuccess("增加成功");
      // onSearch({ page: 1 });
    };
    // 编辑按钮回调
    const onEdit = (row) => {
      detailData.value = row;
      detailType.value = "edit";
      detailVisible.value = true;

      // notifySuccess("更新成功");
      // getList();
    };

    const onDel = (row) => {
      $q.dialog({
        component: DelConfirm,
        componentProps: { row },
      }).onOk(() => {
        searching.value = true;
        PROJECT.del({ id: row.id })
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
      columns,
      rows,
      ...toRefs(pagination),
      searching,

      detailVisible,
      detailType,
      loginCompanyId,
      detailData,

      onPageChange,
      onSearch,
      onInsert,
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
