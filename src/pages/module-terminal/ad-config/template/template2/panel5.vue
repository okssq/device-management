<template>
  <top page="5"/>
  <div class="flex1 q-pl-md q-pr-lg column no-wrap items-center justify-around">
    <div class="text-h6 text-grey-10">使用须知</div>
    <ul class="text-subtitle2">
        <li class="">
          <span>
             <q-badge color="red" align="middle" label="8" transparent/>
            {{ id8Value }}
            <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
              <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </span>
          <span class="text-green-5">
             <q-badge color="red" align="middle" label="9" transparent/>
            {{ id9Value }}
            <q-popup-edit v-model="id9Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:9,value:$event})">
              <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
          </span>
        </li>
        <li>
          <q-badge color="red" align="middle" label="10" transparent/>
          {{ id10Value }}
          <q-popup-edit v-model="id10Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:10,value:$event})">
            <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
          </q-popup-edit>
        </li>
        <li>
          <q-badge color="red" align="middle" label="11" transparent/>
          {{ id11Value }}
          <q-popup-edit v-model="id11Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:11,value:$event})">
            <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
          </q-popup-edit>
        </li>
      </ul>
    <q-btn size="14px" disable unelevated color="grey-6">我知道了，开柜（10s）</q-btn>

  </div>
  <bottom page="5"/>
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
    const item = templateData.value.find(el=> el.page==5)
    const id8Value = ref(item.obj.id8 || '')
    const id9Value = ref(item.obj.id9 || '')
    const id10Value = ref(item.obj.id10 || '')
    const id11Value = ref(item.obj.id11 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      item.obj[`id${id}`] = value
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
