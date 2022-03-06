<template>
  <div class="q-ma-sm row no-wrap items-center justify-between">
    <div class="text-red-4 " >
      <q-badge color="red-5" align="middle" transparent class="q-pa-xs">
        <q-icon name="sim_card_alert" color="white" size="18px" />
        红色部分表示可编辑

      </q-badge>
    </div>
    <q-btn unelevated color="primary" icon="save" label="保存" @click="onSave"/>
  </div>
  <top @update="onUpdateTemplate"></top>
  <div class="flex1 q-px-lg q-py-lg column justify-around no-wrap">
    <div>
      <div class="row no-wrap items-center">
        <q-badge color="red-5" align="middle" label="2" transparent/>
        <span>{{ id2Value }}</span>
        <q-popup-edit v-model="id2Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:2,value:$event})">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge color="red-5" align="middle" label="3" transparent/>
        <span>{{ id3Value }}</span>
        <q-popup-edit v-model="id3Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:3,value:$event})">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>

    <div class="row no-wrap justify-around items-center q-mt-md">
      <q-btn  disable outline round color="grey-6" size="32px">存</q-btn>
      <q-btn disable outline round color="grey-6" size="32px">取</q-btn>
    </div>
  </div>
  <bottom row-Id1="4" row-Id2="5" row-Id3="6" row-Id4="7" row-Id5="8" row-Id6="9" @update="onUpdateTemplate"></bottom>
</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import {reactive, ref, toRaw} from "vue";
import {UI} from 'src/api/module'

export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const id2Value = ref('您好，')
    const id3Value = ref('欢迎使用西湖公园智能储物柜！')
    const templateData = reactive({})
    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      templateData[`id${id}`] = value
      // console.log('templateData', templateData)

    }
    // 点击保存事件
    const onSave = () => {

      console.log('onSave', templateData)
      const param = {
        id: 1,
        templateData: 1,
        page: 1,
        txt: JSON.stringify(toRaw(templateData))
      }
      UI.update(param).then(res => {
        console.log('更新成功', res)
      }).catch((err) => {
        console.error(err)
      })
      console.log('发送的数据', param)
    }

    onUpdateTemplate({id: 2, value: id2Value.value})
    onUpdateTemplate({id: 3, value: id3Value.value})
    return {
      id2Value,
      id3Value,
      templateData,
      onUpdateTemplate,
      onSave
    }
  }
};
</script>

<style></style>
