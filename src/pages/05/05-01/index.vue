<template>
  <div class="my-box column no-wrap">
    <search-bar :searching="searching" @search="onSearch" @insert="onInsert" />
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
        <template #custom-withCompany="{ val }">
          <q-badge
            size="sm"
            :color="val == 1 ? 'green' : 'red'"
            :label="val == 1 ? '是' : '否'"
          />
        </template>
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
import { reactive, ref, shallowRef, toRefs } from "vue";
import { USER, ROLE } from "src/api/module.js";
import { notifySuccess, notifyWarn } from "src/util/common";
import { useQuasar } from "quasar";
export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const $q = useQuasar();
    const columns = [
      {
        name: "userName",
        field: "userName",
        label: "用户账号",
        align: "left",
      },
      {
        name: "realName",
        field: "realName",
        label: "用户昵称",
        align: "left",
      },
      {
        name: "telephone",
        field: "telephone",
        label: "联系电话",
        align: "left",
      },
      {
        name: "companyName",
        field: "companyName",
        label: "所属公司",
        align: "left",
      },
      {
        name: "withCompany",
        field: "withCompany",
        label: "管理员",
        align: "center",
        type: "custom",
      },
      {
        name: "createTime",
        field: "createTime",
        label: "创建时间",
        align: "left",
      },
      {
        name: "updateTime",
        field: "updateTime",
        label: "最后更新时间",
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
    let searchData, roleList;

    const getRoleList = () => {
      ROLE.selectList({ CompanyId: 1 })
        .then((res) => {
          roleList = res.map((el) => {
            const { label, id } = el;
            return {
              label,
              value: id,
            };
          });
        })
        .catch(() => {});
    };
    const getList = () => {
      searching.value = true;
      USER.list(searchData)
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
      if (!roleList) {
        notifyWarn("正在下载角色数据，请稍等!");
        return;
      }
      $q.dialog({
        component: DetailForm,
        componentProps: {
          type: "insert",
          roleList,
        },
      }).onOk(() => {
        notifySuccess("增加成功");
        onSearch({ page: 1 });
      });
    };
    // 编辑按钮回调
    const onEdit = (row) => {
      if (!roleList) {
        notifyWarn("正在下载角色数据，请稍等!");
        return;
      }
      $q.dialog({
        component: DetailForm,
        componentProps: {
          type: "edit",
          formData: row,
          roleList,
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
        USER.del({ id: row.id })
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

    getRoleList();

    return {
      columns,
      rows,
      ...toRefs(pagination),
      searching,
      onPageChange,
      onSearch,
      onInsert,
      onEdit,
      onDel,
    };
  },
};
</script>
