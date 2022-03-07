<template>
  <q-dialog persistent ref="dialogRef">
    <q-card
      class="relative-position overflow-hidden"
      style="width: 380px; max-width: 98vw"
    >
      <div class="row q-px-md q-py-xs items-center justify-between">
        <div class="text-text-subtitle2 text-bold">
          {{templateName}}开关配置
        </div>
        <div class="q-gutter-xs">
          <q-btn flat round size="12px" icon="add" title="新增开关配置" @click="onInsertItem"/>
          <q-btn flat round size="12px" icon="clear" @click="onDialogHide"/>
        </div>
      </div>
      <q-separator/>

      <q-scroll-area :style="{'max-height':maxHeight,height:maxHeight}">
        <q-list padding v-if="switchList.length">
          <template v-for="(item,index) in switchList" :key="item.index">
            <q-item>
              <q-item-section class="relative-position">
                <q-input dense outlined v-model="item.indexName">
                  <template #prepend>
                    <div class="text-caption text-grey-8  text-bold">开关名称：</div>
                  </template>

                </q-input>
                <div
                  class="text-caption absolute-top-left q-px-xs text-grey-7"
                  style="left: 12px;top: -8px;background: #fff;"
                >
                  Index:{{ item.index }}
                </div>
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" color="green" flat dense round icon="save" title="保存"
                         @click="onSaveItem(item)"/>
                  <q-btn class="gt-xs" size="12px" color="red" flat dense round icon="clear" title="删除"
                         v-if="index === switchList.length-1" @click="onRemoveItem(item)"/>
                </div>
              </q-item-section>
            </q-item>
            <q-separator v-if="index !== switchList.length-1"/>
          </template>


        </q-list>
        <div class="q-pa-md text-grey-7" v-else>
          暂无配置信息
        </div>
      </q-scroll-area>
      <q-separator/>
      <q-inner-loading :showing="loading" style="z-index: 100">
        <q-spinner-tail color="primary" size="2em"/>
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import {useDialogPluginComponent, useQuasar} from "quasar";
import {computed, ref, toRaw,} from "vue";
import {TEMPLATE} from 'src/api/module'
import {notifySuccess} from "src/util/common";
import DelConfirm from "components/del-confirm";
import addSwitchDialog from './seat-switch-config-add'

export default {
  emits: [...useDialogPluginComponent.emits],
  props: {
    templateId: {
      type: Number,
      default: 0
    },
    templateName:{
      type: String,
      default: ''
    }
  },
  setup(props) {
    const {dialogRef, onDialogHide} = useDialogPluginComponent();
    const $q = useQuasar();
    const loading = ref(false);
    const switchList = ref([])
    const maxHeight = computed(() => {
      if (switchList.value.length) {
        return switchList.value.length * 56 + 20 + 'px'
      }
      return '56px'
    })
    let realSwitchList = []
    const getSwitchList = () => TEMPLATE.switchList({templateId: props.templateId})
    const renderSwitchList = () => {
      loading.value = true
      getSwitchList().then(res => {
        realSwitchList = JSON.parse(JSON.stringify(res))
        switchList.value = res;
      }).finally(() => {
        loading.value = false
      })
    }
    // 保存单个开关配置
    const onSaveItem = (item) => {
      loading.value = true
      const data = toRaw(item)
      TEMPLATE.updateSwitch(data).then(() => {
        notifySuccess('保存成功！')
      }).finally(() => {
        loading.value = false
      })
    }
    // 删除单个开关配置
    const onRemoveItem = (item) => {
      $q.dialog({
        component: DelConfirm,
      }).onOk(() => {
        loading.value = true
        const data = toRaw(item)
        TEMPLATE.delSwitch({id: data.id}).then(() => {
          switchList.value.pop()
          notifySuccess('删除成功')
        }).finally(() => {
          loading.value = false
        })
      });
    }
    // 新增单个开关配置
    const onInsertItem = () => {
      const index = switchList.value.length+1;
      const data = {
        templateId: props.templateId,
        index,
        indexName: `开关${index}`
      }
      $q.dialog({
        component: addSwitchDialog,
        componentProps: {
          formData: data
        },
      }).onOk(() => {
        notifySuccess("增加成功");
        renderSwitchList()
      });
    }


    renderSwitchList()

    return {
      dialogRef,
      loading,
      switchList,
      onDialogHide,
      maxHeight,
      onSaveItem,
      onRemoveItem,
      onInsertItem,
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
