import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store';
const EventBus = new Vue();
const User = new Vue();
new Vue({
  EventBus,
  User,
  store,
  router,
  render: h => h(App)
}).$mount("#app");

