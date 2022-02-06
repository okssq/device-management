<template>
  <div class="my-box q-pa-md row no-wrap full-height full-height">
    <div
      class="full-height column no-wrap overflow-hidden"
      style="width: 280px"
    >
      <q-input dense outlined placeholder="设备IMEI号">
        <template #prepend>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
      <div
        class="flex1 q-my-sm overflow-hidden"
        style="border: 1px solid #ddd; border-radius: 4px"
      >
        <q-scroll-area class="full-height">
          <q-tree
            class="full-width"
            :nodes="simple"
            node-key="label"
            selected-color="primary"
            v-model:selected="selected"
            default-expand-all
          />
        </q-scroll-area>
      </div>
      <q-input outlined dense placeholder="时间">
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time mask="YYYY-MM-DD HH:mm" format24h>
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select
        dense
        outlined
        class="q-my-md"
        label="视频通道"
        dropdown-icon="mdi-chevron-down"
        :options="['通道1', '通道2', '通道3', '通道4']"
      >
      </q-select>
      <q-btn label="搜索" color="primary" class="full-width" />
    </div>
    <q-separator vertical class="q-mx-md" />
    <div class="flex1 overflow-hidden column no-wrap">
      <div class="flex1 overflow-hidden row wrap">
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
      <my-table
        dense
        hide-bottom
        style="height: 180px"
        :rows="rows"
        :columns="columns"
        :total="20"
        :page="1"
      >
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="播放"
              color="primary"
              flat
              dense
              size="11px"
              round
              icon="mdi-play-circle-outline"
            />
            <q-btn
              title="下载"
              color="red-5"
              flat
              dense
              size="11px"
              round
              icon="mdi-download"
            />
          </div>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import MyTable from "components/table";
import { ref } from "vue";

export default {
  components: {
    MyTable,
  },
  setup() {
    const selected = ref("Food");
    const simple = [
      {
        label: "项目1",
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
        label: "项目2",
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
        label: "项目3",
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
    const columns = [
      {
        name: "sTime",
        field: "sTime",
        label: "开始时间",
        align: "left",
      },
      {
        name: "eTime",
        field: "eTime",
        label: "结束时间",
        align: "left",
      },
      {
        name: "imei",
        field: "imei",
        label: "IMEI",
        align: "left",
      },
      {
        name: "channel",
        field: "imei",
        label: "通道",
        align: "left",
      },
      {
        name: "size",
        field: "size",
        label: "文件大小(MB)",
        align: "left",
      },
      {
        name: "op",
        label: "操作",
        field: "op",
        align: "center",
      },
    ];
    const rows = [
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "1",
        size: "0.5",
        time: "2021-06-05 13:05:05",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "32462hygfg5",
        channel: "2",
        size: "2.4",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "43r34vv3g3g",
        channel: "3",
        size: "4.2",
      },
      {
        sTime: "2021-06-05 13:05:05",
        eTime: "2021-06-05 13:05:05",
        imei: "fve343rvgf",
        channel: "4",
        size: "1.4",
      },
    ];

    return {
      selected,
      simple,
      columns,
      rows,
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
