<template>
  <div class="q-pb-sm">
    <q-btn unelevated size="14px" disable color="grey-6" icon="help_outline">遇到问题？</q-btn>
  </div>
  <q-separator/>
  <div class="overflow-hidden row q-px-md q-py-lg justify-between items-center no-wrap justify-center">
    <div class="text-no-wrap flex1">
      <div class="row no-wrap items-center">
        <q-badge transparent color="red" label="2"/>
        <span class="text-bold">{{ id2Value }}</span>
        <q-popup-edit v-model="id2Value" auto-save v-slot="scope" @save="onSave(2,$event)">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge transparent color="red" label="3"/>
        <span>服务电话：</span>
        <span>{{ id3Value }}</span>
        <q-popup-edit v-model="id3Value" auto-save v-slot="scope" @save="onSave(3,$event)">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务电话：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge transparent color="red" label="4"/>
        <span>服务时间：</span>
        <span>{{ id4Value }}</span>
        <q-popup-edit v-model="id4Value" auto-save fit v-slot="scope" @save="onSave(4,$event)">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务时间：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge transparent color="red" label="5"/>
        <span>服务地址：</span>
        <span>{{ id5Value }}</span>
        <q-popup-edit v-model="id5Value" auto-save fit v-slot="scope" @save="onSave(5,$event)">
          <q-input v-model="scope.value" dense autofocus borderless  @keyup.enter="scope.set">
            <template #before>
              <span class="text-subtitle2">服务地址：</span>
            </template>
          </q-input>
        </q-popup-edit>
      </div>
    </div>
    <div class="column items-center no-wrap text-no-wrap">
      <div class="relative-position">
        <img class="full-width" src="./qrcode.png"/>
        <q-badge class="absolute-center" color="red" label="6"/>
        <q-popup-edit v-model="id6Value" auto-save fit v-slot="scope" @save="onSave(6,$event)">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
      <div class="row no-wrap items-center">
        <q-badge transparent color="red" label="7"/>
        <span class="text-bold">{{ id7Value }}</span>
        <q-popup-edit v-model="id7Value" auto-save fit v-slot="scope" @save="onSave(7,$event)">
          <q-input v-model="scope.value" dense autofocus  @keyup.enter="scope.set"/>
        </q-popup-edit>
      </div>
    </div>
  </div>
</template>

<script>
import {ref,inject} from "vue";

export default {
  props: {
    page:{
      type: String,
      page: '0'
    },

  },
  setup(props) {
    const templateData = inject('templateData')
    const item = templateData.value.find(el=> el.page == props.page)
    const id2Value = ref(item.obj['id2'])
    const id3Value = ref(item.obj['id3'])
    const id4Value = ref(item.obj['id4'])
    const id5Value = ref(item.obj['id5'])
    const id6Value = ref(item.obj['id6'])
    const id7Value = ref(item.obj['id7'])

    const onSave = (id, value) => {
      item.obj[`id${id}`] = value
    }

    return {
      id2Value,
      id3Value,
      id4Value,
      id5Value,
      id6Value,
      id7Value,
      onSave,
    }
  }
};
</script>
