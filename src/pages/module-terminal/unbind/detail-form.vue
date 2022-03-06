<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 350px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">绑定项目</div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator/>

          <q-scroll-area style="max-height: 50vh; padding: 16px; height: 310px">
            <q-form class="row q-gutter-md items-center">
              <input-filter-company
                style="width: 310px"
                label-style="
                  min-width: 70px;
                  max-width: 70px;
                  text-align: right;
                  word-wrap: break-word;"
                :filter-text="selectCompanyName"
                :tree-list="treeList"
                v-model="companyId"
                @update:model-value="onChangeCompanyId"
              />
              <q-select
                dense
                outlined
                lazy-rules
                class="my-form-item "
                v-model="projectId"
                emit-value
                map-options
                :clearable="!!projectId"
                :options="projectList"
                :loading="projectLoading"
                @clear="projectId=''"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                  >所属项目：</span
                  >
                </template>
              </q-select>
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                input-class="text-caption"
                v-model="terminalName"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                  >设备别名：</span
                  >
                </template>
              </q-input>
              <q-field
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="address"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                  >设备地址：</span
                  >
                </template>
                <q-btn
                  dense
                  flat
                  class="full-width"
                  icon="gps_fixed"
                  label="地图选址"
                  @click="onChooseGps"
                />
              </q-field>
              <q-select
                dense
                outlined
                lazy-rules
                class="my-form-item ellipsis"
                v-model="templateId"
                emit-value
                map-options
                :clearable="!!templateId"
                :options="templateOptions"
                @clear="templateId=''"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                  >设备模板：</span
                  >
                </template>
              </q-select>
            </q-form>
          </q-scroll-area>
          <q-separator/>
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" @click="$emit('cancel')"/>
            <q-btn label="确定" color="primary" @click="onSubmit"/>
          </q-card-actions>
          <q-inner-loading :showing="loading" style="z-index: 100">
            <q-spinner-tail color="primary" size="2em"/>
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </teleport>
  <choose-gps-dialog
    v-if="chooseGpsDialogVisible"
    @cancel="chooseGpsDialogVisible = false"
    @ok="onConfirmChooseGps"
  ></choose-gps-dialog>
</template>
<script>
import chooseGpsDialog from "components/choose-gps-dialog";
import {reactive, ref, shallowRef, toRaw, toRefs} from "vue";
import {TERMINAL, PROJECT,TEMPLATE} from "src/api/module";
import InputFilterCompany from "components/company/input-filter-company.vue";

export default {
  emits: ["cancel", "ok"],
  components: {
    InputFilterCompany,
    chooseGpsDialog,
  },
  props: {
    selectCompanyId: {
      type: String,
      default: "",
    },
    selectCompanyName: {
      type: String,
      default: "",
    },
    treeList: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, {emit}) {
    const loading = ref(false);
    let formData = reactive({
      terminalName: "",
      companyId: "",
      projectId: "",
      address: "",
      templateId: ''
    });
    formData.companyId = props.selectCompanyId + "";
    const projectList = shallowRef([]);
    const projectLoading = ref(false);
    const templateOptions =shallowRef([])
    const getProjectList = (val) => {
      projectLoading.value = true;
      PROJECT.options({companyId: val})
        .then((res) => {
          const arr = res.map((el) => {
            const {id, label} = el;
            return {label, value: id};
          });
          arr.unshift({label: '请选择', value: ''})
          projectList.value = arr
        })
        .finally(() => {
          projectLoading.value = false;
        });
    };

    // 选择公司改变时
    const onChangeCompanyId = (val) => {
      projectList.value = [];
      formData.projectId = "";
      if (!val) {
        projectLoading.value = false;
      } else {
        getProjectList(val);
      }
    };

    const chooseGpsDialogVisible = ref(false);
    const onChooseGps = () => {
      chooseGpsDialogVisible.value = true;
    };
    const onConfirmChooseGps = ({lat, lng, address}) => {
      formData.address = address;
      formData.gpsInfo = `${lng},${lat}`;
      chooseGpsDialogVisible.value = false;
    };
    const onSubmit = () => {
      loading.value = true;
      const a = toRaw(props.formData);
      const param = toRaw(formData);
      param["terminalId"] = a["terminalId"];
      param["type"] = a["type"];
      TERMINAL.bind(param)
        .then(() => {
          emit("ok", param);
        })
        .catch(() => {
        })
        .finally(() => {
          loading.value = false;
        });
    };

    if (props.selectCompanyId) {
      onChangeCompanyId(props.selectCompanyId);
    }
    if (props.formData.type){
      TEMPLATE.list({
        pageSize:999,
        page:1,
        terminalType:props.formData.type
      }).then(res=> {
        console.log('res',res)
        const {results} = res
        const arr = results.map((el) => {
          const {id, templateName} = el;
          return {label:templateName, value: id};
        });
        arr.unshift({label: '请选择', value: ''})
        templateOptions.value = arr
      })
    }
    return {
      ...toRefs(formData),
      projectList,
      projectLoading,
      templateOptions,
      loading,
      onChangeCompanyId,
      onSubmit,

      chooseGpsDialogVisible,
      onChooseGps,
      onConfirmChooseGps,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 310px;
}

.my-form-label {
  min-width: 70px;
  max-width: 70px;
  text-align: right;
  word-wrap: break-word;
}
</style>
