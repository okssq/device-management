<template>
  <div class="flex1 q-pa-md bg-grey-1 relative-position overflow-auto">
    <div class="q-gutter-md row">
      <q-card v-for="item in templateList" :key="item.id" style="width: 240px">
        <q-img :src="item.templatePhoto" fit="contain" style="width: 240px; height: 140px"/>
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
            <div :title="item.remark" class="ellipsis">{{ item.remark }}</div>
          </div>
          <div class="row items-center no-wrap text-caption text-grey-6">
            <div class="text-no-wrap">创建时间：</div>
            <div :title="item.createTime" class="ellipsis">{{ item.createTime }}</div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-actions>
          <q-btn v-if="[2,3].includes(item.id)" :to="`/terminal/adconfig/template/${item.id}`" color="primary" flat>
            自定义样式
          </q-btn>
          <q-btn color="primary" flat @click="onSetSeatSwitch(item)">
            配置开关
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <q-inner-loading :showing="loading" style="z-index: 100">
      <q-spinner-tail color="primary" size="2em"/>
      <div class="q-pa-md text-primary">加载中...</div>
    </q-inner-loading>
  </div>
</template>
<script>
import {ref, shallowRef} from "vue";
import {TEMPLATE} from 'src/api/module'
import {useRouter} from 'vue-router'
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
        const {results} = res;
        templateList.value = (results || []);
      }).finally(() => {
        loading.value = false
      })
    }
    // 储物柜自定义样式事件
    const onSetTemplateLocker = () => {
      router.push({name: 'template-locker'})
    }
    // 配置开关按钮事件
    const onSetSeatSwitch = (item) => {
      $q.dialog({
        component: SeatSwitchConfig,
        componentProps: {
          templateId: item.id,
          templateName: item.templateName
        }
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
