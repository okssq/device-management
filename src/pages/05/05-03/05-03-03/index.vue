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
          <q-badge outline dense class="q-pa-xs" color="teal" :label="val" />
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
        label: "IP地址",
        align: "left",
        type: "custom",
      },
      {
        name: "time",
        field: "time",
        label: "登录时间",
        align: "left",
      },
    ];
    const rows = [
      {
        user: "dwfdbkjqb",
        type: "61.162.209.154",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        type: "119.167.108.98",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        type: "223.91.32.19",
        time: "2021/12/01 12:00:01",
      },
      {
        user: "dwfdbkjqb",
        type: "220.184.157.98",
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
