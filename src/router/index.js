//引入nprogress
import nProgress from "nprogress";
import "nprogress/nprogress.css";
nProgress.inc(0.2);
nProgress.configure({ easing: "ease", speed: 500, showSpinner: false });
import VueRouter from "vue-router";
//引入组件
import Login from "../view/login/index.vue";
//创建一个路由器
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/index",
      component: () => import("../view/homepage/index.vue"),
      children: [
        {
          path: "/",
          component: () => import("../view/homepage/Home.vue"),
        },
        {
          path: "person",
          component: () => import("../view/person/index.vue"),
        },
        {
          path: "schedule",
          component: () => import("../view/schedule/index.vue"),
        },
        {
          path: "enroll",
          component: () => import("../view/enroll"),
        },
        {
          path:"blok",
          component: () => import('../view/blok')
        },
        {
          path:"news",
          component: () => import('../view/news')
        }
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
    nProgress.start();
    next();
});
router.afterEach(() => {
  nProgress.done();
});
export default router;
