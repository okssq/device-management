import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { LocalStorage } from "quasar";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const router = createRouter({
  routes,
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
  history: createWebHashHistory(),
});
// router.beforeEach((to, from, next) => {
//   console.log("before each invoked");

//   if (to.path !== "/login") {
//     // next('/login')//不仅可以写字符串还可以是一个对象
//     next({ path: "/login", replace });
//   } else {
//     next();
//   }
// });
router.afterEach((to, from, failure) => {
  if (!failure) {
    if (to.path === "/login") return;
    LocalStorage.set("router-path", to.path);
  }
});
export default router;
