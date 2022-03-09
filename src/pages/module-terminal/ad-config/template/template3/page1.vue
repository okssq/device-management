<template>
  <top page="1"/>
  <div class="bg-grey-1 flex1 q-pa-lg column items-center justify-around no-wrap">
    <div class="text-center text-h6 text-grey-6">
      <div>
        <q-badge color="red" label="2" transparent/>
        <span class="text-bold">{{ id2Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id2Value" auto-save @save="onUpdateTemplate(2,$event)">
          <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div>
        <q-badge align="middle" color="red" label="3" transparent/>
        <span class="text-bold">{{ id3Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id3Value" auto-save @save="onUpdateTemplate(3,$event)">
          <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>
    <img alt="" src="../template2/qrcode.png" style="width: 150px">
    <div class="bg-grey-6 rounded-borders q-pa-sm text-white text-center q-my-md text-subtitle2">
      <q-badge align="middle" color="red" label="4" transparent/>
      <span class="text-bold">{{ id4Value }}</span>
      <q-popup-edit v-slot="scope" v-model="id4Value" auto-save @save="onUpdateTemplate(4,$event)">
        <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
      </q-popup-edit>
    </div>
  </div>
</template>

<script>
import Top from "./top.vue";
import {inject, ref} from "vue";

export default {
  components: {
    Top,
  },
  setup() {
    const templateData = inject('templateData')
    const item = templateData.value.find(el => el.page == 1)
    const id2Value = ref(item.obj.id2)
    const id3Value = ref(item.obj.id3)
    const id4Value = ref(item.obj.id4)
    // 每个可修改数据的input输入框统一保存到全局templateData
    const onUpdateTemplate = (id, value) => {
      item.obj[`id${id}`] = value
    }

    return {
      id2Value,
      id3Value,
      id4Value,
      onUpdateTemplate,
    }
  }
};
</script>
