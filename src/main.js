import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Proxy libraries to a property of the Vue prototype object
// more information here:
// https://vuejsdevelopers.com/2017/04/22/vue-js-libraries-plugins/

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
