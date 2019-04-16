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
    }
  ]
})
