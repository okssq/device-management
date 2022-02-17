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
