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
      <my-table
        expand
        row-key="id"
        :rows="rows"
        :columns="columns"
        :total="100"
        :page="1"
      >
        <template #expand>
          展开详情和表头字段等你发过来再改，没有我在自己去找
        </template>
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
            <div>经度: {{ val[0] }}</div>
            <div>纬度: {{ val[1] }}</div>
          </div>
        </template>
        <template #custom-type="{ val }">
          <q-badge class="q-pa-xs" :color="val == 1 ? 'blue-grey' : 'brown'">
            {{ val == 1 ? "SGB-FG123" : "SVH-HJ332" }}
          </q-badge>
        </template>
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="编辑"
              flat
              dense
              size="11px"
              round
              color="primary"
              icon="edit"
              @click.stop="onEdit(row)"
            />
            <q-btn
              title="删除"
              flat
              dense
              size="11px"
              round
              color="red-5"
              icon="clear"
              @click.stop="onDel(row)"
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
    <q-dialog v-model="isDelConfirm" persistent>
      <del-confirm @cancel="isDelConfirm = false" @ok="isDelConfirm = false" />
    </q-dialog>
    <q-dialog v-model="isEdit" persistent style="width: 600px">
      <edit-form @cancel="isEdit = false" @ok="isEdit = false" />
    </q-dialog>
  </div>
</template>

<script>
import MyTable from "components/table";
import DelConfirm from "components/del-confirm.vue";
import EditForm from "./edit-form.vue";
import { ref } from "vue";
export default {
  components: {
    MyTable,
    DelConfirm,
    EditForm,
  },
  setup() {
    const columns = [
      {
        name: "no",
        field: "no",
        label: "设备ID",
        align: "left",
        sortable: true,
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
        sortable: true,
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
        sortable: true,
      },
      {
        name: "type",
        field: "type",
        label: "终端型号",
        align: "left",
        type: "custom",
        sortable: true,
      },
      {
        name: "time",
        field: "time",
        label: "创建时间",
        align: "left",
        sortable: true,
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
        id: "0",
        active: 1,
        location: [131.224, 12.384],
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        type: "1",
        time: "2021-06-04 13:05:05",
      },
      {
        id: "1",
        active: 0,
        location: [131.224, 12.384],
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        type: "2",
        time: "2021-06-06 13:05:05",
      },
      {
        id: "2",
        active: 0,
        location: [131.224, 12.384],
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        type: "1",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,
        id: "3",
        location: [131.224, 12.384],
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        type: "1",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,
        id: "4",
        location: [131.224, 12.384],
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        type: "2",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,
        id: "5",
        location: [131.224, 12.384],
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        type: "2",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,
        id: "6",
        location: [131.224, 12.384],
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        type: "1",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 1,
        id: "7",
        location: [131.224, 12.384],
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        type: "1",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 1,
        id: "8",
        location: [131.224, 12.384],
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        type: "2",
        time: "2021-06-04 13:05:05",
      },
      {
        active: 0,
        id: "9",
        location: [131.224, 12.384],
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        type: "1",
        time: "2021-06-06 13:05:05",
      },
    ];
    const isEdit = ref(false);
    const onEdit = (row) => {
      isEdit.value = true;
      console.log("onEdit", row);
    };
    const isDelConfirm = ref(false);
    const onDel = (row) => {
      isDelConfirm.value = true;
      console.log("onDel", row);
    };

    return {
      columns,
      rows,
      isEdit,
      onEdit,
      isDelConfirm,
      onDel,
    };
  },
};
</script>
