<template>
  <div class="my-box column no-wrap">
    <div class="bg-white q-pl-md q-pb-md q-mt-md">
      <q-form class="q-gutter-sm row items-center">
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
        <q-input outlined dense placeholder="设备IMEI号"> </q-input>
        <q-select
          dense
          outlined
          label="设备类型"
          placeholder="设备类型"
          style="width: 180px"
          dropdown-icon="mdi-chevron-down"
          :options="['手环', '打卡点', '摄像头', '其他设备']"
        >
        </q-select>
        <q-btn icon="search" color="primary" dense />
        <q-btn icon="add" color="primary" dense />
        <q-btn icon="file_download" color="primary" dense />
      </q-form>
    </div>
    <div class="bg-white q-pa-md" style="height: 220px">
      <my-echarts cid="c1" :options="options" />
    </div>
    <q-separator />
    <div class="flex1 overflow-hidden">
      <my-table :rows="rows" :columns="columns" :total="20" :page="1">
        <template #custom-type="{ val }">
          <q-badge
            class="q-pa-xs"
            :color="typeColorObj[val]"
            :label="typeTextObj[val]"
          />
        </template>
        <template #op>
          <div class="q-gutter-sm">
            <q-btn
              title="查看"
              color="primary"
              flat
              dense
              size="11px"
              round
              icon="remove_red_eye"
            />
            <q-btn
              title="导出"
              color="red-5"
              flat
              dense
              size="11px"
              round
              icon="get_app"
            />
          </div>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import MyEcharts from "components/echarts";
import MyTable from "components/table";
import { shallowReactive } from "vue";

export default {
  components: {
    MyEcharts,
    MyTable,
  },
  setup() {
    const columns = [
      {
        name: "username",
        field: "username",
        label: "IMEI",
        align: "left",
      },
      {
        name: "type",
        field: "type",
        label: "设备类型",
        align: "left",
        type: "custom",
      },
      {
        name: "time",
        field: "time",
        label: "操作时间",
        align: "left",
      },
      {
        name: "content",
        field: "content",
        label: "操作内容",
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
        username: "shg54h45he",
        type: "1",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "tq43t3gt3",
        type: "2",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "3q4g43t",
        type: "3",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "34ttqt",
        type: "4",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "rgaerga34re",
        type: "5",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "3q4g43t",
        type: "3",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "34ttqt",
        type: "4",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "3q4g43t",
        type: "3",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "34ttqt",
        type: "4",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "3q4g43t",
        type: "3",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "34ttqt",
        type: "4",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "3q4g43t",
        type: "3",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
      {
        username: "34ttqt",
        type: "4",
        time: "2021-06-05 13:05:05",
        content: "****************",
      },
    ];
    const options = shallowReactive({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      confine: true,
      legend: {
        data: ["类1", "类2", "类3", "类4", "类5"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00-04:00",
            "04:00-08:00",
            "09:00-12:00",
            "12:00-16:00",
            "16:00-20:00",
            "20:00-24:00",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "类1",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "none",
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              opacity: 0.7,
            },
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "类2",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "none",
            scale: false,
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              opacity: 0.7,
            },
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "类3",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "none",
            scale: false,
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              opacity: 0.7,
            },
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "类4",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "none",
            scale: false,
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              opacity: 0.7,
            },
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "类5",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "none",
            scale: false,
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              opacity: 0.7,
            },
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    });
    const typeColorObj = {
      1: "primary",
      2: "green",
      3: "orange",
      4: "secondary",
      5: "red",
    };
    const typeTextObj = {
      1: "手环设备",
      2: "监控设备",
      3: "充电设备",
      4: "打卡设备",
      5: "其他设备",
    };

    return {
      columns,
      rows,
      options,
      typeColorObj,
      typeTextObj,
    };
  },
};
</script>
