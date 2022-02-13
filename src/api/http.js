import axios from "axios";
import qs from "qs";
import { notifyWarn, fn3001 } from "src/util/common";
// 当前正在请求的数组集合
const requestArr = [];

// axios实例
const service = axios.create({
  baseURL: "/", // 统一请求前缀
  timeout: 60000, // 超时时间
  responseType: "json", // 返回结果类型
  withCredentials: true,
});
const { CancelToken } = axios;
// 请求拦截
service.interceptors.request.use(
  (config) =>
    Object.assign(config, {
      cancelToken: new CancelToken((cancel) => {
        // console.log('axios-req-config',config)
        const { headers } = config;
        const { notCancel } = headers;
        if (notCancel) return;
        const { url } = config;
        requestArr.push({ cancel, url });
      }),
    }),
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (res) => {
    const { data, config } = res;
    delRequestByUrl(config.url);
    if (data.code === 2000) {
      return Promise.resolve(data.result);
    } else if (data.code === 3001) {
      fn3001();
      return Promise.reject(data);
    } else if (config.responseType === "blob") {
      return Promise.resolve(data.type.includes("excel") ? res : false);
    } else {
      notifyWarn(data && data.msg ? data.msg : "操作失败！");
      return Promise.reject(data);
    }
  },
  (error) => {
    console.log("*** Request Fail *** ", error);
    if (axios.isCancel(error)) {
      console.log("cancel request!");
      return Promise.reject(false);
    }
    const { response } = error;
    if (response) {
      console.log("response", response);
      const { config, status } = response;
      const msg =
        config && config.responseType === "blob"
          ? "导出报表有误，请联系管理员！"
          : `(${status})服务器响应错误！`;
      notifyWarn(msg);
      return Promise.reject(error);
    }
    notifyWarn("请求失败！");
    return Promise.reject(error);
  }
);

export function post(url, allParams = {}, type = "form") {
  let isCancel = false;
  let params = allParams;
  if (!Array.isArray(allParams)) {
    const { notCancel, ...other } = allParams;
    params = other;
    isCancel = notCancel;
  }
  const headers = {
    "Content-Type":
      type === "form"
        ? "application/x-www-form-urlencoded; charset=UTF-8"
        : "application/json; charset=UTF-8",
  };

  const currentParams = type === "form" ? qs.stringify(params) : params;
  isCancel && (headers.notCancel = true);
  return service.post(url, currentParams, { headers });
}

export function get(url, allParams = {}, config) {
  const { notCancel, ...params } = allParams;
  const currentConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    ...config,
  };
  notCancel && (currentConfig.headers.notCancel = true);
  return service.get(url, { params, ...currentConfig });
}

export function exportReport(url, data, type = "form") {
  const contentType =
    type === "form"
      ? "application/x-www-form-urlencoded; charset=UTF-8"
      : "application/json; charset=UTF-8";
  const param = type === "form" ? qs.stringify(data) : data;
  return service
    .post(url, param, {
      headers: {
        "Content-Type": contentType,
        notCancel: true,
      },
      responseType: "blob",
    })
    .then((res) => {
      if (res) {
        const blob = new Blob([res.data]);
        const fileName = window.decodeURI(
          res.headers["content-disposition"].split("=")[1]
        );
        const tagA = document.createElement("a");
        tagA.href = window.URL.createObjectURL(blob); // 创建下载的链接
        tagA.download = fileName; // 下载后文件名
        tagA.style.display = "none";
        document.body.appendChild(tagA);
        tagA.click(); // 点击下载
        window.URL.revokeObjectURL(tagA.href); // 释放掉blob对象
        document.body.removeChild(tagA); // 下载完成移除元素
      } else {
        notifyWarn("导出报表有误，请联系管理员！");
      }
    })
    .finally(() => {
      return Promise.resolve(true);
    });
}

export function delRequestByUrl(url) {
  const index = requestArr.findIndex((item) => item.url === url);
  if (index !== -1) {
    requestArr.splice(index, 1);
  }
}

export function delAllRequest() {
  requestArr.forEach((item) => item.cancel());
  requestArr.length = 0;
}

// 上传图片
// export const imgUpload = (url, params) =>{
//   const headers = { 'Content-Type': 'multipart/form-data;charset=UTF-8' };
//   return service.post(url, params, { headers });
// }
