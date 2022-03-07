<template>
  <top page="2" />
  <div class="flex1 q-px-lg q-py-lg column no-wrap justify-around items-center">
    <div class="row no-wrap items-center q-mb-md full-width">
      <div class="full-width text-center">
        <div class="text-h6 full-width text-center">
          <q-badge color="red" align="middle" label="8" transparent/>
          {{ id8Value }}
        </div>
      </div>
      <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
      </q-popup-edit>
    </div>
    <div >
      <img
        style="width: 120px"
        src="./qrcode.png"
      />
    </div>
  </div>
  <bottom page="2" />
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
    const item = data.find(el=> el.page === 2)
    const id8Value = ref(item.obj.id8 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      const item = templateData.value.find(el=> el.page===2)
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

