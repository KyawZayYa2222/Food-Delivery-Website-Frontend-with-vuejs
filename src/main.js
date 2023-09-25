require('swiper/dist/css/swiper.css')
import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './assets/fontawesome/css/all.css'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './config'
import router from './router'
import Toasted from 'vue-toasted'

// firebase 
initializeApp(firebaseConfig);

Vue.use(Toasted, {
  position: 'top-right',
  duration: 2500,
  keepOnHover: true,
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
