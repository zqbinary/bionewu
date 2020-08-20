import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import moment from 'moment'
import common from './common'

Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.prototype.$common = common;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
