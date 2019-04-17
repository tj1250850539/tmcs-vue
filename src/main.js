import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store/index'
import animate from 'animate.css'

Vue.use(Vant)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
