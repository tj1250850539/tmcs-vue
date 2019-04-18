import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue'),
      children: [
        { path: 'index', component: () => import('./views/Index.vue') },
        { path: 'brand', component: () => import('./views/Brand.vue') },
        { path: 'personalCenter',
          component: () => import('./views/PersonalCenter.vue'),
          beforeEnter: (to, from, next) => {
            if (!store.state.isLogin) {
              next('/login')
            }else{
              next()
            }
          }
        },
        { path: '', redirect: 'index' }
      ]
    },
    { path: '/register1', component: () => import('./views/Register1.vue') },
    { path: '/classify',name: 'classifys', component: () => import('./views/Classify.vue') },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/register2', component: () => import('./views/Register2.vue') },
    { path: '/commodityList/:id', name: 'shopping', component: () => import('./views/CommodityList.vue') },
    { path: '/goodsinfo', name: 'gogoods', component: () => import('./views/GoodsInfo.vue') },
    { path: '/shoppingTrolley',
      component: () => import('./views/ShoppingTrolley.vue'),
      beforeEnter: (to, from, next) => {
        if (!store.state.isLogin) {
          next('/login')
        }else{
          next()
        }
      }
    }
  ]
})
