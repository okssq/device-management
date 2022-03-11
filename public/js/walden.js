(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports", "echarts"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("echarts"));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
})(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== "undefined") {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log("ECharts is not Loaded");
    return;
  }
  echarts.registerTheme("walden", {
    color: [
      "#63b2ee",
      "#76da91",
      "#f8cb7f",
      "#f89588",
      "#7cd6cf",
      "#9192ab",
      "#7898e1",
      "#efa666",
      "#eddd86",
      "#9987ce",
      "#63b2ee",
      "#76da91",
    ],
    backgroundColor: "rgba(252,252,252,0)",
    textStyle: {},
    title: {
      textStyle: {
        color: "#666666",
      },
      subtextStyle: {
        color: "#999999",
      },
    },
    line: {
      itemStyle: {
        borderWidth: "2",
      },
      lineStyle: {
        width: "3",
      },
      symbolSize: "8",
      symbol: "emptyRoundRect",
      smooth: false,
    },
    radar: {
      itemStyle: {
        borderWidth: "2",
      },
      lineStyle: {
        width: "3",
      },
      symbolSize: "8",
      symbol: "emptyRoundRect",
      smooth: false,
    },
    bar: {
      itemStyle: {
        barBorderWidth: 0,
        barBorderColor: "#dddddd",
      },
    },
    pie: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    scatter: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    boxplot: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    parallel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    sankey: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    funnel: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    gauge: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
    },
    candlestick: {
      itemStyle: {
        color: "#e6a0d2",
        color0: "transparent",
        borderColor: "#e6a0d2",
        borderColor0: "#3fb1e3",
        borderWidth: "2",
      },
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: "#dddddd",
      },
      lineStyle: {
        width: "1",
        color: "#cccccc",
      },
      symbolSize: "8",
      symbol: "emptyRoundRect",
      smooth: false,
      color: [
        "#63b2ee",
        "#76da91",
        "#f8cb7f",
        "#f89588",
        "#7cd6cf",
        "#9192ab",
        "#7898e1",
        "#efa666",
        "#eddd86",
        "#9987ce",
        "#63b2ee",
        "#76da91",
      ],
      label: {
        color: "#fcfcfc",
      },
    },
    map: {
      itemStyle: {
        normal: {
          areaColor: "#eeeeee",
          borderColor: "#aaaaaa",
          borderWidth: 0.5,
        },
        emphasis: {
          areaColor: "rgba(63,177,227,0.25)",
          borderColor: "#3fb1e3",
          borderWidth: 1,
        },
      },
      label: {
        normal: {
          textStyle: {
            color: "#ffffff",
          },
        },
        emphasis: {
          textStyle: {
            color: "#3fb1e3",
          },
        },
      },
    },
    geo: {
      itemStyle: {
        normal: {
          areaColor: "#eeeeee",
          borderColor: "#aaaaaa",
          borderWidth: 0.5,
        },
        emphasis: {
          areaColor: "rgba(63,177,227,0.25)",
          borderColor: "#3fb1e3",
          borderWidth: 1,
        },
      },
      label: {
        normal: {
          textStyle: {
            color: "#ffffff",
          },
        },
        emphasis: {
          textStyle: {
            color: "#3fb1e3",
          },
        },
      },
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#999999",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#eeeeee"],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#999999",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#eeeeee"],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#999999",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#eeeeee"],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#eeeeee",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#999999",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#eeeeee"],
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: "#999999",
        },
        emphasis: {
          borderColor: "#666666",
        },
      },
    },
    legend: {
      textStyle: {
        color: "#999999",
      },
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#cccccc",
          width: "1",
        },
        crossStyle: {
          color: "#cccccc",
          width: "1",
        },
      },
    },
    timeline: {
      lineStyle: {
        color: "#626c91",
        width: 1,
      },
      itemStyle: {
        normal: {
          color: "#626c91",
          borderWidth: 1,
        },
        emphasis: {
          color: "#626c91",
        },
      },
      controlStyle: {
        normal: {
          color: "#626c91",
          borderColor: "#626c91",
          borderWidth: 0.5,
        },
        emphasis: {
          color: "#626c91",
          borderColor: "#626c91",
          borderWidth: 0.5,
        },
      },
      checkpointStyle: {
        color: "#3fb1e3",
        borderColor: "rgba(63,177,227,0.15)",
      },
      label: {
        normal: {
          textStyle: {
            color: "#626c91",
          },
        },
        emphasis: {
          textStyle: {
            color: "#626c91",
          },
        },
      },
    },
    visualMap: {
      color: ["#2a99c9", "#afe8ff"],
    },
    dataZoom: {
      backgroundColor: "rgba(255,255,255,0)",
      dataBackgroundColor: "rgba(222,222,222,1)",
      fillerColor: "rgba(114,230,212,0.25)",
      handleColor: "#cccccc",
      handleSize: "100%",
      textStyle: {
        color: "#999999",
      },
    },
    markPoint: {
      label: {
        color: "#fcfcfc",
      },
      emphasis: {
        label: {
          color: "#fcfcfc",
        },
      },
    },
  });
});
