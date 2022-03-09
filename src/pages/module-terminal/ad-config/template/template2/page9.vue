<template>
  <top page="9"/>
  <div class="flex1 q-px-lg q-py-md column no-wrap items-center justify-around">

    <q-btn color="grey-6" disable icon="task_alt" round size="16px" unelevated></q-btn>
    <div class="text-center">
      <div class="text-h6 text-grey-10">开柜失败</div>
      <div class="text-h6 text-grey-10 q-my-md">文明分等级过低</div>
      <div>
        <q-badge align="middle" color="red" label="8" transparent/>
        {{ id8Value }}
        <q-popup-edit v-slot="scope" v-model="id8Value" auto-save @save="onUpdateTemplate(8,$event)">
          <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>
    <q-btn color="grey-6" disable size="16px" unelevated>返回首页</q-btn>
  </div>
  <bottom page="9"/>
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
    const item = templateData.value.find(el => el.page == 9)
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
