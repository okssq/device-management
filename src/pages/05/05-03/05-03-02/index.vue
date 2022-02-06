<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
        <q-select
          dense
          outlined
          label="设备类型"
          placeholder="设备类型"
          style="width: 180px"
          dropdown-icon="mdi-chevron-down"
          :options="['手环', '监控', '打卡', '充电']"
        >
        </q-select>
        <q-input outlined dense placeholder="时间">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input outlined dense placeholder="主体账号"> </q-input>
        <q-btn icon="search" color="primary" dense />
        <q-btn icon="add" color="primary" dense />
        <q-btn icon="file_download" color="primary" dense />
      </q-form>
    </div>
    <q-separator />
    <div class="flex1 overflow-hidden">
      <my-table :rows="rows" :columns="columns" :total="20" :page="1">
        <template #custom-type="{ val }">
          <q-badge
            class="q-pa-sm"
            :color="typeColorObj[val]"
            :label="typeTextObj[val]"
          />
        </template>
        <template #custom-time="{ val }">
          <q-badge outline dense class="q-pa-xs" color="primary" :label="val" />
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import MyTable from "components/table";
export default {
  components: {
    MyTable,
  },
  setup() {
    const typeColorObj = {
      1: "primary",
      2: "green",
      3: "orange",
      4: "secondary",
    };
    const typeTextObj = {
      1: "设备1",
      2: "设备2",
      3: "设备3",
      4: "设备4",
      5: "其他设备5",
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
        name: "time",
        field: "time",
        label: "上传时间",
        align: "left",
        type: "custom",
      },
      {
        name: "des",
        field: "des",
        label: "操作详情",
        align: "left",
      },
    ];
    const rows = [
      {
        user: "dwfdbkjqb",
        type: "1",
        time: "2021/12/01 12:00:01",
        des: "演示内容xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
      {
        user: "fsdfs43",
        type: "2",
        time: "2021/12/01 12:00:01",
        des: "演示内容xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
      {
        user: "234fewr",
        type: "3",
        time: "2021/12/01 12:00:01",
        des: "演示内容xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
      {
        user: "wer5345g",
        type: "4",
        time: "2021/12/01 12:00:01",
        des: "演示内容xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      },
    ];
    return {
      typeColorObj,
      typeTextObj,
      columns,
      rows,
    };
  },
};
</script>
