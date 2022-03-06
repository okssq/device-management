<template>
  <div class="flex1 q-pa-md bg-grey-1 relative-position overflow-auto">
    <div class="q-gutter-md row">
      <q-card style="width: 240px" v-for="item in templateList" :key="item.id">
        <q-img :src="imgObj[item.id]" style="width: 240px; height: 140px"/>
        <q-separator/>
        <q-card-section>
          <div class="row no-wrap items-center justify-between">
            <div class="col text-subtitle1 ellipsis">{{ item.templateName }}</div>
            <q-badge>{{ item.version }}</q-badge>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row items-center no-wrap text-caption text-grey-6">
            <div class="text-no-wrap">备注：</div>
            <div class="ellipsis" :title="item.remark">{{ item.remark }}</div>
          </div>
          <div class="row items-center no-wrap text-caption text-grey-6">
            <div class="text-no-wrap">创建时间：</div>
            <div class="ellipsis" :title="item.createTime">{{ item.createTime }}</div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions>
          <template v-if="item.id === 2">
            <q-btn flat color="primary" @click="onSetTemplateLocker(item)">
              自定义样式
            </q-btn>
          </template>
          <template v-if="item.id === 1">
            <q-btn flat color="primary" @click="onSetSeatSwitch(item)">
              配置开关
            </q-btn>
          </template>
        </q-card-actions>
      </q-card>
    </div>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
    </q-inner-loading>
  </div>
</template>
<script>
import {ref, shallowRef} from "vue";
import {TEMPLATE} from 'src/api/module'
import { useRouter } from 'vue-router'
import SeatSwitchConfig from "./seat-switch-config";
import {useQuasar} from "quasar";
export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const imgObj = {
      1: "/images/yizi-shiwu.png",
      2: "/images/chuwugui-shiwu.png",
      3: "/images/huishou-shiwu.png",
    };
    const loading = ref(false)
    const templateList = shallowRef([])
    const renderTemplateList = () => {
      loading.value = true;
      TEMPLATE.list({page: 1, pageSize: 999}).then(res => {
        console.log('模板列表', res)
        const {results} = res;
        templateList.value = (results || []);
      }).finally(() => {
        loading.value = false
      })
    }
    // 储物柜自定义样式事件
    const onSetTemplateLocker = () => {
      router.push({name:'template-locker'})
    }
    // 智能座椅配置开关按钮事件
    const onSetSeatSwitch = () => {
      $q.dialog({
        component: SeatSwitchConfig
      })
    }

    renderTemplateList()


    return {
      imgObj,
      loading,
      templateList,
      onSetTemplateLocker,
      onSetSeatSwitch,
    };
  },
};
</script>
