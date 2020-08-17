import Vue from 'vue';
import vSelect from 'vue-select';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.component('v-select', vSelect);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
