import Vue from "vue";
import Router from "vue-router";

import Builds from "~/pages/builds.vue";
import Groups from "~/pages/groups.vue";
import Users from "~/pages/users.vue";
import Home from "~/pages/index.vue";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",

    routes: [
      {
        path: "/",
        component: Home,
        name: "Home"
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
      }
    ]
  });
}
