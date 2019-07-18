import Vue from "vue";
import Router from "vue-router";

import Login from "~/pages/login.vue";
import Builds from "~/pages/builds/builds.vue";
import Groups from "~/pages/builds/groups.vue";
import Users from "~/pages/builds/people.vue";
import Home from "~/pages/index.vue";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",

    routes: [
      {
        path: "/",
        component: Home,
        name: "Home",
        beforeEnter: ""
      },
      {
        path: "/builds",
        component: Builds,
        name: "Prédios"
      },
      {
        path: "/groups",
        component: Groups,
        name: "Grupos"
      },
      {
        path: "/users",
        component: Users,
        name: "Usuários"
      },
      {
        path: "/login",
        component: Login,
        name: "Entre no sistema"
      }
    ]
  });
}
