import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/register1', component: () => import('./views/Register1.vue') },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/register2', component: () => import('./views/Register2.vue') },
  ]
})
