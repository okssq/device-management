<template>
  <div class="my-box column no-wrap">
    <search-bar :searching="searching" @search="onSearch" @insert="onInsert"/>
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
              v-if="hasDelete"
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

import {COMPANY} from "src/api/module.js";
import {computed, reactive, ref, shallowRef, toRefs, inject} from "vue";
import {notifySuccess} from "src/util/common";
import {useQuasar} from "quasar";

export default {
  components: {
    SearchBar,
    ResultTable,
  },
  setup() {
    const loginInfo = inject("loginInfo");
    const hasDelete = computed(() => !!(loginInfo.value && loginInfo.value.companyId == 1));
    const $q = useQuasar();
    const columns = [
      {
        name: "companyName",
        field: "companyName",
        label: "公司名称",
        align: "left",
      },
      {
        name: "companyCode",
        field: "companyCode",
        label: "公司编号",
        align: "left",
      },
      {
        name: "contact",
        field: "contact",
        label: "联系人",
        align: "left",
      },
      {
        name: "contactPhone",
        field: "contactPhone",
        label: "联系电话",
        align: "left",
      },
      {
        name: "companyAddress",
        field: "companyAddress",
        label: "公司地址",
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
      COMPANY.list(searchData)
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
      $q.dialog({
        component: DetailForm,
        componentProps: {
          type: "insert",
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

    const onDel = (row) => {
      $q.dialog({
        component: DelConfirm,
      }).onOk(() => {
        searching.value = true;
        COMPANY.del({id: row.id})
          .then(() => {
            notifySuccess("删除成功");
            getList();
          })
          .finally(() => {
            searching.value = false;
          });
      });
    };

    return {
      hasDelete,
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
