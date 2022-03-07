<template>
  <top page="14"/>
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">

    <q-btn disable unelevated round color="grey-6" icon="task_alt" size="16px"></q-btn>
    <div class="text-h6 text-grey-10">柜门已开，感谢使用。</div>

    <div class="text-center" style="max-width: 80%">
      <q-badge color="red" align="middle" label="8" transparent/>
      {{ id8Value }}
      <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
        <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
      </q-popup-edit>
    </div>

    <q-btn size="16px" disable unelevated color="grey-6">返回首页</q-btn>

  </div>
  <bottom page="14"/>
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
    const item = data.find(el => el.page === 14)
    const id8Value = ref(item.obj.id8 || '')
    const id9Value = ref(item.obj.id9 || '')
    const id10Value = ref(item.obj.id10 || '')
    const id11Value = ref(item.obj.id11 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      const item = templateData.value.find(el => el.page === 14)
      item.obj[`id${id}`] = value
      console.log('data', data, templateData.value)
      // console.log('templateData', templateData)
    }

    return {
      id8Value,
      id9Value,
      id10Value,
      id11Value,

      templateData,
      onUpdateTemplate,

    }
  }
};
</script>

<style></style>
