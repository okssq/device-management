<template>
  <div class="my-box q-pa-md row no-wrap fit">
    <div class="full-height column no-wrap" style="width: 280px">
      <q-input dense outlined placeholder="设备IMEI号">
        <template #prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <div
        class="flex1 overflow-hidden q-mt-md"
        style="border: 1px solid rgb(221, 221, 221); border-radius: 4px"
      >
        <q-scroll-area class="full-height">
          <q-tree
            :nodes="simple"
            node-key="label"
            selected-color="primary"
            v-model:selected="selected"
            default-expand-all
          />
        </q-scroll-area>
      </div>
    </div>
    <q-separator vertical class="q-mx-md" />
    <div class="flex1 row wrap">
      <div
        class="wrap-video-item q-card--bordered overflow-hidden column no-wrap"
        v-for="n in 4"
        :key="n"
      >
        <div class="row justify-between items-center q-pa-sm bg-grey-2">
          <div class="text-subtitle2">线路{{ n }}</div>
          <div class="text-caption">60kb/s</div>
          <q-btn flat round dense icon="mdi-close" size="sm" />
        </div>
        <q-separator />
        <div class="flex1 overflow-hidden video-content">
          <video
            loop
            muted
            autoplay
            controls
            class="fit"
            src="../demo.mp4"
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const videoList = ref([]);
    const layout = ref("2x2");
    const selected = ref("Food");

    const simple = [
      {
        label: "教室1",
        children: [
          {
            label: "摄像头1",
          },
          {
            label: "摄像头2",
          },
          {
            label: "摄像头3",
          },
          {
            label: "摄像头4",
          },
          {
            label: "摄像头5",
          },
          {
            label: "摄像头6",
          },
        ],
      },
      {
        label: "教室2",
        children: [
          {
            label: "摄像头1",
          },
          {
            label: "摄像头2",
          },
          {
            label: "摄像头3",
          },
          {
            label: "摄像头4",
          },
          {
            label: "摄像头5",
          },
          {
            label: "摄像头6",
          },
        ],
      },
      {
        label: "教室3",
        children: [
          {
            label: "摄像头1",
          },
          {
            label: "摄像头2",
          },
          {
            label: "摄像头3",
          },
          {
            label: "摄像头4",
          },
          {
            label: "摄像头5",
          },
          {
            label: "摄像头6",
          },
        ],
      },
    ];
    return {
      videoList,
      layout,
      selected,
      simple,
    };
  },
};
</script>

<style scoped>
.wrap-video-item {
  width: 50%;
  height: 50%;
}

.wrap-video-item:nth-child(2),
.wrap-video-item:last-child {
  border-left: none;
}

.wrap-video-item:nth-child(3),
.wrap-video-item:last-child {
  border-top: none;
}

.video-content video {
  object-fit: fill;
}
</style>
