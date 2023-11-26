import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "vue3-cookies";
import ChatApp from "../components/ChatApp.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const { cookies } = useCookies();

const routes = [
  {
    path: "/logout",
    component: {
      render: () => null,
      beforeRouteEnter(_: any, __: any, next: any) {
        cookies.remove("access_token");
        next("/login");
      },
    },
    meta: { title: "" },
  },
  {
    path: "/register",
    component: Register,
    meta: { requiresNoAuth: true, title: "Register | Messenger" },
  },
  {
    path: "/login",
    component: Login,
    meta: { requiresNoAuth: true, title: "Login | Messenger" },
  },
  {
    path: "/:id",
    component: ChatApp,
    meta: { requiresAuth: true, title: "Messenger" },
  },
  {
    path: "/",
    component: ChatApp,
    meta: { requiresAuth: true, title: "Messenger" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to: any, _, next) => {
  const access_token = cookies.get("access_token");
  const requiresAuth = to.matched.some(
    (record: any) => record.meta.requiresAuth
  );
  const requiresNoAuth = to.matched.some(
    (record: any) => record.meta.requiresNoAuth
  );

  if (requiresAuth && !access_token) {
    next("/login");
  } else if (requiresNoAuth && access_token) {
    next("/");
  } else {
    next();
  }

  document.title = to.meta.title || "Chat App";
});

export default router;
