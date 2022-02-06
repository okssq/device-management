<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
        <q-input outlined dense placeholder="终端ID" />
        <q-input outlined dense placeholder="设备IMEI" />
        <q-input outlined dense placeholder="版本号" />
        <q-input outlined dense placeholder="ROM" />
        <q-input outlined dense placeholder="创建日期">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date mask="YYYY-MM-DD HH:mm">
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
      <my-table :rows="rows" :columns="columns" :total="100" :page="1">
        <template #custom-active="{ val }">
          <q-badge
            class="q-pa-xs"
            :label="val == 1 ? '启用' : '关闭'"
            :color="val == 1 ? 'green' : 'red'"
          />
        </template>
        <template #custom-location="{ val }">
          <div
            class="text-primary q-pa-sm cursor-pointer"
            style="text-decoration: underline"
          >
            {{ val }}
          </div>
        </template>
        <template #custom-sex="{ val }">
          <q-badge class="q-pa-xs" color="deep-purple" :label="val" />
        </template>
        <template #custom-gps="{ val }">
          <q-badge class="q-pa-xs" color="teal" :label="val" />
        </template>
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="详情"
              flat
              dense
              size="11px"
              round
              color="teal"
              icon="visibility"
            />
            <q-btn
              title="编辑"
              flat
              dense
              size="11px"
              round
              color="primary"
              icon="edit"
            />
            <q-btn
              title="删除"
              flat
              dense
              size="11px"
              round
              color="red-5"
              icon="clear"
            />
            <q-btn flat dense size="11px" color="grey-7" icon="more_vert">
              <q-menu>
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>功能1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>功能2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>功能3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
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
        name: "no",
        field: "no",
        label: "设备ID",
        align: "left",
      },
      {
        name: "name",
        field: "name",
        label: "ICCID",
        align: "left",
      },
      {
        name: "active",
        field: "active",
        label: "状态",
        align: "left",
        type: "custom",
      },
      {
        name: "location",
        field: "location",
        label: "位置",
        align: "left",
        type: "custom",
      },
      {
        name: "sex",
        field: "sex",
        label: "硬件版本",
        align: "left",
        type: "custom",
      },
      {
        name: "gps",
        field: "gps",
        label: "终端型号",
        align: "left",
        type: "custom",
      },
      {
        name: "time",
        field: "time",
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
    const rows = [
      {
        active: 1,
        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 0,
        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,
        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,

        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,

        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
    ];

    return {
      columns,
      rows,
    };
  },
};
</script>
