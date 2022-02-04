<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
        <q-input outlined dense placeholder="角色名称"> </q-input>
        <q-input outlined dense placeholder="创建时间">
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
        <q-btn icon="search" color="primary" dense />
        <q-btn icon="add" color="primary" dense />
        <q-btn icon="file_download" color="primary" dense />
      </q-form>
    </div>
    <q-separator />
    <div class="flex1 overflow-hidden">
      <my-table :rows="rows" :columns="columns" :total="20" :page="1">
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="编辑"
              color="primary"
              flat
              dense
              size="11px"
              round
              icon="edit"
            />
            <q-btn
              title="授权"
              color="green"
              flat
              dense
              size="11px"
              round
              icon="tune"
            />
            <q-btn
              title="删除"
              color="red-5"
              flat
              dense
              size="11px"
              round
              icon="clear"
            />
          </div>
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
        name: "id",
        field: "id",
        label: "角色ID",
        align: "left",
      },
      {
        name: "role",
        field: "role",
        label: "角色名称",
        align: "left",
      },
      {
        name: "name",
        field: "name",
        label: "备注",
        align: "left",
      },
      {
        name: "time",
        field: "time",
        label: "更新时间",
        align: "left",
      },
      {
        name: "op",
        label: "操作",
        field: "op",
        align: "center",
      },
    ];
    const rows = [
      {
        id: "sdfsdgs",
        name: "备注xxxxxxxx",
        role: "角色1",
        time: "2021/12/01",
      },
      {
        id: "sdfsdfssdgs",
        name: "备注xxxxxxxx",
        role: "角色2",
        time: "2021/12/01",
      },
      {
        id: "rju5ur",
        name: "备注xxxxxxxx",
        role: "角色3",
        time: "2021/12/01",
      },
      {
        id: "tehtrhr",
        name: "备注xxxxxxxx",
        role: "角色4",
        time: "2021/12/01",
      },
    ];
    return {
      columns,
      rows,
    };
  },
};
</script>
