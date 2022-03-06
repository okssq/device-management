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
        <template #op="{ row }">
          <div class="q-gutter-sm">
            <q-btn
              title="编辑"
              color="primary"
              flat
              dense
              size="11px"
              round
              icon="edit"
              @click.stop="onEdit(row)"
            />
            <q-btn
              title="删除"
              color="red-5"
              flat
              dense
              size="11px"
              round
              icon="clear"
              @click.stop="onDel(row)"
            />
            <q-btn
              title="菜单授权"
              color="green"
              flat
              dense
              size="11px"
              round
              icon="tune"
              @click.stop="onAssign(row)"
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
import { reactive, ref, shallowRef, toRefs, inject } from "vue";
import { notifySuccess, notifyWarn } from "src/util/common";
import { ROLE } from "src/api/module.js";
import { useQuasar } from "quasar";
import { useCompanyTree } from "components/company/useCompayTree";
export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const LOAD = inject("LOAD");
    const { treeList } = useCompanyTree();
    const $q = useQuasar();
    const columns = [
      {
        name: "roleName",
        field: "roleName",
        label: "角色名称",
        align: "left",
      },

      {
        name: "companyName",
        field: "companyName",
        label: "所属公司",
        align: "left",
      },
      {
        name: "remark",
        field: "remark",
        label: "备注",
        align: "left",
      },
      {
        name: "userName",
        field: "userName",
        label: "创建人",
        align: "left",
      },
      {
        name: "createTime",
        field: "createTime",
        label: "创建时间",
        align: "left",
      },
      {
        name: "op",
        label: "操作",
        field: "op",
        align: "center",
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
      ROLE.list(searchData)
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

    // 新增按钮回调
    const onInsert = () => {
      if (!treeList.value.length) {
        notifyWarn("数据加载中，请稍后重试！");
        return;
      }
      const item = treeList.value.find((el) => {
        return el.id == LOAD.loginInfo.companyId;
      });

      const { id, label } = item || { id: "", label: "" };
      $q.dialog({
        component: DetailForm,
        componentProps: {
          type: "insert",
          selectCompanyId: id + "",
          selectCompanyName: label,
          treeList: treeList.value,
        },
      }).onOk(() => {
        notifySuccess("增加成功");
        onSearch({ page: 1 });
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
        ROLE.del({ id: row.id })
          .then((res) => {
            notifySuccess("删除成功");
            getList();
          })
          .catch(() => {})
          .finally(() => {
            searching.value = false;
          });
      });
    };

    const onAssign = () => {
      notifyWarn("此功能暂未开放！");
    };
    return {
      treeList,
      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onPageChange,
      onSearch,
      onInsert,
      onEdit,
      onDel,
      onAssign,
    };
  },
};
</script>
