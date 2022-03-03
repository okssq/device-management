<template>
  <q-separator />
  <div class="relative-position bg-grey-2" :class="{'drag-enter':dragging}" style="height: 26%" id="ad"  @dragenter="onDragEnter"
       @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
    <div class="absolute-full text-grey-6 text-h6">广告</div>
    <q-carousel
      v-show="adList.length"
      v-model="carouselValue"
      animated
      controlType="regular"
      control-color="primary"
      arrows
      class="fit bg-transparent"
    >
      <q-carousel-slide v-for="(item,index) in adList" :key="index" :name="index" class="q-pa-none column no-wrap flex-center">
        <q-img
          src="http://mms2.baidu.com/it/u=1895335407,2753497845&fm=253"
          spinner-color="white"
          fit="fill"
          class="fit"
        />
        <div class="absolute-bottom custom-caption q-py-sm q-px-md text-white" style="background-color: rgba(0,0,0,.3)">
<!--          <q-btn round size="sm" color="red-5" icon="clear"></q-btn>-->
          <span class="text-subtitle1">{{ item }}</span>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <div class="q-pa-xs text-right text-bold">2022/3/19 星期⼀ 10:10AM</div>
  <q-separator/>
  <div class="q-pa-xs">
    <q-btn flat dense color="primary" icon="chevron_left">返回</q-btn>
  </div>
</template>

<script>
import {ref, shallowRef,toRaw} from 'vue'
export default {
  emits: ['update'],
  props: {
    rowId: {
      type: String,
      default: ''
    }
  },
  setup(props,{emit}) {
    const carouselValue = ref(0)
    const adList = ref([])

    const dragging = ref(false)
    const onDragEnter = (e) => {
      console.log('onDragEnter', e, e.target.id, e.target.draggable)
      // e.preventDefault();
      dragging.value = true

    }
    const onDragOver = (e) => {
      e.preventDefault()
    }
    const onDragLeave = (e) => {
      console.log('onDragLeave',e)
      dragging.value = false
      // e.target.classList.remove('drag-enter')
    }
    const onDrop = (e) => {
      // e.target.classList.remove('drag-enter')
      dragging.value = false
      const str = e.dataTransfer.getData("dragStr");
      if(!str) return
      const obj = JSON.parse(str)
      // if(!carouselValue.value){
      //   carouselValue.value = 0
      // }
      adList.value.push(obj.resource)
      emit('update',{id:props.rowId,value: toRaw(adList.value)})
      // console.log('onDrop', str)
    }

    return {
      carouselValue,
      adList,

      dragging,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onDrop,
    }
  }
};
</script>

<style>
.drag-enter {
  outline-style: dashed;
}


</style>
