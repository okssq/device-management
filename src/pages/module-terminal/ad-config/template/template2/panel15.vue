<template>
  <top page="15"/>
  <div class="flex1 q-px-lg column no-wrap items-center justify-between">
    <div class="text-h6 text-grey-10">问题反馈</div>
    <div style="width: 94%">
      <div class="text-subtitle2">
        选择您遇到的问题(可多选)
      </div>
      <div class="text-caption q-mb-md">
        <q-badge color="red" align="middle" label="8" transparent/>
        {{ id8Value }}
        <q-popup-edit v-model="id8Value" auto-save v-slot="scope" @save="onUpdateTemplate({id:8,value:$event})">
          <q-input  v-model="scope.value" dense autofocus counter @keyup.enter="scope.set"/>
        </q-popup-edit>

      </div>
      <div class="q-pa-md row no-wrap items-center justify-between" style="margin-lef:0;outline: 1px dashed #ccc">
        <div class="q-mr-md">
          <div
            class="row no-wrap items-center"
            v-for="(item, index) in options"
            :key="index"
          >
            <q-checkbox dense :model-value="false" />
            <div class="row no-wrap items-center">
              <span>{{ item }}</span>
              <q-popup-edit :model-value="item" v-slot="scope" >
                <q-input
                  :model-value="item"
                  dense
                  autofocus
                  counter
                  @change="onOptionsLabelChange(index,$event)"
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
            <q-btn
              dense
              round
              flat
              size="12px"
              color="red"
              icon="close"
              @click="remove(index)"
            />
          </div>
        </div>
        <div class="">
          <q-btn color="red" class="text-no-wrap" size="14px" label="9-添加选项" transparent/>
          <q-popup-edit v-model="inputText" auto-save v-slot="scope">
            <q-input v-model="inputText" dense autofocus counter>
              <template #append>
                <q-btn flat dense icon="save" @click="onAdd(scope)"></q-btn>
              </template>
            </q-input>
          </q-popup-edit>
        </div>


      </div>
    </div>

    <q-btn size="14px" disable unelevated color="grey-6">提交</q-btn>
  </div>
  <bottom page="15"/>
</template>

<script>
import {ref, inject, toRaw} from "vue";
import Top from "./top.vue";
import Bottom from "./bottom.vue";

export default {
  components: {
    Top,
    Bottom,
  },
  setup() {
    const templateData = inject('templateData')
    const item = templateData.value.find(el=> el.page == 15)
    const id8Value = ref(item.obj.id8 || '')
    const options = ref((item ? JSON.parse(JSON.stringify(item.obj.id9)) : [] )|| []);
    const inputText = ref("新添加的选项");

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (data) => {
      const {id, value} = data
      item.obj[`id${id}`] = value
    }

    const remove = (index) => {
      options.value = options.value.filter((el, _index) => _index !== index);
      item.obj.id9 = item.obj.id9.filter((el, _index) => _index !== index)
    };
    const onAdd = (scope) => {
      scope.set();
      options.value.push(inputText.value);
      item.obj.id9.push(inputText.value)
    };

    const onOptionsLabelChange = (index,value) => {
      options.value[index] = value
      item.obj.id9[index] = value
      console.log('index',index,'value',value)
    }
    return {
      id8Value,
      onUpdateTemplate,

      options,

      inputText,
      remove,
      onAdd,
      onOptionsLabelChange,
    };
  },
};
</script>

<style></style>
