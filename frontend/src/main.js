import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import moment from 'moment'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Vuelidate);

Vue.config.productionTip = false

moment.locale('fr');

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('LT - ddd Do MMM YYYY')
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
