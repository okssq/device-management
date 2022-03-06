<template>
  <teleport to="body">
    <div class="fixed fullscreen bg overflow-hidden column no-wrap">
      <div
        class="top relative-position row no-wrap justify-between items-center"
      >
        <div class="text-subtitle2 text-white">{{ nowTime }}</div>
        <div class="absolute-center text-bold text-h6 text-center title">
          智慧设备管控平台数据监控
        </div>
        <q-btn to="/data/dashboard" dense flat round color="white" icon="logout"></q-btn>
      </div>
      <div class="flex1 q-py-sm overflow-hidden row justify-between no-wrap">
        <div class="p25">
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div
              class="b1-main row no-wrap items-center overflow-hidden text-white"
            >
              <div
                class="column items-center justify-around flex1 overflow-hidden"
              >
                <q-circular-progress
                  show-value
                  font-size="12px"
                  :value="33"
                  size="50px"
                  :thickness="0.22"
                  color="green"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  33%
                </q-circular-progress>
                <div class="text-grey-2 text-caption">简介1</div>
              </div>
              <div
                class="column items-center justify-around flex1 overflow-hidden"
              >
                <q-circular-progress
                  show-value
                  font-size="12px"
                  :value="76"
                  size="50px"
                  :thickness="0.22"
                  color="light-blue-8"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  76%
                </q-circular-progress>
                <div class="text-grey-2 text-caption">简介2</div>
              </div>
              <div
                class="column items-center justify-around flex1 overflow-hidden"
              >
                <q-circular-progress
                  show-value
                  font-size="12px"
                  :value="100"
                  size="50px"
                  :thickness="0.22"
                  color="amber"
                  track-color="grey-4"
                  class="q-ma-md"
                >
                  100%
                </q-circular-progress>
                <div class="text-grey-2 text-caption">简介3</div>
              </div>
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <simple-table :columns="columns1" :rows="rows1" />
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <simple-table :columns="columns1" :rows="rows1" />
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main column no-wrap justify-around">
              <div class="row no-wrap overflow-hidden items-center l1">
                <label class="q-mr-sm text-caption">标题一</label>
                <q-linear-progress
                  class="flex1"
                  size="14px"
                  :value="0.3"
                  color="red"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge color="white" text-color="red" label="完成率30%" />
                  </div>
                </q-linear-progress>
              </div>
              <div class="row no-wrap overflow-hidden items-center l1">
                <label class="q-mr-sm text-caption">标题一</label>
                <q-linear-progress
                  class="flex1"
                  size="14px"
                  :value="0.6"
                  color="lime"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      dense
                      color="white"
                      text-color="lime"
                      label="完成率60%"
                    />
                  </div>
                </q-linear-progress>
              </div>
              <div class="row no-wrap overflow-hidden items-center l1">
                <label class="q-mr-sm text-caption">标题一</label>
                <q-linear-progress
                  class="flex1"
                  size="14px"
                  :value="0.5"
                  color="primary"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="primary"
                      label="完成率50%"
                    />
                  </div>
                </q-linear-progress>
              </div>
              <div class="row no-wrap overflow-hidden items-center l1">
                <label class="q-mr-sm text-caption">标题一</label>
                <q-linear-progress
                  class="flex1"
                  size="14px"
                  :value="0.8"
                  color="accent"
                >
                  <div class="absolute-full flex flex-center">
                    <q-badge
                      color="white"
                      text-color="accent"
                      label="完成率80%"
                    />
                  </div>
                </q-linear-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="p50">
          <div class="d1 column no-wrap overflow-hidden justify-around">
            <div class="row justify-around items-center">
              <div class="p1 ellipsis text-center">年度累计使用人数</div>
              <div class="row items-baseline num-list">
                <div class="num">0</div>
                <div class="num">0</div>
                <span>,</span>
                <div class="num">2</div>
                <div class="num">3</div>
                <div class="num">0</div>
                <span>,</span>
                <div class="num">0</div>
                <div class="num">8</div>
                <div class="num">6</div>
                <span>人</span>
              </div>
            </div>
            <div class="row">
              <div class="flex1 box2">
                <div class="b2-title">标题一</div>
                <div class="b2-num">122</div>
              </div>

              <div class="flex1 box2">
                <div class="b2-title">标题二</div>
                <div class="b2-num">122</div>
              </div>
              <div class="flex1 box2">
                <div class="b2-title">标题三</div>
                <div class="b2-num">122</div>
              </div>
              <div class="flex1 box2">
                <div class="b2-title">标题四</div>
                <div class="b2-num">122</div>
              </div>
            </div>
          </div>
          <div class="d2"></div>
          <div class="d1 row no-wrap overflow-hidden">
            <div class="flex1 box1">
              <div class="b1-title">表头</div>
              <div class="b1-main">
                <my-echarts cid="ops4" :options="ops3" />
              </div>
            </div>
            <div class="flex1 box1" style="margin-left: 20px">
              <div class="b1-title">表头</div>
              <div class="b1-main">
                <my-echarts cid="ops5" :options="ops3" />
              </div>
            </div>
          </div>
        </div>
        <div class="p25">
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <my-echarts cid="ops2" :options="ops2" />
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <simple-table :columns="columns1" :rows="rows1" />
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <simple-table :columns="columns1" :rows="rows1" />
            </div>
          </div>
          <div class="flex1 box1">
            <div class="b1-title">表头</div>
            <div class="b1-main">
              <my-echarts cid="shgh" :options="ops4"></my-echarts>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import MyEcharts from "components/echarts";
import simpleTable from "./table.vue";
import { onBeforeUnmount, ref, shallowReactive } from "vue";

export default {
  components: {
    MyEcharts,
    simpleTable,
  },
  setup() {
    let timer;
    const nowTime = ref("");
    const columns1 = ["XX课程", "表头2", "表头3", "表头4"];
    const rows1 = [
      ["数据内容1", "数据内容2", "数据内容3", "数据内容4"],
      ["数据内容1", "数据内容2", "数据内容3", "数据内容4"],
      ["数据内容1", "数据内容2", "数据内容3", "数据内容4"],
      ["数据内容1", "数据内容2", "数据内容3", "数据内容4"],
    ];
    // 右上角图表配置
    const ops2 = shallowReactive({
      // backgroundColor: '#7C4DFF',
      confine: true,
      tooltip: {
        trigger: "axis",
        alwaysShowContent: false,
      },
      grid: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 5,
      },
      xAxis: {
        splitArea: {
          areaStyle: {
            color: ["transparent", "transparent"],
          },
        },
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: { show: false },
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
      yAxis: {
        splitArea: {
          areaStyle: {
            color: ["transparent", "transparent"],
          },
        },
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
    // 右下角图表配置
    const ops4 = shallowReactive({
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        right: 20,
        top: 20,
        bottom: 20,
        orient: "vertical",
      },
      series: [
        {
          name: "使用比率",
          type: "pie",
          radius: ["30%", "60%"],
          center: ["20%", "50%"],
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
          ],
        },
      ],
    });
    const ops3 = shallowReactive({
      // backgroundColor: '#00BCD4',
      confine: true,
      tooltip: {
        trigger: "axis",
        alwaysShowContent: false,
      },
      grid: {
        top: 20,
        left: 0,
        right: 0,
        bottom: 5,
      },
      xAxis: {
        splitArea: {
          areaStyle: {
            color: ["transparent", "transparent"],
          },
        },
        type: "category",
        axisLine: {
          show: false,
        },
        splitLine: { show: false },
        axisTick: { show: false },
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        splitArea: {
          areaStyle: {
            color: ["transparent", "transparent"],
          },
        },
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
    const timeFormat = () => {
      const timeStamp = new Date();
      const year = new Date(timeStamp).getFullYear();
      const month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      const date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      const hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      const mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      const ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      nowTime.value =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    };
    const setTime = () => {
      timeFormat();
      timer = setInterval(() => {
        timeFormat();
      }, 1000);
    };

    setTime();
    onBeforeUnmount(() => {
      timer = 0;
      clearInterval(timer);
    });
    return {
      nowTime,
      columns1,
      rows1,
      ops2,
      ops4,
      ops3,
    };
  },
};
</script>

<style scoped>
.bg {
  background-color: #fff;
  background-image: url("./page-bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 2.08vw;
}

.top {
  height: 7.407vh;
}

.title {
  color: #deebf3;
}

.p25,
.p50 {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  justify-content: space-between;
}

.p25 {
  width: 25%;
}

.p50 {
  flex: 1;
  margin: 0 20px;
}

.p25 > .flex1 + .flex1 {
  margin-top: 20px;
}

.box1 {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./box1.png");
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;
  padding: 0 1.3vw 1vh;
}

.b1-title {
  width: 100%;
  height: 3.8vh;
  line-height: 3.8vh;
  font-size: 0.8333vw;
  color: #f1f2f3;
  text-align: center;
}

.b1-main {
  flex: 1;
  overflow: hidden;
  width: 100%;
}

.d1 {
  height: calc((100% - 60px) / 4);
}

.d1 ~ .d2,
.d2 ~ .d1 {
  margin-top: 20px;
}

.d2 {
  flex: 1;
  overflow: hidden;
  border: 1px solid rgb(0, 103, 168);
  background-image: url("./map.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.box2 {
  height: 10.4629vh;
  background-image: url("./p2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
}

.b2-title {
  color: #1dceff;
  font-size: 0.729vw;
}

.b2-num {
  color: #ffffff;
  font-size: 1.25vw;
  margin-top: 0.8vh;
}

.p1 {
  width: 11.6667vw;
  height: 5.5556vh;
  background-image: url("./p1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-right: 1vw;
  font-size: 1.04vw;
  line-height: 5.5556vh;
  color: #1dceff;
}
.num-list {
  color: #1dceff;
  text-align: center;
  font-size: 2.5vw;
}
.num {
  width: 2.9167vw;
  height: 6.1vh;
  border: 1px solid rgb(0, 175, 207);
  margin: 0 0.2vw;
  line-height: 6.1vh;
}

.l1 > label {
  color: #1dceff;
  font-size: 0.729vw;
}
</style>
