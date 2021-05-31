import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { User } from "@/types/User";
import { getLoggedUser } from "@/services/userRepository";
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
  {
    path: "/books/edit/:id",
    name: "EditBook",
    component: Home,
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/books/delete/:id",
    name: "DeleteBook",
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
  const user: User | null = await getLoggedUser();
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (user) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

export default router;
