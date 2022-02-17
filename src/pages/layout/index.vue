<template>
  <teleport :to="mapTeleportTo">
    <div id="global-map" class="fit"></div>
  </teleport>
  <div class="fullscreen overflow-hidden column no-wrap">
    <layout-header />
    <div class="flex1 overflow-hidden row no-wrap">
      <layout-side />
      <div class="flex1 column no-wrap overflow-hidden layout-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutSide from "./side";
import useLoad from "./useLoad";
import { onMounted } from "vue";
export default {
  components: {
    LayoutHeader,
    LayoutSide,
  },
  setup() {
    const { mapTeleportTo, loadMap } = useLoad();
    onMounted(() => {
      loadMap();
    });

    return {
      mapTeleportTo,
    };
  },
};
</script>

<style scoped>
.layout-main {
  z-index: 8;
  position: relative;
  background-color: rgb(244, 245, 250);
}

.layout-content {
  overflow: hidden;
}
</style>
