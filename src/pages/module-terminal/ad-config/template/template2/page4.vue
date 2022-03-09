<template>
  <top page="4"/>
  <div class="flex1 q-px-lg q-py-lg column no-wrap items-center justify-around">
    <q-btn
      color="grey-6"
      disable
      icon="o_info"
      round
      size="16px"
      unelevated
    />
    <div class="text-h6 text-center text-grey-10">您已在使用储物柜</div>
    <div class="row no-wrap items-center full-width">
      <div class="full-width text-center">
        <div class="text-subtitle1 full-width text-center">
          <q-badge align="middle" color="red" label="8" transparent/>
          {{ id8Value }}
        </div>
      </div>
      <q-popup-edit v-slot="scope" v-model="id8Value" auto-save @save="onUpdateTemplate(8,$event)">
        <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
      </q-popup-edit>
    </div>
    <q-btn
      color="grey-6"
      label="返回首页"
      size="16px"
      unelevated
    />
  </div>
  <bottom page="4"/>
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
    const item = templateData.value.find(el => el.page == 4)
    const id8Value = ref(item.obj.id8 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (id, value) => {
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
