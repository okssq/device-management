<template>
  <top page="5"/>
  <div class="flex1 q-pa-md column items-end justify-between no-wrap">
    <div class="text-right text-bold text-grey-6">
      <span style="font-size: 20px">32</span>
      <span style="font-size: 14px">S</span>
    </div>


    <div class="full-width row justify-between no-wrap q-px-lg">
      <q-chat-message sent style="transform: translate(0,50px);z-index: 10;">
        <div class="column items-end">
          <q-badge align="middle" color="red" label="2" transparent/>
          <span class="text-bold">{{ id2Value }}</span>
          <q-popup-edit v-slot="scope" v-model="id2Value" auto-save @save="onUpdateTemplate(2,$event)">
            <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
          </q-popup-edit>
        </div>
      </q-chat-message>
      <q-chat-message bg-color="grey-4" class="text-left" style="z-index: 10;">
        <div>
          <q-badge align="middle" color="red" label="3" transparent/>
          <span class="text-bold">{{ id3Value }}</span>
          <q-popup-edit v-slot="scope" v-model="id3Value" auto-save @save="onUpdateTemplate(3,$event)">
            <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
          </q-popup-edit>
        </div>
      </q-chat-message>
    </div>


    <div class="full-width text-center">
      <q-icon
        color="grey-5"
        name="o_auto_graph"
        size="200px"
        style="transform: translateY(-20px)"
      />
      <div class="text-subtitle2 text-grey-8 q-my-md">
        <div>投递口已开启</div>
        <div>请依次投入回收瓶</div>
      </div>
      <q-btn color="grey-6" disable label="结束投递" padding="6px 50px" rounded size="14px"/>
    </div>

    <div class="text-right">
      <q-btn color="grey-6" disable padding="2px 8px" rounded>
        <q-icon name="help_outline" size="18px"/>
        问题反馈
      </q-btn>
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
    const item = templateData.value.find(el => el.page == 5)
    const id2Value = ref(item.obj.id2)
    const id3Value = ref(item.obj.id3)
    // 每个可修改数据的input输入框统一保存到全局templateData
    const onUpdateTemplate = (id, value) => {
      item.obj[`id${id}`] = value
    }

    return {
      id2Value,
      id3Value,
      onUpdateTemplate,
    }
  }
};
</script>
