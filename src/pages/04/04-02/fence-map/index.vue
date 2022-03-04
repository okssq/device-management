<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 800px; max-width: 98vw"
        >
          <div class="row q-px-md q-py-xs items-center justify-between">
            <div class="text-subtitle2 text-bold">项目所属区域</div>
            <q-btn
              flat
              round
              size="12px"
              icon="clear"
              @click="$emit('cancel')"
            />
          </div>
          <q-separator />
          <div style="height: 400px">
            <global-map></global-map>
          </div>
          <q-separator />

          <section
            class="absolute-top-left bg-white shadow-5"
            style="top: 50px; left: 10px; width: 240px"
          >
            <div v-if="row">
              <q-list dense padding>
                <q-item>
                  <q-item-section side lines="1">纬度：</q-item-section>
                  <q-item-section>
                    {{ lng }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section side lines="1">经度：</q-item-section>
                  <q-item-section>
                    {{ lat }}
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section side lines="1">区域：</q-item-section>
                  <q-item-section lines="4">
                    {{ row.projectAddress || "-" }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </section>
        </q-card>
      </div>
    </div>
  </teleport>
</template>
<script>
import GlobalMap from "components/map/index.vue";
import { ref, inject, onMounted, onBeforeUnmount, toRaw } from "vue";
export default {
  emits: ["cancel"],
  components: {
    GlobalMap,
  },
  props: {
    row: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props, { emit }) {
    let marker, polygon;
    const LOAD = inject("LOAD");
    const lng = ref("");
    const lat = ref("");
    const fnMarker = (location) => {
      if (!marker) {
        marker = new AMap.Marker();
      }
      marker.remove();
      marker.add(LOAD.mapObj);
      LOAD.mapObj.setZoomAndCenter(17, location,true,false);
      marker.setPosition(location);
    };
    const fnPolygon = (path) => {
      if (!polygon) {
        polygon = new window.AMap.Polygon({
          path,
          map: LOAD.mapObj,
          draggable: false,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });
      } else {
        polygon.setPath(path);
      }
    };
    const initMap = () => {
      if (props.row) {
        const obj = toRaw(props.row);
        const { mapStr, projectAddress } = obj;
        if (mapStr && projectAddress) {
          const [gpsStr, fenceStr] = mapStr.split(";");
          if (!gpsStr || !fenceStr) return;
          const gpsArr = gpsStr.split(",");
          const position = new AMap.LngLat(gpsArr[0], gpsArr[1]);
          lng.value = gpsArr[0];
          lat.value = gpsArr[1];
          fnMarker(position);

          try {
            const path = JSON.parse(fenceStr).map((el) => {
              const { longitude, latitude } = el;
              return new AMap.LngLat(longitude, latitude);
            });
            fnPolygon(path);
          } catch (e) {
            const path = [
              position.offset(0, 100),
              position.offset(200, 0),
              position.offset(0, -100),
              position.offset(-200, 0),
            ];
            fnPolygon(path);
          }
        }
      }
    };

    onMounted(() => {
      initMap();
    });

    onBeforeUnmount(() => {
      if (marker) marker.remove();
      if (polygon) {
        polygon.hide();
        polygon.destroy();
      }
      marker = null;
      polygon = null;
      LOAD.mapObj.clearMap();
    });

    return {
      lng,
      lat,
    };
  },
};
</script>
