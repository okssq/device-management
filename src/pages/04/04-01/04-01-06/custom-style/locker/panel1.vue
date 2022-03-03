<template>
  <q-btn unelevated color="primary" icon="save" label="保存" class="q-ma-md" @click="onSave"/>
  <top row-id="1" @update="onUpdateTemplate"></top>
  <div class="flex1 q-px-lg q-py-lg column no-wrap">
    <div>
      <span>{{ id2Value }}</span>
      <q-popup-edit v-model="id2Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:2,value:$event})">
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
      </q-popup-edit>
      <q-badge>2</q-badge>
    </div>
    <div>
      <span>{{ id3Value }}</span>
      <q-popup-edit v-model="id3Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:3,value:$event})">
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
      </q-popup-edit>
      <q-badge>3</q-badge>
    </div>
    <div class="flex1 row no-wrap justify-around items-center q-mt-md">
      <q-btn outline round color="blue-4" size="30px">存</q-btn>
      <q-btn outline round color="orange-4" size="30px">取</q-btn>
    </div>
  </div>
  <bottom row-Id1="4" row-Id2="5" row-Id3="6" row-Id4="7" row-Id5="8" row-Id6="9" @update="onUpdateTemplate"></bottom>

</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import {reactive, ref} from "vue";
import { UI } from 'src/api/module'
import {toRaw} from "@vue/reactivity";
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
      const {id,value} = data
      templateData[`id${id}`] = value
      console.log('templateData', templateData)

    }
    // 点击保存事件
    const onSave = () => {

      console.log('onSave',templateData)
      const param = {
        id:1,
        templateData: 1,
        page:1,
        txt: JSON.stringify(toRaw(templateData))
      }
      UI.update(param).then(res=>{
        console.log('更新成功',res)
      }).catch((err)=>{
        console.error(err)
      })
      console.log('发送的数据',param)
    }

    onUpdateTemplate({id:2,value:id2Value.value})
    onUpdateTemplate({id:3,value:id3Value.value})
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
