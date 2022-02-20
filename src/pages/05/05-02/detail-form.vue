<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="width: 342px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-text-subtitle2 text-bold">
          {{ type === "insert" ? "新增" : "更新" }}角色信息
        </div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />

      <q-scroll-area style="height: 260px; max-height: 50vh; padding: 16px">
        <q-form class="row q-gutter-md items-center">
          <input-filter-company
            v-if="type == 'insert'"
            style="width: 310px"
            label-style="
              min-width: 70px;
              max-width: 70px;
              text-align: right;
              word-wrap: break-word;"
            :filter-text="selectCompanyName"
            :disable="type === 'edit'"
            :tree-list="treeList"
            v-model="companyId"
          />
          <q-input
            v-else
            dense
            outlined
            lazy-rules
            disable
            class="my-form-item"
            v-model="companyName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >公司名称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="roleName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >角色名称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            type="textarea"
            class="my-form-item"
            v-model="remark"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">备注：</span>
            </template>
          </q-input>
        </q-form>
      </q-scroll-area>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="onDialogHide" />
        <q-btn label="确定" color="primary" @click="onSubmit" />
      </q-card-actions>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import { useDialogPluginComponent } from "quasar";
import InputFilterCompany from "components/company/input-filter-company.vue";
import { reactive, ref, toRaw, toRefs } from "vue";
import { ROLE } from "src/api/module";
export default {
  emits: [...useDialogPluginComponent.emits],
  components: {
    InputFilterCompany,
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
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();

    let formData = reactive({
      companyId: "",
      companyName: "",
      remark: "",
      roleName: "",
    });
    const loading = ref(false);
    if (props.type === "insert") {
      formData.companyId = props.selectCompanyId.toString();
    } else {
      const { id, companyId, companyName, remark, roleName } = toRaw(
        props.formData
      );
      formData = reactive({
        id,
        companyName,
        companyId,
        roleName,
        remark,
      });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        ROLE.insert(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        ROLE.update(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      }
    };

    return {
      dialogRef,
      ...toRefs(formData),
      loading,

      onSubmit,
      onDialogHide,
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
