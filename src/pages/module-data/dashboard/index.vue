<template>
  <div class="absolute-full q-pa-md overflow-auto">
    <div class="row no-wrap q-gutter-md">
      <div
        class="bg-white q-pa-md flex1 rounded-borders shadow-1"
        v-for="item in products"
        :key="item.id"
      >
        <div class="text-h6 text-grey">{{ item.number }}</div>
        <div class="text-body1 text-grey-5">{{ item.name }}</div>
        <q-linear-progress
          class="q-mt-sm"
          :value="item.number / 100"
          :color="item.color"
          :track-color="item.trackColor"
        />
      </div>
    </div>
    <div class="q-mt-md shadow-1">
      <div class="bg-white rounded-borders row no-wrap justify-between">
        <div class="flex1 row items-center justify-between q-pa-md">
          <div>
            <div class="text-subtitle1">标题</div>
            <div class="text-grey-7">标题简介</div>
          </div>
          <div class="row items-center justify-between">
            <div style="margin-right: 120px">
              <div class="text-subtitle1">231</div>
              <div class="text-grey-7">简介</div>
            </div>
            <q-btn
              round
              icon="photo_library"
              color="blue-5"
              class="text-white"
            />
          </div>
        </div>
        <q-separator vertical style="background-color: rgb(0 0 0 / 7%)" />
        <div class="row items-center justify-between q-pa-md">
          <div style="margin-right: 160px">
            <div class="text-subtitle1">60</div>
            <div class="text-grey-7">简介</div>
          </div>
          <q-btn round icon="camera" color="grey-10" class="text-white" />
        </div>
      </div>
      <q-separator style="background-color: rgb(0 0 0 / 5%)" />
      <div class="bg-white q-pa-md" style="height: 400px">
        <my-echarts cid="c1" :options="options" />
      </div>
    </div>
    <div class="q-mt-md overflow-hidden">
      <div class="row no-wrap justify-between full-width overflow-hidden">
        <div class="bg-white rounded-borders flex1 shadow-1">
          <div class="q-pa-md">
            <div class="text-subtitle1">标题</div>
            <div class="text-grey-7">标题1详细介绍</div>
          </div>
          <q-separator style="background-color: rgb(0 0 0 / 7%)" />
          <div class="bg-white q-pa-md" style="height: 360px">
            <my-echarts cid="dsfs" :options="ops1" />
          </div>
        </div>
        <div class="q-ml-md column justify-between" style="width: 38%">
          <div
            class="flex1 overflow-hidden q-pa-lg bg-deep-purple-12 rounded-borders column overflow-hidden"
          >
            <div class="row items-center">
              <q-btn
                round
                icon="mdi-chart-arc"
                color="grey-10"
                class="text-white"
              />
              <div class="q-ml-md">
                <div class="text-subtitle1 text-white">本周使用趋势图</div>
                <div class="text-grey-3">2021/12/01 - 2021/12/07</div>
              </div>
            </div>
            <div
              class="flex1 overflow-hidden row no-wrap justify-between items-center"
            >
              <div class="text-h6 text-white">10024</div>
              <div class="full-height" style="width: 60%">
                <my-echarts cid="ops2" :options="ops2" />
              </div>
            </div>
          </div>
          <div
            class="flex1 overflow-hidden q-pa-lg bg-cyan q-mt-md rounded-borders column overflow-hidden"
          >
            <div class="row items-center">
              <q-btn
                round
                icon="mdi-cloud-download-outline"
                color="grey-10"
                class="text-white"
              />
              <div class="q-ml-md">
                <div class="text-subtitle1 text-white">本周使用统计图</div>
                <div class="text-grey-3">2021/12/01 - 2021/12/07</div>
              </div>
            </div>
            <div
              class="flex1 overflow-hidden row no-wrap justify-between items-center"
            >
              <div class="text-h6 text-white">35487</div>
              <div class="full-height" style="width: 60%">
                <my-echarts cid="ops3" :options="ops3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-mt-md overflow-hidden">
      <div class="row no-wrap justify-between full-width overflow-hidden">
        <div
          class="bg-white rounded-borders flex1 overflow-hidden row shadow-1"
        >
          <div class="flex1 overflow-hidden column">
            <div class="q-pa-md">
              <div class="text-subtitle1">XXXXX统计</div>
            </div>
            <div class="flex1 relative-position overflow-hidden q-pa-md">
              <div class="text-h5">31560</div>
              <div class="text-grey-5">介绍标题点1...</div>
              <div class="q-gutter-md q-py-md">
                <q-avatar v-ripple v-for="n in 3" :key="n">
                  <img
                    src="http://iph.href.lu/50x50?text=XXX%E7%82%B9&fg=ffffff&bg=2986cc"
                  />
                </q-avatar>
              </div>
              <q-btn no-caps label="查看更多"></q-btn>
            </div>
          </div>

          <q-separator vertical style="background-color: rgb(0 0 0 / 7%)" />
          <div class="flex1 overflow-hidden column justify-center q-pa-md">
            <div>
              <div class="row items-center">
                <q-btn round icon="" />
                <div class="q-pa-md">
                  <div class="text-subtitle1">类1</div>
                  <div class="text-grey-7">25547在线</div>
                </div>
              </div>
              <q-linear-progress
                class="q-mt-sm"
                :value="0.6"
                color="cyan"
                track-color="cyan-2"
              />
            </div>
            <div>
              <div class="row items-center">
                <q-btn round icon="" />
                <div class="q-pa-md">
                  <div class="text-subtitle1">类2</div>
                  <div class="text-grey-7">5547次</div>
                </div>
              </div>
              <q-linear-progress
                class="q-mt-sm"
                :value="0.6"
                color="red-5"
                track-color="red-2"
              />
            </div>
            <div>
              <div class="row items-center">
                <q-btn round icon="" />
                <div class="q-pa-md">
                  <div class="text-subtitle1">类3</div>
                  <div class="text-grey-7">148294录像</div>
                </div>
              </div>
              <q-linear-progress
                class="q-mt-sm"
                :value="0.6"
                color="deep-purple"
                track-color="deep-purple-2"
              />
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-borders overflow-hidden column q-ml-md shadow-1"
          style="width: 38%"
        >
          <div class="q-pa-md">
            <div class="text-subtitle1">本周使用占比图</div>
            <div class="text-grey-7">2021/12/01 - 2021/12/07</div>
          </div>
          <q-separator style="background-color: rgb(0 0 0 / 7%)" />
          <div class="bg-white q-pa-md overflow-hidden" style="height: 280px">
            <my-echarts cid="shgh" :options="ops4"></my-echarts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyEcharts from "components/echarts";
import { shallowReactive } from "vue";

export default {
  components: {
    MyEcharts,
  },
  setup() {
    const products = [
      {
        id: 1,
        number: 1227,
        name: "类1",
        color: "cyan",
        trackColor: "cyan-2",
      },
      {
        id: 2,
        number: 40,
        name: "类2",
        color: "primary",
        trackColor: "blue-2",
      },
      {
        id: 3,
        number: 132,
        name: "类3",
        color: "red-5",
        trackColor: "red-2",
      },
      {
        id: 4,
        number: "70%",
        name: "类4",
        color: "black",
        trackColor: "grey-6",
      },
    ];
    const options = shallowReactive({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "类2",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "类3",
          type: "bar",
          stack: "Ad",
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "类4",
          type: "bar",
          barWidth: 5,
          stack: "Search Engine",
          emphasis: {
            focus: "series",
          },
          data: [620, 732, 701, 734, 1090, 1130, 1120],
        },
      ],
    });
    const ops1 = shallowReactive({
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
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
    const ops2 = shallowReactive({
      backgroundColor: "#7C4DFF",
      confine: true,
      tooltip: {
        trigger: "axis",
        alwaysShowContent: false,
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        splitArea: {
          areaStyle: {
            color: ["#7C4DFF", "#7C4DFF"],
          },
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: { show: false },
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        splitLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          data: [50, 230, 150, 80, 135, 147, 260],
          smooth: true,
          type: "line",
          lineStyle: {
            color: "rgb(250,250,250)",
          },
          itemStyle: {
            show: false,
          },
          emphasis: {
            focus: "none",
            lineStyle: {
              width: 2,
            },
          },
        },
      ],
    });
    const ops3 = shallowReactive({
      backgroundColor: "#00BCD4",
      confine: true,
      tooltip: {
        trigger: "axis",
        alwaysShowContent: false,
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: {
        splitArea: {
          areaStyle: {
            color: ["#00BCD4", "#00BCD4"],
          },
        },
        type: "category",
        axisLine: {
          show: false,
        },
        splitLine: { show: false },
        axisTick: { show: false },
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        splitLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          barWidth: "10%",
          itemStyle: {
            normal: {
              color: "rgb(250,250,250)",
            },
          },
        },
      ],
    });
    const ops4 = shallowReactive({
      tooltip: {
        trigger: "item",
      },
      legend: {
        left: "center",
      },
      series: [
        {
          name: "设备使用",
          type: "pie",
          radius: ["30%", "60%"],
          center: ["50%", "60%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "类1" },
            { value: 735, name: "类2" },
            { value: 580, name: "类3" },
            { value: 484, name: "类4" },
            { value: 300, name: "类5" },
          ],
        },
      ],
    });

    return {
      products,
      options,
      ops1,
      ops2,
      ops3,
      ops4,
    };
  },
};
</script>
