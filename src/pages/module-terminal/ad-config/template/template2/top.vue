<template>
  <q-separator/>
  <div class="relative-position bg-grey-2" :class="{'drag-enter':dragging}" style="height: 20%" id="ad"
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
          v-if="['jpeg','png','jpg'].includes(item.split('.').pop().toLowerCase())"
          :src="item"
          spinner-color="white"
          fit="fill"
          class="fit"
        />
        <video
          loop
          autoplay
          muted
          v-else-if="['avi','mp4','wmv','mpg','mpeg','flv','swf'].includes(item.split('.').pop().toLowerCase())"
          style="object-fit: fill"
          class="fit"
          :src="item"
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
import {ref, inject} from 'vue'


export default {
  components: {},

  props: {
    page:{
      type: String,
      page: '0'
    },
    rowId: {
      type: String,
      default: '1'
    }
  },
  setup(props) {

    const templateData = inject('templateData')
    const item = templateData.value.find(el=> el.page == props.page)

    const carouselValue = ref(0)
    const adList = ref((item ? JSON.parse(JSON.stringify(item.obj.id1)) : [] )|| [])
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
      carouselValue.value = adList.value.length -1;
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
