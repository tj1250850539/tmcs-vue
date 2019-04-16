import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        { path: 'index', component: () => import('./views/Index.vue') },
        { path: 'brand', component: () => import('./views/Brand.vue') },
        { path: 'classify', component: () => import('./views/Classify.vue') },
        { path: 'personalCenter', component: () => import('./views/PersonalCenter.vue') },
        { path: '', redirect: 'index' }
      ]
    },
    { path: '/register1', component: () => import('./views/Register1.vue') },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/register2', component: () => import('./views/Register2.vue') },
    { path: '/goodsinfo', name: 'gogoods', component: () => import('./views/GoodsInfo.vue') }

  ]
})
