import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getLogedUser } from "@/services/userRepository";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const logedUser = await getLogedUser();
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (logedUser) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
