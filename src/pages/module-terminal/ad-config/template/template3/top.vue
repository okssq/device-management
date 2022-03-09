<template>
  <q-separator/>
  <div id="ad" :class="{'drag-enter':dragging}" class="relative-position bg-grey-1" style="height: 22%"
       @dragenter="onDragEnter"
       @dragleave="onDragLeave" @dragover="onDragOver" @drop="onDrop">
    <div class="absolute-center text-grey-6 text-no-wrap  text-subtitle1">
      <q-badge align="middle" color="red-5" label="1" transparent/>
      拖动左侧资源可添加广告
    </div>
    <q-carousel
      v-show="adList.length"
      v-model="carouselValue"
      animated
      class="fit"
      control-type="push"
      navigation
      navigation-position="top"
      swipeable
    >
      <template #navigation-icon="{ active, index, onClick }">
        <q-btn v-if="active" color="primary" dense icon="home" push round size="xs" @click="onClick"/>
        <q-btn v-else :label="index+1" color="primary" dense push size="xs" @click="onClick"/>
      </template>
      <q-carousel-slide v-for="(item,index) in adList" :key="index" :name="index"
                        class="q-pa-none column no-wrap flex-center">
        <q-img
          v-if="['jpeg','png','jpg'].includes(item.split('.').pop().toLowerCase())"
          :src="item"
          class="fit"
          fit="fill"
          spinner-color="white"
        />
        <video
          v-else-if="['avi','mp4','wmv','mpg','mpeg','flv','swf'].includes(item.split('.').pop().toLowerCase())"
          :src="item"
          autoplay
          class="fit"
          loop
          muted
          style="object-fit: fill"
        />

        <div class="absolute-bottom custom-caption q-py-sm q-px-md row no-wrap justify-between items-center "
             style="background-color: rgba(0,0,0,.3)">
          <span class="text-caption ellipsis text-white">{{ item }}</span>
          <q-btn color="red-4" icon="clear" round size="xs" @click="onRemove(index)"/>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
  <q-separator/>
</template>

<script>
import {inject, ref} from 'vue'


export default {
  props: {
    page: {
      type: [String, Number],
      page: '0'
    },
  },
  setup(props) {

    const templateData = inject('templateData')
    const item = templateData.value.find(el => el.page == props.page)

    const carouselValue = ref(0)
    const adList = ref((item ? JSON.parse(JSON.stringify(item.obj.id1)) : []) || [])
    const dragging = ref(false)

    const onRemove = (i) => {
      adList.value = adList.value.filter((el, index) => i !== index)
      item.obj.id1 = item.obj.id1.filter((el, index) => i !== index)
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
    const onDragLeave = () => {
      dragging.value = false
    }
    const onDrop = (e) => {
      dragging.value = false
      const str = e.dataTransfer.getData("dragStr");
      if (!str) return
      const obj = JSON.parse(str)

      adList.value.push(obj.resource)
      item.obj.id1.push(obj.resource)
      carouselValue.value = adList.value.length - 1;
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
