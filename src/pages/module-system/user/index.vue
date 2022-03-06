<template>
  <div class="my-box column no-wrap">
    <search-bar
      :tree-list="treeList"
      :searching="searching"
      @search="onSearch"
      @insert="onInsert"
    />
    <q-separator/>
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
              title="修改密码"
              color="green"
              flat
              dense
              size="11px"
              round
              icon="vpn_key"
              @click.stop="onUpdatePassword(row)"
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
import UpdatePasswordForm from "./update-password-form.vue";

import {USER} from "src/api/module.js";
import {inject, reactive, ref, shallowRef, toRefs} from "vue";
import {fn3001, notifySuccess, notifyWarn} from "src/util/common";
import {useQuasar} from "quasar";
import {useCompanyTree} from "components/company/useCompayTree";

export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const {treeList} = useCompanyTree();
    const loginInfo = inject("loginInfo");
    const $q = useQuasar();
    const columns = [
      {
        name: "userId",
        field: "userId",
        label: "用户ID",
        align: "left",
      },
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
        name: "roleName",
        field: "roleName",
        label: "角色",
        align: "left",
      },
      {
        name: "createTime",
        field: "createTime",
        label: "创建时间",
        align: "left",
      },
      // {
      //   name: "updateTime",
      //   field: "updateTime",
      //   label: "最后更新时间",
      //   align: "left",
      // },
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
      USER.list(searchData)
        .then((res) => {
          const {results, totalCount, totalPage} = res;
          rows.value = results;
          pagination.totalCount = totalCount;
          pagination.totalPage = totalPage;
        })
        .catch(() => {
        })
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
      const {pageSize, page} = val;
      page && (pagination.page = page);
      pageSize && (pagination.pageSize = pageSize);
      searchData && (searchData = {...searchData, ...val});
      getList();
    };
    // 新增按钮回调
    const onInsert = () => {
      if (!treeList.value.length) {
        notifyWarn("数据加载中，请稍后重试！");
        return;
      }
      const item = treeList.value.find((el) => el.id == loginInfo.value.companyId);
      if (!item) {
        fn3001()
        return
      }
      const {id, label} = item;
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
        onSearch({page: 1});
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
    // 修改密码回调
    const onUpdatePassword = (row) => {
      $q.dialog({
        component: UpdatePasswordForm,
        componentProps: {
          formData: row,
        },
      }).onOk(() => {
        notifySuccess("更新成功");
      });
    };
    // 删除按钮回调
    const onDel = (row) => {
      $q.dialog({
        component: DelConfirm,
      }).onOk(() => {
        searching.value = true;
        USER.del({id: row.id})
          .then(() => {
            notifySuccess("删除成功");
            getList();
          })
          .catch(() => {
          })
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
      onPageChange,
      onSearch,
      onInsert,
      onEdit,
      onDel,
      onUpdatePassword,
    };
  },
};
</script>
