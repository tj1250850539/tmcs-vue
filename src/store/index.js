import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  //放数据的
  state: {
    isLogin: true,
    loginName: 'tom',
    shoppingList: {}
  },
  //对数据的二次计算
  getters: {

  },
  //唯一能修改state 的东西
  mutations: {
    pushShopping (state,obj) {
      let goods = state.name + 'goods'
      let sGoods = state.shoppingList.goods
      if(obj.shoppingNid){
        if (sGoods) {
          for(var i = 0; i < sGoods.length; i++) {
            if (sGoods[i].id === obj.shoppingId && sGoods[i].nid === obj.shoppingNid) {
              sGoods[i].num++
              break
            }
          }
          if (i == sGoods.length){
            sGoods.push({ id: obj.shoppingId,nid:obj.shoppingNid, num: obj.num })
          }
        }else{
          state.shoppingList.goods = [{ id: obj.shoppingId,nid:obj.shoppingNid, num: obj.num }]
        }
      }else{
        if (sGoods) {
          for(var i = 0; i < sGoods.length; i++) {
            if (sGoods[i].id === obj.shoppingId) {
              sGoods[i].num++
              break
            }
          }
          if (i == sGoods.length){
            sGoods.push({ id: obj.shoppingId, num: obj.num })
          }
        }else{
          state.shoppingList.goods = [{ id: obj.shoppingId, num: obj.num }]
        }
      }
    }
  },
  //可以多次调用mutations的东西
  actions: {

  }
})

export default store
