export const treeNodes = [
  {
    count: 10,
    id: "1",
    index: 0,
    label: "上海蚁探智能科技有限公司",
    offlineCount: 5,
    onlineCount: 5,
    type: 1,
    children: [
      {
        count: 3,
        id: "2",
        index: "0-0",
        label: "项目一",
        offlineCount: 1,
        onlineCount: 2,
        type: 2,
        children: [
          {
            id: "111",
            index: "0-0-0",
            label: "111",
            status: "1",
            type: 3,
          },
          {
            id: "112",
            index: "0-0-1",
            label: "112",
            status: "1",
            type: 3,
          },
          {
            id: "113",
            index: "0-0-2",
            label: "113",
            status: "0",
            type: 3,
          },
        ],
      },
      {
        count: 3,
        id: "3",
        index: "0-1",
        label: "项目二",
        offlineCount: 2,
        onlineCount: 1,
        type: 2,
        children: [
          {
            id: "211",
            index: "0-1-0",
            label: "211",
            status: "1",
            type: 3,
          },
          {
            id: "212",
            index: "0-1-1",
            label: "212",
            status: "0",
            type: 3,
          },
          {
            id: "213",
            index: "0-1-2",
            label: "213",
            status: "0",
            type: 3,
          },
        ],
      },
      {
        count: 4,
        id: "4",
        index: "0-2",
        label: "项目三",
        offlineCount: 2,
        onlineCount: 2,
        type: 2,
        children: [
          {
            id: "311",
            index: "0-2-0",
            label: "311",
            status: "1",
            type: 3,
          },
          {
            id: "312",
            index: "0-2-1",
            label: "312",
            status: "0",
            type: 3,
          },
          {
            id: "313",
            index: "0-2-2",
            label: "313",
            status: "0",
            type: 3,
          },
          {
            id: "314",
            index: "0-2-3",
            label: "314",
            status: "1",
            type: 3,
          },
        ],
      },
    ],
  },
];
export const vList = [
  {
    id: "111",
    label: "111",
    status: "1",
    index: "0-0-0",
    gps: [121.515132, 31.283085],
    tmlType: 1,
    address:
      "上海市杨浦区控江路街道同济大学出国培训学院同飞楼同济大学彰武路校区",
    info: "ACC开;定位;运营状态;",
  },
  {
    id: "112",
    label: "121",
    status: "1",
    index: "0-0-1",
    gps: [121.21086, 31.242727],
    tmlType: 2,
    address: "上海市青浦区华新镇新协路1688号",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "113",
    label: "113",
    status: "0",
    index: "0-0-2",
    gps: [121.372774, 31.001971],
    tmlType: 3,
    address: "上海市闵行区江川路街道昆阳路水生园",
    info: "ACC开;定位;运营状态;",
  },

  {
    id: "211",
    label: "211",
    status: "1",
    index: "0-1-0",
    gps: [121.486391, 30.872571],
    tmlType: 1,
    address: "上海市奉贤区柘林镇平林路",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "212",
    label: "212",
    status: "0",
    index: "0-1-1",
    gps: [121.497832, 30.842105],
    tmlType: 2,
    address: "上海市奉贤区柘林镇南华亭东路",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "213",
    label: "213",
    status: "0",
    index: "0-1-2",
    gps: [121.524029, 30.846092],
    tmlType: 3,
    address: "上海市奉贤区海湾镇信奇路",
    info: "ACC关;定位;运营状态;",
  },

  {
    id: "311",
    label: "311",
    status: "1",
    index: "0-2-0",
    gps: [121.115251, 31.185237],
    tmlType: 4,
    address: "上海市青浦区香花桥街道久业路338号亚士创能五厂",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "312",
    label: "312",
    status: "0",
    index: "0-2-1",
    gps: [121.063967, 31.185595],
    tmlType: 4,
    address: "江苏省苏州市昆山市淀山湖镇普洛斯淀山湖物流园一期",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "313",
    label: "313",
    status: "0",
    index: "0-2-2",
    gps: [121.051278, 31.206714],
    tmlType: 4,
    address: "江苏省苏州市昆山市千灯镇522乡道",
    info: "ACC关;定位;运营状态;",
  },
  {
    id: "314",
    label: "314",
    status: "1",
    index: "0-2-3",
    gps: [121.022643, 31.262527],
    tmlType: 4,
    address: "江苏省苏州市昆山市千灯镇圣祥东路37号",
    info: "ACC关;定位;运营状态;",
  },
];

export const vObj = {
  111: { index: "0-0-0", label: "111", status: "1" },
  112: { index: "0-0-1", label: "112", status: "1" },
  113: { index: "0-0-2", label: "113", status: "0" },

  211: { index: "0-1-0", label: "211", status: "1" },
  212: { index: "0-1-1", label: "212", status: "0" },
  213: { index: "0-1-2", label: "213", status: "0" },

  311: { index: "0-2-0", label: "311", status: "1" },
  312: { index: "0-2-1", label: "312", status: "0" },
  313: { index: "0-2-2", label: "313", status: "0" },
  314: { index: "0-2-2", label: "314", status: "1" },
};
export const beforeClick = (treeId, treeNode) => treeNode.type == 3;
export const nodeClass = (treeId, treeNode) => {
  const { type } = treeNode;
  if (type != 3) {
    return {
      add: ["text-subtitle2"],
    };
  } else {
    const status = treeNode["status"];
    if (status == "0") {
      return {
        add: ["text-subtitle2", "text-grey-6"],
        remove: ["text-subtitle2", "text-green-7"],
      };
    } else {
      return {
        add: ["text-subtitle2", "text-green-7"],
        remove: ["text-subtitle2", "text-grey-6"],
      };
    }
  }
};
