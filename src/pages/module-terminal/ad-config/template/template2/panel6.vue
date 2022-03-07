<template>
  <top page="6" />
  <div class="relative-position q-pl-md q-pr-lg  flex1 column no-wrap items-center justify-around">
    <div class="text-h6 text-grey-10">使用须知</div>
    <ul class="text-subtitle2">
      <li>
        <span>单次使用储物柜需要消耗</span>
        <span class="text-green-5">50绿色能量</span>
      </li>
      <li>
        为方便广大游客使用及园区管控，本储物柜每24小时清空一次，
        误清理的物品请联系西湖公园游客中心取回。
      </li>
      <li>
        存储时间超过4小时，将会被认为是占柜不取行为，系统将扣除一部分文明发。
      </li>
    </ul>
    <q-btn disable unelevated color="grey-6">我知道了，开柜（10s）</q-btn>
    <div
      class="absolute-center bg-white shadow-2 q-pa-md column no-wrap justify-around items-center"
      style="width: 70%; height: 80%"
    >
      <q-btn
        disable
        unelevated
        round
        color="grey-6"
        icon="o_info"
        size="16px"
      ></q-btn>
      <div>
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
        <span>
          <q-badge color="red" align="middle" label="10" transparent/>
            {{ id10Value }}
            <q-popup-edit v-model="id10Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:10,value:$event})">
              <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
            </q-popup-edit>
        </span>
      </div>
      <div class="row justify-around">
        <q-btn disable unelevated color="grey-5" class="q-mr-lg">返回</q-btn>
        <q-btn disable unelevated color="primary">确定</q-btn>
      </div>
    </div>
  </div>

  <bottom page="6" />
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
    const item = data.find(el=> el.page === 6)
    const id8Value = ref(item.obj.id8 || '')
    const id9Value = ref(item.obj.id9 || '')
    const id10Value = ref(item.obj.id10 || '')

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      const item = templateData.value.find(el=> el.page===6)
      item.obj[`id${id}`] = value
      console.log('data',data,templateData.value)
      // console.log('templateData', templateData)
    }

    return {
      id8Value,
      id9Value,
      id10Value,

      templateData,
      onUpdateTemplate,

    }
  }
};
</script>

<style></style>
