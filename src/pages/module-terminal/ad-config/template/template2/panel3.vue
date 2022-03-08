<template>
  <top page="3" />
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">

    <q-btn
      disable
      unelevated
      round
      color="grey-6"
      icon="o_info"
      size="16px"
    />
    <div class="text-h6 text-center text-grey-10">本柜已满</div>
    <div class="row no-wrap items-center full-width">
      <div class="full-width text-center">
        <div class="text-subtitle1 full-width text-center">
          <q-badge color="red" align="middle" label="8" transparent/>
          {{ id8Value }}
        </div>
      </div>
      <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
        <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
      </q-popup-edit>
    </div>
    <q-btn
      unelevated
      color="grey-6"
      size="16px"
      label="返回首页"
    />

  </div>
  <bottom page="3" />
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
    const item = templateData.value.find(el=> el.page==3)
    const id8Value = ref(item.obj.id8 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      item.obj[`id${id}`] = value
    }

    return {
      id8Value,
      templateData,
      onUpdateTemplate,

    }
  }
};
</script>
