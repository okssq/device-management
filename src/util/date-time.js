import { date } from "quasar";

const formatObj = (startTime, endTime) => {
  const from = startTime.substring(0, 10);
  const to = endTime.substring(0, 10);
  const fromSuffix = startTime.slice(-8);
  const toSuffix = endTime.slice(-8);
  return { startTime, endTime, from, to, fromSuffix, toSuffix };
};
export const getToday = () => {
  const today = date.buildDate({ seconds: 0, minutes: 0, hours: 0 });
  const todayStr = date.formatDate(today, "YYYY-MM-DD");
  return { today, todayStr };
};
