<template>
  <div class="full-height shadow-2 column no-wrap" :style="layoutSideStyle">
    <q-scroll-area class="flex1 q-py-sm">
      <q-list class="q-mr-sm expand-nav" v-show="!isMiniNav">
        <nav-expand-item
          :router-keys="routerKeys"
          v-for="item in navs"
          :key="item.id"
          :nav="item"
        />
      </q-list>
      <q-list :separator="false" class="popup-nav" v-show="isMiniNav">
        <nav-popup-item
          :router-keys="routerKeys"
          v-for="item in navs"
          :key="item.id"
          :nav="item"
        />
      </q-list>
    </q-scroll-area>
    <q-separator/>
    <q-btn
      flat
      color="primary"
      style="height: 48px"
      :icon="toggleBtnIcon"
      @click="isMiniNav = !isMiniNav"
    />
    <q-separator/>
  </div>
</template>

<script>
import NavExpandItem from "./nav-expand-item.vue";
import NavPopupItem from "./nav-popup-item.vue";

import {ref, computed} from "vue";
import {useRoute} from "vue-router";

export default {
  components: {
    NavExpandItem,
    NavPopupItem
  },
  setup() {
    const route = useRoute();
    const isMiniNav = ref(false)
    const layoutSideStyle = computed(() => {
      return {width: isMiniNav.value ? '56px' : '230px'}
    })
    const toggleBtnIcon = computed(() => {
      return isMiniNav.value ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'
    })
    const routerKeys = computed(() => route.meta['routerKeys'] || []);
    const navs = [
      {
        id: "01",
        label: "智慧地图",
        icon: "o_public",
        children: [
          {
            id: "01-01",
            label: "设备分布",
            path: "/map/terminal",
          },
          {
            id: "01-02",
            label: "项目分布",
            path: "/map/project",
          },
        ],
      },
      {
        id: "02",
        label: "数据中心",
        icon: "o_leaderboard",
        children: [
          {
            id: "02-01",
            label: "数据大屏",
            path: "/data/screen",
          },
          {
            id: "02-02",
            label: "数据罗盘",
            path: "/data/dashboard",
          },
          {
            id: "02-03",
            label: "在线分析",
            path: "/data/analyze",
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
            path: "/video/live",
          },
          {
            id: "03-02",
            label: "历史回放",
            path: "/video/history",
          },
        ],
      },
      {
        id: '04',
        label: "设备管理",
        icon: "developer_board",
        children: [
          {
            id: '04-01',
            label: '智能座椅',
            path: '/terminal/seat',
          },
          {
            id: '04-02',
            label: '智能瓶类回收器',
            path: '/terminal/recycle',
          },
          {
            id: '04-03',
            label: '智能储物柜',
            path: '/terminal/locker',
          },
          {
            id: '04-04',
            label: '智能大屏',
            path: '/terminal/screen',
          },
          {
            id: '04-05',
            label: '未注册设备',
            path: '/terminal/unbind',
          },
          {
            id: '04-06',
            label: '广告资源配置',
            path: '/terminal/adconfig',
          },
        ]
      },
      {
        id: "05",
        label: "信息管理",
        icon: "o_summarize",
        children: [
          {
            id: "05-01",
            label: "项目信息",
            path: "/info/project",
          },
          {
            id: "05-02",
            label: "公司信息",
            path: "/info/company",
          },
        ],
      },
      {
        id: "06",
        label: "系统服务",
        icon: "o_widgets",
        children: [
          {
            id: "06-01",
            label: "用户中心",
            path: "/sys/user",
          },
          {
            id: "06-02",
            label: "角色中心",
            path: "/sys/role",
          },
          {
            id: "06-03",
            label: "日志中心",
            children: [
              {
                id: "06-03-01",
                label: "登录日志",
                path: "/sys/log/login",
              },
              {
                id: "06-03-02",
                label: "操作日志",
                path: "/sys/log/action",
              },
              {
                id: "06-03-03",
                label: "命令日志",
                path: "/sys/log/order",
              },
            ],
          },
        ],
      },
    ];
    return {
      isMiniNav,
      layoutSideStyle,
      toggleBtnIcon,

      navs,
      routerKeys,
    };
  },
};
</script>
