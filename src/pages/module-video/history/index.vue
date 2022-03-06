<template>
  <div class="my-box row no-wrap full-height full-height">
    <div class="full-height column no-wrap overflow-hidden">
      <div class="flex1">
        <tree />
      </div>
      <q-input outlined dense placeholder="时间" class="q-mx-md">
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
        class="q-ma-md"
        label="视频通道"
        dropdown-icon="mdi-chevron-down"
        v-model="channel"
        :options="['通道1', '通道2', '通道3', '通道4']"
      >
      </q-select>
      <div class="q-px-md q-mb-md">
        <q-btn label="搜索" color="primary" class="full-width" />
      </div>
    </div>
    <q-separator vertical />
    <div class="flex1 overflow-hidden column no-wrap">
      <div class="flex1 overflow-hidden row wrap">
        <div
          class="wrap-video-item shadow-4 overflow-hidden column no-wrap"
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
import Tree from "components/tree";
import MyTable from "components/table";
import { ref } from "vue";

export default {
  components: {
    Tree,
    MyTable,
  },
  setup() {
    const selected = ref("Food");
    const videoList = ref([
      { name: "111", speed: "78" },
      { name: "112", speed: "68" },
      { name: "211", speed: "46" },
      { name: "314", speed: "99" },
    ]);
    const channel = ref('')
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
      videoList,
      channel,
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
