<template>
  <q-scroll-area
    style="height: 100%"
    class="my-side q-py-sm shadow-4"
    :style="{ width: NAV_ISMINI ? '56PX' : '260PX' }"
  >
    <q-list
      padding
      :separator="false"
      class="q-mr-md expand-nav"
      v-show="!NAV_ISMINI"
    >
      <nav-expand-item
        v-for="item in navs"
        :key="item.id"
        :nav="item"
        :level="0"
      />
    </q-list>
    <q-list :separator="false" v-show="NAV_ISMINI" class="popup-nav">
      <nav-popup-item
        v-for="item in navs"
        :key="item.id"
        :nav="item"
        :level="0"
      />
    </q-list>
  </q-scroll-area>
</template>

<script>
import NavExpandItem from "./nav-expand-item.vue";
import NavPopupItem from "./nav-popup-item.vue";

import { inject } from "@vue/runtime-core";
export default {
  components: { NavExpandItem, NavPopupItem },
  setup() {
    const NAV_ISMINI = inject("NAV_ISMINI");
    const navs = [
      {
        id: "01",
        label: "智慧地图",
        icon: "public",
        children: [
          {
            id: "01-01",
            label: "设备分布",
            path: "/01-01",
          },
        ],
      },
      {
        id: "02",
        label: "数据中心",
        icon: "analytics",
        children: [
          {
            id: "02-01",
            label: "数据大屏",
            path: "/02-01",
          },
          {
            id: "02-02",
            label: "数据罗盘",
            path: "/02-02",
          },
          {
            id: "02-03",
            label: "在线分析",
            path: "/02-03",
          },
        ],
      },

      {
        id: "03",
        label: "监管监控",
        icon: "ondemand_video",
        children: [
          {
            id: "03-01",
            label: "实时监控",
            path: "/03-01",
          },
          {
            id: "03-02",
            label: "历史回放",
            path: "/03-02",
          },
        ],
      },
      {
        id: "04",
        label: "信息管理",
        icon: "privacy_tip",
        children: [
          {
            id: "04-01",
            label: "设备信息",
            icon: "terminal",
            path: "/04-01",
          },
          {
            id: "04-02",
            label: "项目信息",
            path: "/04-02",
          },
        ],
      },
      {
        id: "05",
        label: "系统服务",
        icon: "settings_suggest",
        children: [
          {
            id: "05-01",
            label: "用户中心",
            path: "/05-01",
          },
          {
            id: "05-02",
            label: "角色中心",
            path: "/05-02",
          },
          {
            id: "05-03",
            label: "日志中心",
            icon: "branding_watermark",
            children: [
              {
                id: "05-03-01",
                label: "平台使用日志",
                path: "/05-03-01",
              },
              {
                id: "05-03-02",
                label: "设备日志",
                path: "/05-03-02",
              },
              {
                id: "05-03-03",
                label: "系统日志",
                path: "/05-03-03",
              },
            ],
          },
        ],
      },
    ];
    return {
      NAV_ISMINI,
      navs,
    };
  },
};
</script>
<style scoped>
.my-side {
  z-index: 12;
}
</style>
