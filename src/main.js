import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store';
import VeeValidate ,{ Validator } from 'vee-validate';
import es from 'vee-validate/dist/locale/es';
const EventBus = new Vue();
import VueCookies from 'vue-cookies';
  Vue.use(VeeValidate);
  Validator.localize('es', es);

  const {DB_USER_NAME}=require('@/config/index')
  const {DBLocal} =require('@/services/data_local')
  const dbLocal= new DBLocal(DB_USER_NAME);

  Vue.prototype.$user_data=dbLocal.getDataLocalStorageOBject();
  

new Vue({
  EventBus,
  VueCookies,
  store,
  router,
  render: h => h(App)
}).$mount("#app");

