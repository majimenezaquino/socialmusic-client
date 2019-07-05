import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from '@/store';

const EventBus = new Vue();
import VueCookies from 'vue-cookies';
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)

import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)

const { DB_USER_NAME } = require('@/config/index')
const { DBLocal } = require('@/services/data_local')
const dbLocal = new DBLocal(DB_USER_NAME);

Vue.prototype.$user_data = dbLocal.getDataLocalStorageOBject();


new Vue({
    EventBus,
    VueCookies,
    store,
    router,
    render: h => h(App)
}).$mount("#app");