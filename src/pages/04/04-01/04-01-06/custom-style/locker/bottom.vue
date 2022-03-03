<template>
  <div class="q-py-sm">
    <q-btn push color="red-5" icon="help_outline">遇到问题？</q-btn>
  </div>
  <q-separator />
  <div
    class="overflow-hidden row q-px-md justify-between items-center no-wrap justify-center"
    style="height: 20%"
  >
    <div class="text-no-wrap">
      <div >
        <span class="text-bold">{{ id1Value }}</span>
        <q-popup-edit v-model="id1Value" auto-save v-slot="scope" @save="onSave(rowId1,$event)">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <q-badge>{{ rowId1 }}</q-badge>
      </div>
      <div >
        <span>服务电话：</span>
        <span>{{ id2Value }}</span>
        <q-popup-edit v-model="id2Value" auto-save v-slot="scope"  @save="onSave(rowId2,$event)">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <q-badge >{{ rowId2 }}</q-badge>
      </div>
      <div >
        <span>服务时间：</span>
        <span>{{ id3Value }}</span>
        <q-popup-edit v-model="id3Value" auto-save fit  v-slot="scope"  @save="onSave(rowId3,$event)">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <q-badge >{{ rowId3 }}</q-badge>
      </div>
      <div >
        <span>服务地址：</span>
        <span>{{ id4Value }}</span>
        <q-popup-edit v-model="id4Value" auto-save fit  v-slot="scope"  @save="onSave(rowId4,$event)">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <q-badge >{{ rowId4 }}</q-badge>
      </div>
    </div>
    <div class="column items-center no-wrap text-no-wrap">
      <div style="width: 60px">
        <img
          class="full-width"
          :src="id6Value"
          alt=""
        />
        <q-badge align="top">{{ rowId6 }}</q-badge>
      </div>
      <div >
        <span class="text-bold">{{ id5Value }}</span>
        <q-popup-edit v-model="id5Value" auto-save fit v-slot="scope"  @save="onSave(rowId5,$event)">
          <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
        </q-popup-edit>
        <q-badge>{{ rowId5 }}</q-badge>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  emits: ['update'],
  props: {
    FormData: {
      type: Object,
      default: () => {
        return {
          1: "西湖公园游客服务中心",
          2: "服务电话：12345678",
          3: "服务时间：08:00-18:00",
          4: "服务地址：西湖公园西湖公园西湖公园",
          5: "智慧西湖小程序",
        };
      },
    },
    rowId1: {
      type: String,
      default: '1'
    },
    rowId2: {
      type: String,
      default: '2'
    },
    rowId3: {
      type: String,
      default: '3'
    },
    rowId4: {
      type: String,
      default: '4'
    },
    rowId5: {
      type: String,
      default: '5'
    },
    rowId6: {
      type: String,
      default: 'https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=9e8025bbfbd5c2dfbc672d90c0bd9ca1'
    },
  },
  setup(props, {emit}) {
    const id1Value = ref('西湖公园游客服务中心')
    const id2Value = ref('12345678')
    const id3Value = ref('08:00-18:00')
    const id4Value = ref('福州西湖公园')
    const id5Value = ref('智慧西湖小程序')
    const id6Value = ref('https://qr.api.cli.im/newqr/create?data=%25E6%25B5%258B%25E8%25AF%2595%25E4%25BA%258C%25E7%25BB%25B4%25E7%25A0%2581&level=H&transparent=false&bgcolor=%23FFFFFF&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=9e8025bbfbd5c2dfbc672d90c0bd9ca1')


    const onSave = (id,value) => {
      emit('update',{id,value})
    }

    emit('update',{id:props.rowId1,value:id1Value.value})
    emit('update',{id:props.rowId2,value:id2Value.value})
    emit('update',{id:props.rowId3,value:id3Value.value})
    emit('update',{id:props.rowId4,value:id4Value.value})
    emit('update',{id:props.rowId5,value:id5Value.value})
    emit('update',{id:props.rowId6,value:id6Value.value})
    return {
      id1Value,
      id2Value,
      id3Value,
      id4Value,
      id5Value,
      id6Value,
      onSave,
    }
  }
};
</script>

<style></style>
