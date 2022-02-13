<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
        <q-input outlined dense placeholder="项目名称" />
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
        row-key="id"
        :rows="rows"
        :columns="columns"
        :total="100"
        :page="1"
        expand
      >
        <template #expand> 展开详情和表头字段等你发过来再改 </template>
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
        <template #op="{ row }">
          <div class="q-gutter-sm">
            <q-btn
              title="编辑"
              flat
              dense
              size="10px"
              round
              color="primary"
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
            />
            <!-- <q-btn flat dense size="11px" color="grey-7" icon="more_vert">
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
            </q-btn> -->
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
        name: "name",
        field: "name",
        label: "项目名称",
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
        name: "sex",
        field: "sex",
        label: "表头1",
        align: "left",
      },
      {
        name: "sex",
        field: "sex",
        label: "表头2",
        align: "left",
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
        align: "left",
      },
    ];
    const rows = [
      {
        id: "1",
        active: 1,
        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
      },
      {
        id: "2",
        active: 0,
        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        id: "3",
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
        id: "4",
        location: "131.224,12.34",
        no: "14210328",
        name: "gstewtet",
        sex: "ver1.0.4",
        gps: "BSJ-x200",
        time: "2021-06-06 13:05:05",
      },
      {
        active: 0,
        id: "5",
        location: "131.224,12.34",
        no: "14210388",
        name: "sdgshnhjyxf",
        sex: "ver1.0.1",
        gps: "BSJ-GF03",
        time: "2021-06-04 13:05:05",
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
