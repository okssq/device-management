<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-positon overflow-hidden"
          style="width: 690px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">
              {{ type === "insert" ? "新增" : "更新" }}项目信息
            </div>
            <q-btn flat round size="12px" icon="clear" />
          </div>
          <q-separator />

          <q-scroll-area style="max-height: 50vh; padding: 16px; height: 260px">
            <q-form class="row q-gutter-md items-center">
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
                  label="选择地区"
                  @click="onSelectArea"
                />
              </q-field>
              <q-input
                dense
                outlined
                lazy-rules
                class="my-form-item"
                type="textarea"
                v-model="describeStr"
              >
                <template #before>
                  <span class="text-caption text-bold my-form-label">
                    项目简介：
                  </span>
                </template>
              </q-input>
            </q-form>
          </q-scroll-area>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat label="取消" color="primary" />
            <q-btn label="确定" color="primary" @click="onSubmit" />
          </q-card-actions>
          <q-inner-loading :showing="loading" style="z-index: 100">
            <q-spinner-tail color="primary" size="2em" />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
    <search-area v-if="searchVisible" />
  </teleport>
</template>
<script>
import { reactive, ref, toRaw, toRefs } from "vue";
import { PROJECT } from "src/api/module";
import SearchArea from "./select-area.vue";
export default {
  components: {
    SearchArea,
  },
  props: {
    loginCompanyId: {
      type: [String, Number],
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
  },
  setup(props) {
    let formData = reactive({
      companyId: "",
      projectName: "",
      concat: "",
      concatPhone: "",
      mapStr: "",
      projectCity: "",
      projectAddress: "",
      describeStr: "",
    });
    const loading = ref(false);
    const searchVisible = ref(false);
    if (props.type === "insert") {
      formData.companyId = props.loginCompanyId + "";
    } else if (props.type === "edit") {
      console.log("formData", props.formData);
      const { createTime, updateTime, ...param } = toRaw(props.formData);
      formData = reactive({ ...param });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        PROJECT.insert(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        PROJECT.update(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      }
    };

    const onSelectArea = () => {
      searchVisible.value = true;
    };

    return {
      ...toRefs(formData),
      loading,
      searchVisible,

      onSubmit,

      onSelectArea,
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
