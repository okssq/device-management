import { h, resolveComponent } from "vue";

const renderRouterView = () => h(resolveComponent("router-view"));

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/login"),
  },
  {
    path: "/",
    redirect: "/map/terminal",
    component: () => import("pages/layout"),
    children: [
      {
        path: "map",
        component: { render: renderRouterView },
        children: [
          {
            path: "terminal",
            component: () => import("pages/module-map/terminal"),
            meta: {
              routerKeys: ["01", "01-01"],
              crumbs: ["智慧地图", "设备分布"],
            },
          },
          {
            path: "project",
            component: () => import("pages/module-map/project"),
            meta: {
              routerKeys: ["01", "01-02"],
              crumbs: ["智慧地图", "项目分布"],
            },
          },
        ],
      },
      {
        path: "data",
        component: { render: renderRouterView },
        children: [
          {
            path: "screen",
            component: () => import("pages/module-data/screen"),
            meta: {
              routerKeys: ["02", "02-01"],
              crumbs: ["数据中心", "数据大屏"],
            },
          },
          {
            path: "dashboard",
            component: () => import("pages/module-data/dashboard"),
            meta: {
              routerKeys: ["02", "02-02"],
              crumbs: ["数据中心", "数据罗盘"],
            },
          },
          {
            path: "analyze",
            component: () => import("pages/module-data/analyze"),
            meta: {
              routerKeys: ["02", "02-03"],
              crumbs: ["数据中心", "在线分析"],
            },
          },
        ],
      },
      {
        path: "video",
        component: { render: renderRouterView },
        children: [
          {
            path: "live",
            component: () => import("pages/module-video/live"),
            meta: {
              routerKeys: ["03", "03-01"],
              crumbs: ["监管监控", "实时监控"],
            },
          },
          {
            path: "history",
            component: () => import("pages/module-video/history"),
            meta: {
              routerKeys: ["03", "03-02"],
              crumbs: ["监管监控", "历史回放"],
            },
          },
        ],
      },
      {
        path: "terminal",
        component: { render: renderRouterView },
        children: [
          {
            path: "seat",
            component: () => import("pages/module-terminal/seat"),
            meta: {
              routerKeys: ["04", "04-01"],
              crumbs: ["设备管理", "智能座椅"],
            },
          },
          {
            path: "recycle",
            component: () => import("pages/module-terminal/recycle"),
            meta: {
              routerKeys: ["04", "04-02"],
              crumbs: ["设备管理", "智能瓶类回收器"],
            },
          },
          {
            path: "locker",
            component: () => import("pages/module-terminal/locker"),
            meta: {
              routerKeys: ["04", "04-03"],
              crumbs: ["设备管理", "智能储物柜"],
            },
          },
          {
            path: "screen",
            component: () => import("pages/module-terminal/screen"),
            meta: {
              routerKeys: ["04", "04-04"],
              crumbs: ["设备管理", "智能大屏"],
            },
          },
          {
            path: "unbind",
            component: () => import("pages/module-terminal/unbind"),
            meta: {
              routerKeys: ["04", "04-05"],
              crumbs: ["设备管理", "未注册设备"],
            },
          },
          {
            path: "adconfig",
            component: () => import("pages/module-terminal/ad-config"),
            meta: {
              routerKeys: ["04", "04-06"],
              crumbs: ["设备管理", "广告资源配置"],
            },
          },
          {
            path: "adconfig/template/:templateId",
            props: true,
            component: () => import("pages/module-terminal/ad-config/template"),
            meta: {
              routerKeys: ["04", "04-06"],
              crumbs: ["设备管理", "广告资源配置", "自定义样式"],
            },
          },
        ],
      },
      {
        path: "info",
        component: { render: renderRouterView },
        children: [
          {
            path: "project",
            component: () => import("pages/module-info/project"),
            meta: {
              routerKeys: ["05", "05-01"],
              crumbs: ["信息管理", "项目信息"],
            },
          },
          {
            path: "company",
            component: () => import("pages/module-info/company"),
            meta: {
              routerKeys: ["05", "05-02"],
              crumbs: ["信息管理", "公司信息"],
            },
          },
        ],
      },
      {
        path: "sys",
        component: { render: renderRouterView },
        children: [
          {
            path: "user",
            component: () => import("pages/module-system/user"),
            meta: {
              routerKeys: ["06", "06-01"],
              crumbs: ["系统服务", "用户中心"],
            },
          },
          {
            path: "role",
            component: () => import("pages/module-system/role"),
            meta: {
              routerKeys: ["06", "06-02"],
              crumbs: ["系统服务", "角色中心"],
            },
          },
          {
            path: "log",
            component: { render: renderRouterView },
            children: [
              {
                path: "login",
                component: () => import("pages/module-system/module-log/login"),
                meta: {
                  routerKeys: ["06", "06-03", "06-03-01"],
                  crumbs: ["系统服务", "日志中心", "登录日志"],
                },
              },
              {
                path: "action",
                component: () =>
                  import("pages/module-system/module-log/action"),
                meta: {
                  routerKeys: ["06", "06-03", "06-03-02"],
                  crumbs: ["系统服务", "日志中心", "操作日志"],
                },
              },
              {
                path: "order",
                component: () => import("pages/module-system/module-log/order"),
                meta: {
                  routerKeys: ["06", "06-03", "06-03-03"],
                  crumbs: ["系统服务", "日志中心", "命令日志"],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("pages/error/404.vue"),
  },
];

export default routes;
