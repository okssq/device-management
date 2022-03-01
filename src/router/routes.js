const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("pages/login"),
  },
  {
    path: "/",
    component: () => import("pages/layout/index.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/01/index.vue"),
        children: [
          {
            path: "/01-01",
            component: () => import("pages/01/01-01/index.vue"),
            meta: {
              crumbs: ["智慧地图", "设备分布"],
            },
          },
          {
            path: "/01-02",
            component: () => import("pages/01/01-02/index.vue"),
            meta: {
              crumbs: ["智慧地图", "项目分布"],
            },
          },
        ],
      },
      {
        path: "",
        component: () => import("pages/02/index.vue"),
        children: [
          {
            path: "/02-01",
            component: () => import("pages/02/02-01/index.vue"),
            meta: {
              crumbs: ["数据中心", "数据大屏"],
            },
          },
          {
            path: "/02-02",
            component: () => import("pages/02/02-02/index.vue"),
            meta: {
              crumbs: ["数据中心", "数据罗盘"],
            },
          },
          {
            path: "/02-03",
            component: () => import("pages/02/02-03/index.vue"),
            meta: {
              crumbs: ["数据中心", "在线分析"],
            },
          },
        ],
      },
      {
        path: "",
        component: () => import("pages/03/index.vue"),
        children: [
          {
            path: "/03-01",
            component: () => import("pages/03/03-01/index.vue"),
            meta: {
              crumbs: ["监管监控", "实时视频"],
            },
          },
          {
            path: "/03-02",
            component: () => import("pages/03/03-02/index.vue"),
            meta: {
              crumbs: ["监管监控", "历史回放"],
            },
          },
        ],
      },
      {
        path: "",
        component: () => import("pages/04/index.vue"),
        children: [
          {
            path: "/04-01",
            component: () => import("pages/04/04-01/index.vue"),
            children: [
              {
                path: "/04-01-01",
                component: () => import("pages/04/04-01/04-01-01"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "大屏"],
                },
              },
              {
                path: "/04-01-02",
                component: () => import("pages/04/04-01/04-01-02"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "瓶子回收"],
                },
              },
              {
                path: "/04-01-03",
                component: () => import("pages/04/04-01/04-01-03"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "储物柜"],
                },
              },
              {
                path: "/04-01-04",
                component: () => import("pages/04/04-01/04-01-04"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "座椅"],
                },
              },
              {
                path: "/04-01-05",
                component: () => import("pages/04/04-01/04-01-05"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "未注册设备"],
                },
              },
              {
                path: "/04-01-06",
                component: () => import("pages/04/04-01/04-01-06"),
                meta: {
                  crumbs: ["信息管理", "设备信息", "广告资源配置"],
                },
              },
            ],
          },
          {
            path: "/04-02",
            component: () => import("pages/04/04-02/index.vue"),
            meta: {
              crumbs: ["信息管理", "项目信息"],
            },
          },
          {
            path: "/04-03",
            component: () => import("pages/04/04-03/index.vue"),
            meta: {
              crumbs: ["信息管理", "公司信息"],
            },
          },
        ],
      },
      {
        path: "",
        component: () => import("pages/05/index.vue"),
        children: [
          {
            path: "/05-01",
            component: () => import("pages/05/05-01/index.vue"),
            meta: {
              crumbs: ["系统服务", "用户中心"],
            },
          },
          {
            path: "/05-02",
            component: () => import("pages/05/05-02/index.vue"),
            meta: {
              crumbs: ["系统服务", "角色中心"],
            },
          },
          {
            path: "/05-03",
            component: () => import("pages/05/05-03/index.vue"),
            children: [
              {
                path: "/05-03-01",
                component: () => import("pages/05/05-03/05-03-01"),
                meta: {
                  crumbs: ["系统服务", "日志中心", "登录日志"],
                },
              },
              {
                path: "/05-03-02",
                component: () => import("pages/05/05-03/05-03-02"),
                meta: {
                  crumbs: ["系统服务", "日志中心", "操作日志"],
                },
              },
              {
                path: "/05-03-03",
                component: () => import("pages/05/05-03/05-03-03"),
                meta: {
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
