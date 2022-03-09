<template>
  <teleport :to="mapTeleportTo">
    <div id="global-map" class="fit"/>
  </teleport>
  <div class="fullscreen overflow-hidden column no-wrap">
    <layout-header/>
    <div class="flex1 overflow-hidden row no-wrap">
      <layout-side class="layout-side "/>
      <div class="flex1 column no-wrap overflow-hidden layout-main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutSide from "./side";
import useLayout from "./useLayout";
import {onMounted} from "vue";

export default {
  components: {
    LayoutHeader,
    LayoutSide,
  },
  setup() {
    const {mapTeleportTo, loadMap} = useLayout();
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
.layout-side {
  transition: all 0.3s;
  z-index: 12;
}

.layout-main {
  z-index: 8;
  position: relative;
  background-color: rgb(244, 245, 250);
}
</style>
