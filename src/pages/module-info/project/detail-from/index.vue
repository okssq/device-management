<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 690px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">
              {{ type === "insert" ? "新增" : "更新" }}项目信息
            </div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator />
          <q-scroll-area style="max-height: 50vh; padding: 16px; height: 280px">
            <q-form class="row q-gutter-md items-center">
              <input-filter-company
                style="width: 310px"
                label-text="所属公司"
                label-style="
                  min-width: 100px;
                  max-width: 100px;
                  text-align: right;
                  word-wrap: break-word;"
                :filter-text="
                  type == 'insert' ? selectCompanyName : companyName
                "
                :tree-list="treeList"
                v-model="companyId"
              />
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="projectName"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                    >项目名称:</span
                  >
                </template>
              </q-input>
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="concat"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label"
                    >负责人：</span
                  >
                </template>
              </q-input>
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="concatPhone"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label">
                    负责人电话：
                  </span>
                </template>
              </q-input>

              <q-input
                dense
                outlined
                lazy-rules
                autogrow
                maxlength="50"
                hint="最多输入50个字符"
                class="my-form-item"
                v-model="describeStr"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label">
                    项目简介：
                  </span>
                </template>
              </q-input>
              <q-field
                dense
                outlined
                lazy-rules
                class="my-form-item"
                v-model="mapStr"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label">
                    项目所属地区：
                  </span>
                </template>
                <q-btn
                  unelevated
                  icon="place"
                  label="地图选择围栏"
                  @click="onSelectArea"
                />
              </q-field>
            </q-form>
          </q-scroll-area>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" @click="$emit('cancel')" />
            <q-btn label="确定" color="primary" @click="onSubmit" />
          </q-card-actions>
          <q-inner-loading :showing="loading" style="z-index: 100">
            <q-spinner-tail color="primary" size="2em" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
    <search-area-dialog
      v-if="selectAreaDialogVisible"
      :row="selectAreaData"
      @cancel="selectAreaDialogVisible = false"
      @ok="onConfirmSelectArea"
    />
  </teleport>
</template>
<script>
import { reactive, ref, toRaw, toRefs, inject } from "vue";
import { PROJECT } from "src/api/module";
import InputFilterCompany from "components/company/input-filter-company.vue";
import SearchAreaDialog from "./select-area-dialog.vue";
import useSelectArea from "./useSelectArea";
export default {
  emits: ["cancel", "ok"],
  components: {
    InputFilterCompany,
    SearchAreaDialog,
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
    type: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    treeList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    let formData = reactive({
      companyId: "",
      companyName: "",
      projectName: "",
      concat: "",
      concatPhone: "",
      mapStr: "",
      city: "",
      district: "",
      province: "",
      township: "",
      projectAddress: "",
      describeStr: "",
    });
    const loading = ref(false);

    if (props.type === "insert") {
      formData.companyId = props.selectCompanyId + "";
      formData.companyName = props.selectCompanyName + "";
    } else {
      const { createTime, updateTime, ...param } = toRaw(props.formData);
      formData = reactive({ ...param });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);

      if (props.type === "insert") {
        PROJECT.insert(param)
          .then(() => {
            emit("ok", "insertSuccess");
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        PROJECT.update(param)
          .then(() => {
            emit("ok", "updateSuccess");
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      }
    };

    const {
      selectAreaDialogVisible,
      selectAreaData,
      onSelectArea,
      onConfirmSelectArea,
    } = useSelectArea(formData);

    return {
      ...toRefs(formData),
      loading,
      onSubmit,

      selectAreaDialogVisible,
      selectAreaData,
      onSelectArea,
      onConfirmSelectArea,
    };
  },
};
</script>
<style scoped>
.my-form-item {
  width: 310px;
}
.my-form-label {
  min-width: 100px;
  max-width: 100px;
  text-align: right;
  word-wrap: break-word;
}
</style>
