<template>
  <div class="fit">
    <div :id="cid" class="fit overflow-hidden"/>
    <q-resize-observer debounce="1000" @resize="onResize"/>
  </div>
</template>

<script>
import {onBeforeUnmount, onMounted, watch} from 'vue'

export default {
  props: {
    cid: {
      type: String,
      require: true,
      default: 'xz-echart'
    },
    options: {
      type: Object,
      require: true,
      default: () => ({})
    }
  },

  setup(props) {
    let myChart = null
    watch(
      props.options,
      () => {
        myChart && myChart.setOption(props.options)
      },
    )

    const onResize = () => {
      myChart && myChart.resize()
    }
    // 实例渲染完成
    onMounted(() => {
      myChart = window.echarts.init(document.getElementById(props.cid), 'walden')
      myChart.setOption(props.options)
    })
    // 销毁实例a
    onBeforeUnmount(() => {
      if (myChart) {
        myChart.dispose()
        myChart = null
      }
    })
    return {
      onResize
    }
  },

}
</script>
