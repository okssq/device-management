<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-positon overflow-hidden"
      style="max-width: 98vw; width: 680px"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-subtitle2 text-bold">
          {{ type === "insert" ? "新增" : "更新" }}用户信息
        </div>
        <q-btn flat round size="12px" icon="clear" @click="onDialogHide" />
      </div>
      <q-separator />

      <q-scroll-area
        style="max-height: 50vh; padding: 16px"
        :style="{ height: type === 'insert' ? '240px' : '190px' }"
      >
        <q-form class="row q-gutter-md items-center">
          <input-filter-company
            v-if="type == 'insert'"
            style="width: 310px"
            label-style="
              min-width: 100px;
              max-width: 100px;
              text-align: right;
              word-wrap: break-word;"
            :filter-text="selectCompanyName"
            :tree-list="treeList"
            v-model="companyId"
            @update:model-value="onChangeCompanyId"
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

          <q-select
            v-if="type == 'insert'"
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="roleId"
            emit-value
            map-options
            :options="roleList"
            :disable="type !== 'insert'"
            :loading="roleLoading"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">角色：</span>
            </template>
          </q-select>
          <q-input
            v-else
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="realName"
            disable
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">角色：</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="realName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >用户昵称：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="userName"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >用户账号：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            type="password"
            v-model="userPassword"
            v-if="type === 'insert'"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label">密码：</span>
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            type="password"
            class="my-form-item"
            v-model="confirmUserPassword"
            v-if="type === 'insert'"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >确认密码：</span
              >
            </template>
          </q-input>
          <q-input
            dense
            outlined
            lazy-rules
            class="my-form-item"
            v-model="telephone"
          >
            <template #before>
              <span class="text-caption text-bold my-form-label"
                >联系电话：</span
              >
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
import { reactive, ref, shallowRef, toRaw, toRefs } from "vue";
import { USER, ROLE } from "src/api/module";
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
      roleId: "",
      roleName: "",
      userName: "",
      realName: "",
      userPassword: "",
      confirmUserPassword: "",
      telephone: "",
    });
    const loading = ref(false);
    const roleLoading = ref(false);
    const roleList = shallowRef([]);
    // 获取角色列表
    const getRoleList = (CompanyId) => {
      roleLoading.value = true;
      ROLE.selectList({ CompanyId })
        .then((res) => {
          if (CompanyId !== formData.companyId) return;
          const arr = res.map((el) => {
            const { id, label } = el;
            return {
              label,
              value: id,
            };
          });
          roleList.value = arr;
        })
        .finally(() => {
          roleLoading.value = false;
        });
    };
    // 选择公司改变时
    const onChangeCompanyId = (val) => {
      roleList.value = [];
      formData.roleId = "";
      if (!val) {
        roleLoading.value = false;
      } else {
        getRoleList(val);
      }
    };
    if (props.type === "insert") {
      formData.companyId = props.selectCompanyId.toString();
      getRoleList(props.selectCompanyId);
    } else {
      const { createTime, updateTime, userId, ...param } = toRaw(
        props.formData
      );
      formData = reactive({
        ...param,
      });
    }

    const onSubmit = () => {
      loading.value = true;
      const param = toRaw(formData);
      if (props.type === "insert") {
        USER.insert(param)
          .then(() => {
            onDialogOK();
          })
          .catch(() => {})
          .finally(() => {
            loading.value = false;
          });
      } else {
        USER.update(param)
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
      roleList,
      roleLoading,
      onChangeCompanyId,
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
  min-width: 100px;
  max-width: 100px;
  text-align: right;
  word-wrap: break-word;
}
</style>
