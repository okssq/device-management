import router from "src/router";
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

export const fn3001 = () => {
  notifyWarn("当前为未登录状态");
  localStorage.removeItem("userInfo");
  localStorage.removeItem("loginInfo");
  router.push("/login");
};
