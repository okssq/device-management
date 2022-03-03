<template>
  <q-separator/>
  <div class="relative-position bg-grey-2" :class="{'drag-enter':dragging}" style="height: 18%" id="ad"
       @dragenter="onDragEnter"
       @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
    <div class="absolute-center text-grey-6 text-subtitle1">
      <q-badge color="red-5" align="middle" label="1" transparent/>
      拖动左侧资源可添加广告
    </div>
    <q-carousel
      animated
      swipeable
      navigation
      navigation-position="top"
      control-type="push"
      class="fit"
      v-show="adList.length"
      v-model="carouselValue"
    >
      <template #navigation-icon="{ active, index, onClick }">
        <q-btn v-if="active" size="xs" icon="home" color="primary" push round dense @click="onClick"/>
        <q-btn v-else size="xs" :label="index+1" color="primary" push dense @click="onClick"/>
      </template>
      <q-carousel-slide v-for="(item,index) in adList" :key="index" :name="index"
                        class="q-pa-none column no-wrap flex-center">
        <q-img
          src="http://mms2.baidu.com/it/u=1895335407,2753497845&fm=253"
          spinner-color="white"
          fit="fill"
          class="fit"
        />
        <div class="absolute-bottom custom-caption q-py-sm q-px-md row no-wrap justify-between items-center "
             style="background-color: rgba(0,0,0,.3)">
          <span class="text-caption ellipsis text-white">{{ item }}</span>
          <q-btn round size="xs" color="red-4" icon="clear" @click="onRemove(index)"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <q-separator/>
  <div class="q-pa-xs">
    <q-btn flat dense disable color="grey-7" icon="chevron_left">返回</q-btn>
  </div>
</template>

<script>
import {ref, shallowRef, toRaw} from 'vue'

export default {
  emits: ['update'],
  props: {
    rowId: {
      type: String,
      default: '1'
    }
  },
  setup(props, {emit}) {
    const carouselValue = ref(0)
    const adList = ref([])
    const dragging = ref(false)

    const onRemove = (i) => {
      adList.value = adList.value.filter((el, index) => i !== index)
      carouselValue.value = 0
    }
    const onDragEnter = (e) => {
      e.preventDefault();
      dragging.value = true
    }
    const onDragOver = (e) => {
      e.preventDefault()
      dragging.value = true
    }
    const onDragLeave = (e) => {
      dragging.value = false
    }
    const onDrop = (e) => {
      dragging.value = false
      const str = e.dataTransfer.getData("dragStr");
      if (!str) return
      const obj = JSON.parse(str)
      // if(!carouselValue.value){
      //   carouselValue.value = 0
      // }
      adList.value.push(obj.resource)
      emit('update', {id: props.rowId, value: toRaw(adList.value)})
      // console.log('onDrop', str)
    }

    return {
      carouselValue,
      adList,
      dragging,

      onRemove,
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
  outline: 4px dashed orange;
}


</style>
