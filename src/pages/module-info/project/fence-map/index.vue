<template>
  <teleport to="body">
    <div class="fullscreen dimmed">
      <div class="absolute-center bg-white column no-wrap z-top">
        <q-card
          class="relative-position overflow-hidden"
          style="width: 960px; max-width: 98vw"
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
          <div style="width:100%;height: 600px">
            <global-map  @load-success="onMapLoadSuccess" />
          </div>
          <q-separator />

          <section
            class="absolute-top-left bg-white rounded-borders shadow-2"
            style="top: 54px; left: 10px; width: 240px"
          >
            <div v-if="row" class="text-capitalize text-bold q-pa-md">
             <div class="row items-center no-wrap">
               <div>经度：</div>
               <div>{{ lng }}</div>
             </div>
              <div class="row items-center no-wrap">
                <div>纬度：</div>
                <div>{{ lat }}</div>
              </div>
              <div class="row items-center no-wrap">
                <div class="text-no-wrap">区域：</div>
                <div>{{ row.projectAddress || "-" }}</div>
              </div>
            </div>
          </section>
        </q-card>
      </div>
    </div>
  </teleport>
</template>
<script>
import GlobalMap from "components/map";
import { ref, inject, onBeforeUnmount, toRaw } from "vue";
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
    const map = inject("map");
    const lng = ref("");
    const lat = ref("");
    const fnMarker = (location) => {
      if (!marker) {
        marker = new AMap.Marker();
      }
      marker.remove();
      marker.add(map.value);
      marker.setPosition(location);
    };
    const fnPolygon = (path) => {
      if (!polygon) {
        polygon = new window.AMap.Polygon({
          path,
          map: map.value,
          draggable: false,
          fillColor: '#7bccc4',
          strokeOpacity: 1,
          fillOpacity: 0.3,
          strokeColor: '#2b8cbe',
          strokeWeight: 2,
          strokeStyle: 'dashed',
          strokeDasharray: [5, 5],
        });
      } else {
        polygon.setPath(path);
      }

      setTimeout(() => {
        map.value.setFitView([polygon],true,[60,60,280,60])
      },130)

    };
    const onMapLoadSuccess = () => {
      map.value.setZoom(20, true, false)
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
      }else{

      }
    };


    onBeforeUnmount(() => {
      if (marker) marker.remove();
      if (polygon) {
        polygon.hide();
        polygon.destroy();
      }
      marker = null;
      polygon = null;
      map.value.clearMap();
    });

    return {
      lng,
      lat,
      onMapLoadSuccess,
    };
  },
};
</script>
