<template>
  <div class="my-box row no-wrap fit">
    <div class="full-height column no-wrap">
      <tree />
    </div>
    <q-separator vertical />
    <div class="flex1 row wrap">
      <div
        class="wrap-video-item overflow-hidden column no-wrap shadow-4"
        v-for="(n, index) in videoList"
        :key="index"
      >
        <div class="row justify-between items-center q-pa-sm bg-grey-2">
          <div class="text-subtitle2">IEMI:{{ n.name }}</div>
          <div class="text-subtitle2">{{ n.speed }}kb/s</div>
          <q-btn flat round dense icon="clear" size="sm" />
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
import Tree from "components/tree";
import { ref } from "vue";

export default {
  components: {
    Tree,
  },
  setup() {
    const videoList = ref([
      { name: "111", speed: "78" },
      { name: "112", speed: "68" },
      { name: "211", speed: "46" },
      { name: "314", speed: "99" },
    ]);
    const layout = ref("2x2");
    const selected = ref("Food");

    return {
      videoList,
      layout,
      selected,
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
