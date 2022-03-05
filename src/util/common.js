import { Notify } from "quasar";

export const notifyWarn = (message) => {
  Notify.create({
    message,
    icon: "privacy_tip",
    color: "orange-8",
    position: "top",
  });
};

export const notifySuccess = (message) => {
  Notify.create({
    message,
    type: "positive",
    position: "top",
  });
};

export const notifyInfo = (message) => {
  Notify.create({
    message,
    color: "primary",
    position: "top",
  });
};

export const termTypeText = {
  1: "座椅",
  2: "回收",
  3: "储物柜",
  4: "大屏",
}

export const termStatusText = {
  0: "离线",
  1: "在线",
}
