import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import vSelect from 'vue-select';
import infiniteScroll from 'vue-infinite-scroll';
import VueTimeago from 'vue-timeago';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en',
});

Vue.use(infiniteScroll);

const firebaseConfig = {
  apiKey: 'AIzaSyCIO4cuTXxpZPxmkOJbevghAxPTpW9pkVo',
  authDomain: 'sideproject-dced6.firebaseapp.com',
  databaseURL: 'https://sideproject-dced6.firebaseio.com',
  projectId: 'sideproject-dced6',
  storageBucket: 'sideproject-dced6.appspot.com',
  messagingSenderId: '108597942219',
  appId: '1:108597942219:web:b4750eff9c64c4a50a484e',
  measurementId: 'G-Z24WKNL0K4',
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

Vue.component('v-select', vSelect);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
