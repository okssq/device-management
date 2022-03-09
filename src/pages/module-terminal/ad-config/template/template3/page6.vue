<template>
  <top page="6"/>
  <div class="bg-grey-1 flex1 q-px-lg q-py-md column items-start justify-between no-wrap">
    <div class="full-width row items-center no-wrap">
      <q-btn color="grey-6" disable padding="3px 12px" rounded>
        <q-icon name="arrow_back_ios" size="16px"/>
        返回
      </q-btn>
      <div class="flex1 text-center text-h6" style="margin-left: -40px;">
        问题反馈
      </div>
    </div>
    <div class="full-width">
      <div class="text-subtitle1">
        选择您遇到的问题(可多选)
      </div>
      <div class="text-caption q-mb-md">
        <q-badge align="middle" color="red" label="2" transparent/>
        {{ id2Value }}
        <q-popup-edit v-slot="scope" v-model="id2Value" auto-save @save="onUpdateTemplate(2,$event)">
          <q-input v-model="scope.value" autofocus counter dense @keyup.enter="scope.set"/>
        </q-popup-edit>

      </div>
      <div class="q-pa-md row no-wrap items-center justify-between" style="outline: 1px dashed #ccc">
        <div class="q-mr-md">
          <div
            v-for="(item, index) in options"
            :key="index"
            class="row no-wrap items-center"
          >
            <q-checkbox :model-value="false" dense/>
            <div class="row no-wrap items-center">
              <span>{{ item }}</span>
              <q-popup-edit v-slot="scope" :model-value="item">
                <q-input
                  :model-value="item"
                  autofocus
                  counter
                  dense
                  @change="onOptionsLabelChange(index,$event)"
                  @keyup.enter="scope.set"
                />
              </q-popup-edit>
            </div>
            <q-btn
              color="red"
              dense
              flat
              icon="close"
              round
              size="12px"
              @click="remove(index)"
            />
          </div>
        </div>
        <div>
          <q-btn class="text-no-wrap" color="red" label="3-添加选项" size="14px" transparent/>
          <q-popup-edit v-slot="scope" v-model="inputText" auto-save>
            <q-input v-model="inputText" autofocus counter dense>
              <template #append>
                <q-btn dense flat icon="save" @click="onAdd(scope)"></q-btn>
              </template>
            </q-input>
          </q-popup-edit>
        </div>
      </div>
      <div class="full-width text-center q-mt-md">
        <q-btn color="grey-6" disable padding="6px 60px" rounded size="14px" unelevated>提交</q-btn>
      </div>
    </div>


    <div class="full-width text-no-wrap q-pa-md" style="border: 1px dashed rgb(204, 204, 204)">
      <div class="row no-wrap items-center">
        <q-badge color="red" label="4" transparent/>
        <span class="text-bold">{{ id4Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id4Value" auto-save @save="onUpdateTemplate(4,$event)">
          <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge color="red" label="5" transparent/>
        <span>服务电话：</span>
        <span>{{ id5Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id5Value" auto-save @save="onUpdateTemplate(5,$event)">
          <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务电话：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge color="red" label="6" transparent/>
        <span>服务时间：</span>
        <span>{{ id6Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id6Value" auto-save fit @save="onUpdateTemplate(6,$event)">
          <q-input v-model="scope.value" autofocus dense @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务时间：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge color="red" label="7" transparent/>
        <span>服务地址：</span>
        <span>{{ id7Value }}</span>
        <q-popup-edit v-slot="scope" v-model="id7Value" auto-save fit @save="onUpdateTemplate(7,$event)">
          <q-input v-model="scope.value" autofocus borderless dense @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务地址：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
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
    const item = templateData.value.find(el => el.page == 6)

    const id2Value = ref(item.obj.id2)
    const options = ref((item ? JSON.parse(JSON.stringify(item.obj.id3)) : []) || []);
    const id4Value = ref(item.obj.id4)
    const id5Value = ref(item.obj.id5)
    const id6Value = ref(item.obj.id6)
    const id7Value = ref(item.obj.id7)
    const inputText = ref("请填写问题");

    // 每个可修改数据统一保存到要发送的数据
    const onUpdateTemplate = (id, value) => {
      item.obj[`id${id}`] = value
    }
    // 问题列表项移除事件
    const remove = (index) => {
      options.value = options.value.filter((el, _index) => _index !== index);
      item.obj.id3 = item.obj.id3.filter((el, _index) => _index !== index)
    };
    // 新增问题事件
    const onAdd = (scope) => {
      scope.set();
      options.value.push(inputText.value);
      item.obj.id3.push(inputText.value)
    };
    // 问题列表单项编辑事件
    const onOptionsLabelChange = (index, value) => {
      options.value[index] = value
      item.obj.id3[index] = value
    }
    return {
      id2Value,
      options,
      id4Value,
      id5Value,
      id6Value,
      id7Value,
      inputText,

      onUpdateTemplate,
      remove,
      onAdd,
      onOptionsLabelChange,
    };
  },
};
</script>
