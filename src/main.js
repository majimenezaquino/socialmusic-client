import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store';
const EventBus = new Vue();
import VueCookies from 'vue-cookies'

const User = new Vue();
new Vue({
  EventBus,
  VueCookies,
  store,
  router,
  render: h => h(App)
}).$mount("#app");

