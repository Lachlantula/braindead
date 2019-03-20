import Vue from "vue";
import Router from "vue-router";
import File from "./views/File.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "file",
      component: File
    }
  ]
});
