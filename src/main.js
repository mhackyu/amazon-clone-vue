import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { currencyFormat, dateFormat } from './helpers/formatter';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.filter('currency', currencyFormat);
Vue.filter('date', dateFormat);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
