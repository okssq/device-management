<template>
  <top page="1"/>
  <div class="flex1 q-px-lg q-py-lg column justify-around no-wrap">
    <div>
      <div class="row no-wrap items-center q-mb-md">
        <q-badge color="red" align="middle" label="8" transparent/>
        <span>{{ id8Value }}</span>
        <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge color="red" align="middle" label="9" transparent/>
        <span>{{ id9Value }}</span>
        <q-popup-edit v-model="id9Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:9,value:$event})">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>

    <div class="row no-wrap justify-around items-center q-mt-md">
      <q-btn  disable outline round color="grey-6" size="32px">存</q-btn>
      <q-btn disable outline round color="grey-6" size="32px">取</q-btn>
    </div>
  </div>
  <bottom page="1"/>
</template>

<script>
import Top from "./top.vue";
import Bottom from "./bottom.vue";
import {inject, ref} from "vue";

export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const templateData = inject('templateData')
    const item = templateData.value.find(el=> el.page === 1)
    const id8Value = ref(item.obj.id8)
    const id9Value = ref(item.obj.id9)

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      item.obj[`id${id}`] = value
    }

    return {
      id8Value,
      id9Value,
      templateData,
      onUpdateTemplate,

    }
  }
};
</script>
