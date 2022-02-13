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
