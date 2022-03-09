import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { SessionStorage } from "quasar";
import { delAllRequest } from "src/api/http";

const router = createRouter({
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0, left: 0 };
  },
  history: createWebHashHistory(),
});
router.beforeEach((to, from, next) => {
  delAllRequest();
  next();
});
router.afterEach((to, from, failure) => {
  if (!failure) {
    SessionStorage.set("router-path", to.path);
  }
});
export default router;
