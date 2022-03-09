<template>
  <div class="full-height column no-wrap relative-position">
    <q-separator/>
    <div class="relative-position bg-grey-1" style="height: 20%">
      <div class="absolute-center text-grey-6 text-no-wrap text-subtitle1">
        广告
      </div>
    </div>
    <q-separator/>
    <div class="q-pa-xs">
      <q-btn color="grey-7" dense disable flat icon="chevron_left">返回</q-btn>
    </div>
    <div class="q-pl-md q-pr-lg  flex1 column no-wrap items-center justify-around">
      <div class="text-h6 text-grey-10">使用须知</div>
      <ul class="text-subtitle2">
        <li>
          <span>单次使用储物柜需要消耗</span>
          <span class="text-green-5">50绿色能量</span>
        </li>
        <li>
          为方便广大游客使用及园区管控，本储物柜每24小时清空一次，
          误清理的物品请联系西湖公园游客中心取回。
        </li>
        <li>
          存储时间超过4小时，将会被认为是占柜不取行为，系统将扣除一部分文明发。
        </li>
      </ul>
      <q-btn color="grey-6" disable unelevated>我知道了，开柜（10s）</q-btn>
    </div>
    <div class="q-pb-sm">
      <q-btn color="grey-6" disable icon="help_outline" size="14px" unelevated>遇到问题？</q-btn>
    </div>
    <q-separator/>
    <div class="overflow-hidden row q-px-md q-py-lg justify-between items-center no-wrap justify-center">
      <div class="text-no-wrap flex1">
        <div class="row no-wrap items-center">
          西湖公园游客服务中心
        </div>
        <div class="row no-wrap items-center">
          服务电话：12345678
        </div>
        <div class="row no-wrap items-center">
          服务时间：08:00-18:00
        </div>
        <div class="row no-wrap items-center">
          服务地址：福州市鼓楼区左海湖滨路70号
        </div>
      </div>
      <div class="column items-center no-wrap text-no-wrap">
        <div class="relative-position">
          <img class="full-width" src="./qrcode.png"/>
        </div>
        <div class="row no-wrap items-center">
          智慧西湖小程序
        </div>
      </div>
    </div>
    <div class="absolute-full" style="background-color: rgba(0,0,0,.2)">
      <div
        class="absolute-center rounded-borders bg-white shadow-2 q-px-md q-py-lg column no-wrap justify-around items-center"
        style="width: 70%;z-index: 10"
      >
        <q-btn
          color="grey-6"
          disable
          icon="o_info"
          round
          size="16px"
          unelevated
        />
        <div class="q-my-lg">
          <span>
          <q-badge align="middle" color="red" label="1" transparent/>
            {{ id1Value }}
            <q-popup-edit v-slot="scope" v-model="id1Value" auto-save @save="onUpdateTemplate(1,$event)">
              <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
            </q-popup-edit>
        </span>
          <span class="text-green-5">
          <q-badge align="middle" color="red" label="2" transparent/>
            {{ id2Value }}
            <q-popup-edit v-slot="scope" v-model="id2Value" auto-save @save="onUpdateTemplate(2,$event)">
              <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
            </q-popup-edit>
        </span>
          <span>
          <q-badge align="middle" color="red" label="3" transparent/>
            {{ id3Value }}
            <q-popup-edit v-slot="scope" v-model="id3Value" auto-save @save="onUpdateTemplate(3,$event)">
              <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
            </q-popup-edit>
        </span>
        </div>

        <div class="row justify-around">
          <q-btn class="q-mr-lg" color="grey-5" disable unelevated>返回</q-btn>
          <q-btn color="primary" disable unelevated>确定</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {inject, ref} from "vue";

export default {
  setup() {
    const templateData = inject('templateData')
    const item = templateData.value.find(el => el.page == 6)

    const id1Value = ref(item.obj.id1 || '')
    const id2Value = ref(item.obj.id2 || '')
    const id3Value = ref(item.obj.id3 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (id, value) => {
      item.obj[`id${id}`] = value
    }

    return {
      id1Value,
      id2Value,
      id3Value,

      templateData,
      onUpdateTemplate,

    }
  }
};
</script>

<style></style>
