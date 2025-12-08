import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import auth from "../auth";




const routes = [{
        path: "/",
        name: "home",
        component: HomeView,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "LogIn",
        component: LogIn,
    },

    // ADD POST PAGE
     {
    path: "/add-post",
    name: "AddPost",
    component: () => import("../views/AddPost.vue"),
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) next("/login");
      else next();
    },
  },

  // POST PAGE (for clickable posts)
  {
    path: "/post/:id",
    name: "PostPage",
    component: () => import("../views/PostPage.vue"), // can be placeholder
    beforeEnter: async (to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) next("/login");
      else next();
    },
  },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;