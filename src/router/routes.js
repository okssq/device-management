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
    component: () => import("pages/layout"),
    children: [
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/map/terminal",
            component: () => import("pages/module-map/terminal"),
            meta: {
              routerKeys: ["01", "01-01"],
              crumbs: ["智慧地图", "设备分布"],
            },
          },
          {
            path: "/map/project",
            component: () => import("pages/module-map/project"),
            meta: {
              routerKeys: ["01", "01-02"],
              crumbs: ["智慧地图", "项目分布"],
            },
          },
        ],
      },
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/data/screen",
            component: () => import("pages/module-data/screen"),
            meta: {
              routerKeys: ["02", "02-01"],
              crumbs: ["数据中心", "数据大屏"],
            },
          },
          {
            path: "/data/dashboard",
            component: () => import("pages/module-data/dashboard"),
            meta: {
              routerKeys: ["02", "02-02"],
              crumbs: ["数据中心", "数据罗盘"],
            },
          },
          {
            path: "/data/analyze",
            component: () => import("pages/module-data/analyze"),
            meta: {
              routerKeys: ["02", "02-03"],
              crumbs: ["数据中心", "在线分析"],
            },
          },
        ],
      },
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/video/live",
            component: () => import("pages/module-video/live"),
            meta: {
              routerKeys: ["03", "03-01"],
              crumbs: ["监管监控", "实时监控"],
            },
          },
          {
            path: "/video/history",
            component: () => import("pages/module-video/history"),
            meta: {
              routerKeys: ["03", "03-02"],
              crumbs: ["监管监控", "历史回放"],
            },
          },
        ],
      },
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/terminal/seat",
            component: () => import("pages/module-terminal/seat"),
            meta: {
              routerKeys: ["04", "04-01"],
              crumbs: ["设备管理", "智能座椅"],
            },
          },
          {
            path: "/terminal/recycle",
            component: () => import("pages/module-terminal/recycle"),
            meta: {
              routerKeys: ["04", "04-02"],
              crumbs: ["设备管理", "智能瓶类回收器"],
            },
          },
          {
            path: "/terminal/locker",
            component: () => import("pages/module-terminal/locker"),
            meta: {
              routerKeys: ["04", "04-03"],
              crumbs: ["设备管理", "智能储物柜"],
            },
          },
          {
            path: "/terminal/screen",
            component: () => import("pages/module-terminal/screen"),
            meta: {
              routerKeys: ["04", "04-04"],
              crumbs: ["设备管理", "智能大屏"],
            },
          },
          {
            path: "/terminal/unbind",
            component: () => import("pages/module-terminal/unbind"),
            meta: {
              routerKeys: ["04", "04-05"],
              crumbs: ["设备管理", "未注册设备"],
            },
          },
          {
            path: "/terminal/adconfig",
            component: () => import("pages/module-terminal/ad-config"),
            meta: {
              routerKeys: ["04", "04-06"],
              crumbs: ["设备管理", "广告资源配置"],
            },
          },
          {
            name: "template-locker",
            path: "/template/locker",
            component: () =>
              import("pages/module-terminal/ad-config/template/locker"),
            meta: {
              routerKeys: ["04", "04-06"],
              crumbs: ["设备管理", "广告资源配置", "智能桌椅自定义样式配置"],
            },
          },
        ],
      },
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/info/project",
            component: () => import("pages/module-info/project"),
            meta: {
              routerKeys: ["05", "05-01"],
              crumbs: ["信息管理", "项目信息"],
            },
          },
          {
            path: "/info/company",
            component: () => import("pages/module-info/company"),
            meta: {
              routerKeys: ["05", "05-02"],
              crumbs: ["信息管理", "公司信息"],
            },
          },
        ],
      },
      {
        path: "",
        component: { render: renderRouterView },
        children: [
          {
            path: "/sys/user",
            component: () => import("pages/module-system/user"),
            meta: {
              routerKeys: ["06", "06-01"],
              crumbs: ["系统服务", "用户中心"],
            },
          },
          {
            path: "/sys/role",
            component: () => import("pages/module-system/role"),
            meta: {
              routerKeys: ["06", "06-02"],
              crumbs: ["系统服务", "角色中心"],
            },
          },
          {
            path: "",
            component: { render: renderRouterView },
            children: [
              {
                path: "/sys/log/login",
                component: () => import("pages/module-system/module-log/login"),
                meta: {
                  routerKeys: ["06", "06-03", "06-03-01"],
                  crumbs: ["系统服务", "日志中心", "登录日志"],
                },
              },
              {
                path: "/sys/log/action",
                component: () =>
                  import("pages/module-system/module-log/action"),
                meta: {
                  routerKeys: ["06", "06-03", "06-03-02"],
                  crumbs: ["系统服务", "日志中心", "操作日志"],
                },
              },
              {
                path: "/sys/log/order",
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
];

export default routes;
