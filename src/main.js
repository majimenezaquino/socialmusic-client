import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store';
const EventBus = new Vue();
new Vue({
  EventBus,
  store,
  router,
  render: h => h(App)
}).$mount("#app");

