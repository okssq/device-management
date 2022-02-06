<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
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
    const columns = [
      {
        name: "user",
        field: "user",
        label: "主体账号",
        align: "left",
      },
      {
        name: "type",
        field: "type",
        label: "操作类型",
        align: "left",
        type: "custom",
      },
      {
        name: "id",
        field: "id",
        label: "终端ID",
        align: "left",
      },
      {
        name: "time",
        field: "time",
        label: "上传时间",
        align: "left",
      },
      {
        name: "name",
        field: "name",
        label: "描述",
        align: "left",
      },
      // {
      //   name: 'op',
      //   label: '操作',
      //   field: 'op',
      //   type: 'custom',
      //   align: 'center'
      // },
    ];
    const rows = [
      {
        user: "dwfdbkjqb",
        id: "sdfsdgs",
        name: "操作详情xxxxxxxx",
        type: "设备解绑下发",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        id: "sdfsdgs",
        name: "操作详情xxxxxxxx",
        type: "设备重启下发",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        id: "sdfsdgs",
        name: "操作详情xxxxxxxx",
        type: "设备解绑下发",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        id: "sdfsdgs",
        name: "操作详情xxxxxxxx",
        type: "设备重启下发",
        time: "2021/12/01 12:00:01",
      },
    ];
    return {
      columns,
      rows,
    };
  },
};
</script>
