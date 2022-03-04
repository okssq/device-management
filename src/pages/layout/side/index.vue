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
    const isMiniNav = ref(false)
    const layoutSideStyle = computed(() => {
      return {width: isMiniNav.value ? '56px' : '230px'}
    })
    const toggleBtnIcon = computed(() => {
      return isMiniNav.value ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'
    })

    const route = useRoute();
    const routerKeys = computed(() => {
      const str = route.path.substring(1);
      const length = str.split("-").length;
      const arr = [];
      for (let i = 0; i < length; i++) {
        if (i === 0) {
          arr.push(str.substring(0, 2));
        } else if (i === length - 1) {
          arr.push(str.substring(0));
        } else {
          arr.push(str.substring(0, 2 * (i + 1) + 2 * i - 1));
        }
      }
      return arr;
    });
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
          {
            id: "01-02",
            label: "项目分布",
            path: "/01-02",
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
            children: [
              {
                id: "04-01-01",
                label: "大屏",
                path: "/04-01-01",
              },
              {
                id: "04-01-02",
                label: "瓶子回收",
                path: "/04-01-02",
              },
              {
                id: "04-01-03",
                label: "储物柜",
                path: "/04-01-03",
              },
              {
                id: "04-01-04",
                label: "座椅",
                path: "/04-01-04",
              },
              {
                id: "04-01-05",
                label: "未注册设备",
                path: "/04-01-05",
              },
              {
                id: "04-01-06",
                label: "广告资源配置",
                path: "/04-01-06",
              },
            ],
          },
          {
            id: "04-02",
            label: "项目信息",
            path: "/04-02",
          },
          {
            id: "04-03",
            label: "公司信息",
            path: "/04-03",
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
                label: "登录日志",
                path: "/05-03-01",
              },
              {
                id: "05-03-02",
                label: "操作日志",
                path: "/05-03-02",
              },
              {
                id: "05-03-03",
                label: "命令日志",
                path: "/05-03-03",
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
