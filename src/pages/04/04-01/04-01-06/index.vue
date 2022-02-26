<template>
  <div class="my-box column no-wrap">
    <div class="flex1 overflow-hidden">
      <result-table
        :rows="rows"
        :columns="columns"
        :loading="searching"
        :page="page"
        :page-size="pageSize"
        :total-count="totalCount"
        :total-page="totalPage"
      >
        <template #custom-type="{ val }">
          <q-badge
            dense
            class="q-pa-sm"
            :label="typeText[val] || '未知类型'"
            :color="typeColor[val] || 'blue-grey'"
          />
        </template>
        <template #custom-branch="{ val }">
          <q-badge color="primary" dense outline :label="val" />
        </template>
        <template #custom-style="{ row }">
          <q-btn
            flat
            icon="touch_app"
            color="primary"
            @click="onCustomStyle(row)"
            >自定义样式</q-btn
          >
        </template>
      </result-table>
    </div>
  </div>
  <custom-style
    v-if="customStyleVisible"
    @cancel="customStyleVisible = false"
  ></custom-style>
</template>
<script>
import ResultTable from "components/table";
import CustomStyle from "./custom-style";
import { reactive, ref, shallowRef, toRefs } from "vue";
export default {
  emits: ["cancel"],
  components: {
    ResultTable,
    CustomStyle,
  },
  setup() {
    const typeText = {
      1: "座椅",
      2: "瓶子回收器",
      3: "储物柜",
      4: "大屏",
    };
    const typeColor = {
      1: "blue",
      2: "secondary",
      3: "cyan",
      4: "orange",
    };
    const columns = [
      {
        name: "type",
        field: "type",
        label: "设备类型",
        align: "left",
        type: "custom",
      },
      {
        name: "branch",
        field: "branch",
        label: "设备版本",
        align: "left",
        type: "custom",
      },
      {
        name: "style",
        field: "style",
        label: "设备样式",
        align: "left",
        type: "custom",
      },
      {
        name: "desc",
        field: "desc",
        label: "描述",
        align: "left",
      },
      {
        name: "time",
        field: "time",
        label: "创建时间",
        align: "left",
      },
    ];
    const rows = shallowRef([
      {
        type: 3,
        branch: "v1.1.0",
        style: "",
        desc: "自定义样式功能",
        time: "2022/02/24",
      },
      {
        type: 2,
        branch: "v1.0.0",
        style: "",
        desc: "自定义样式功能",
        time: "2022/02/24",
      },
    ]);
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      totalCount: 0,
      totalPage: 0,
    });
    const searching = ref(false);

    const customStyleVisible = ref(false);
    const onCustomStyle = (row) => {
      customStyleVisible.value = true;
      console.log("onCustomStyle", row);
    };
    return {
      typeText,
      typeColor,
      columns,
      rows,
      ...toRefs(pagination),
      searching,

      customStyleVisible,
      onCustomStyle,
    };
  },
};
</script>
