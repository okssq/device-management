import { post, get } from "./http";

// 公司相关
export const COMPANY = {
  // 公司列表
  list(param) {
    return post("/company/company_list.json", param);
  },
  // 新增公司
  insert(param) {
    return post("/company/insert_company.json", param);
  },
  // 修改公司
  update(param) {
    return post("/company/update_company.json", param);
  },
  // 删除公司
  del(param) {
    return post("/company/delete_company.json", param);
  },
  // 公司树形下拉框
  treeList(param) {
    return post("/company/company_level.json", param);
  },
};

// 项目相关接口
export const PROJECT = {
  // 项目列表
  list(param) {
    return post("/project/project_list.json", param);
  },
  // 新增项目
  insert(param) {
    return post("/project/insert_project.json", param);
  },
  // 修改项目（不修改密码）
  update(param) {
    return post("/project/update_project.json", param);
  },
  // 删除项目
  del(param) {
    return post("/project/delete_project.json", param);
  },
  options(param) {
    return post("/project/project_level.json", param);
  },
};
// 设备地图相关接口
export const TERMINAL_MAP = {
  // 设备坐标列表
  gpsList(param) {
    return post("/terminal_map/terminal_gps_list.json", param, "json");
  },
  projectBounds(param) {
    return post("/terminal_map/project_gps_list.json", param, "json");
  },
};
// 设备控制相关接口
export const TERMINAL_CONTROL = {
  // 设备的开关数量和状态
  switchInfo(param) {
    return post("/terminal_control/open_or_close.json", param);
  },
  // 单个开关控制
  singleControl(param) {
    return post("/terminal_control/singe_control.json", param);
  },
  // 批量开关控制
  batchControl(param) {
    return post("/terminal_control/batch_control.json", param);
  },
  // 重启系统
  rebootSys(param) {
    return post("/terminal_control/reboot_system.json", param);
  },
  // 重启应用
  rebootApp(param) {
    return post("/terminal_control/reboot_application.json", param);
  },
};
// 设备相关接口
export const TERMINAL = {
  // 设备列表
  list(param) {
    return post("/terminal/terminal_list.json", param);
  },
  // 修改设备
  update(param) {
    return post("/terminal/update_terminal.json", param);
  },
  // 删除设备
  del(param) {
    return post("/terminal/unbind_terminal.json", param);
  },
  // 未绑定设备列表
  unbindList(param) {
    return post("/terminal/unKnown_terminal_list.json", param);
  },
  // 绑定设备
  bind(param) {
    return post("/terminal/bind_terminal.json", param);
  },
};
// 登录相关接口
export const login = {
  // 登录
  login(param) {
    return get("/login/login.json", param);
  },
  // 退出登录
  insert() {
    return post("/login/quit_login.json");
  },
};
// 角色相关
export const ROLE = {
  // 角色列表
  list(param) {
    return post("/role/role_list.json", param);
  },
  // 新增角色
  insert(param) {
    return post("/role/insert_role.json", param);
  },
  // 修改角色
  update(param) {
    return post("/role/update_role.json", param);
  },
  // 删除角色
  del(param) {
    return post("/role/delete_role.json", param);
  },
  // 角色下拉框
  selectList(param) {
    return post("/role/select_role.json", param);
  },
};
// 用户相关接口
export const USER = {
  // 用户列表
  list(param) {
    return post("/user/user_list.json", param);
  },
  // 新增用户
  insert(param) {
    return post("/user/insert_user.json", param);
  },
  // 修改用户（不修改密码）
  update(param) {
    return post("/user/update_user.json", param);
  },
  // 删除用户
  del(param) {
    return post("/user/delete_user.json", param);
  },
  // 修改用户密码
  updatePassword(param) {
    return post("/user/update_password.json", param);
  },
};
// 日志相关接口
export const LOGS = {
  // 登录日志列表
  loginList(param) {
    return post("/logs/login_log_list.json", param);
  },
  // 操作日志列表
  operationList(param) {
    return post("/logs/operation_log_list.json", param);
  },
};
// 资源文件相关接口
export const RESOURCE = {
  // 查询所有的资源列表
  list(param) {
    return post("/resource/resource_list.json", param);
  },
  // 新增资源信息
  add(param) {
    return post("/resource/insert_resource.json", param);
  },
  // 删除资源信息
  add(param) {
    return post("/resource/delete_resource.json", param);
  },
};
// 树
export const LEVEL = {
  // 公司->项目->设备
  treeList() {
    return post("/level/tree_list.json");
  },
};
