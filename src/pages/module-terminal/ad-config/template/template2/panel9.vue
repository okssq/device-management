<template>
  <top page="9" />
  <div class="flex1 q-px-lg q-py-md column no-wrap items-center justify-around">

    <q-btn disable unelevated round color="grey-6" icon="task_alt" size="16px"></q-btn>
    <div class="text-center">
      <div class="text-h6 text-grey-10">开柜失败</div>
      <div class="text-h6 text-grey-10 q-my-md">文明分等级过低</div>
      <div>
        <q-badge color="red" align="middle" label="8" transparent/>
        {{ id8Value }}
        <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
          <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>
    <q-btn disable unelevated color="grey-6" size="16px">返回首页</q-btn>
  </div>
  <bottom page="9" />
</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import {inject, ref, toRaw} from "vue";
export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const templateData = inject('templateData')
    const data = toRaw(templateData.value)
    const item = data.find(el=> el.page === 9)
    const id8Value = ref(item.obj.id8 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      const item = templateData.value.find(el=> el.page===9)
      item.obj[`id${id}`] = value
      console.log('data',data,templateData.value)
      // console.log('templateData', templateData)
    }

    return {
      id8Value,
      templateData,
      onUpdateTemplate,

    }
  }
};
</script>
