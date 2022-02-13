<template>
  <q-card class="absolue-top-left" style="left: 15px; top: 15px; width: 260px">
    <div class="row q-px-md q-py-xs items-center justify-between">
      <div class="text-subtitle2">视频 60k/s</div>
      <q-btn flat round size="12px" icon="clear" @click="$emit('close')" />
    </div>
    <q-separator />
    <div style="height: 140px">
      <video
        loop
        muted
        autoplay
        controls
        class="fit"
        src="../../03/demo.mp4"
        style="object-fit: fill"
      ></video>
    </div>
  </q-card>
</template>
<script>
export default {
  emits: ["close"],
  setup() {},
};
</script>
