import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  //放数据的
  state: {
    isLogin: false,
    loginName: '',
    loginPhone: '',
    loginPwd: '',
    shoppingList: {},
    //临时储存localStoge的用户数据
    localStrogeUser:[],
    //储存的数据是用户注册的{账号,密码,用户名}
    userAccount: [
      {
        userPhone:'root',
        userName:'root',
        userPwd:'root'
      }
    ],
  },
  //对数据的二次计算
  getters: {

  },
  //唯一能修改state 的东西
  mutations: {
    pushShopping (state,obj) {
      //let goods = state.loginName + 'goods'
      let sGoods = state.shoppingList.goods
      if(obj.shoppingNid){
        if (sGoods) {
          for(var i = 0; i < sGoods.length; i++) {
            if (sGoods[i].id === obj.shoppingId && sGoods[i].nid === obj.shoppingNid) {
              sGoods[i].num += obj.num
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
              sGoods[i].num += obj.num
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
    },
    changePhone (state,userPhone) {
      state.userPhone = userPhone
    },
    changeuser (state,obj){
      state.userAccount.push(obj)
      localStorage.setItem('userInfo',JSON.stringify(state.userAccount))
    },
    amendLocal(state,userInfo){
      state.userAccount = []
      state.userAccount.push(...JSON.parse(userInfo))
    },
    deleteshoppingList (state,id) {
      let goods = state.loginName + 'goods'
      for(let i in state.shoppingList.goods){
        if(state.shoppingList.goods[i].id == id){
          state.shoppingList.goods.splice(i,1)
        }
      }
    },
    getshoppingList (state) {
      let goods = state.loginName + 'goods'
      let shoppingmsg = localStorage.getItem(goods)
      if(shoppingmsg){
        if(state.shoppingList.goods){
          state.shoppingList.goods.push(...JSON.parse(shoppingmsg))
        }else{
          state.shoppingList.goods = JSON.parse(shoppingmsg)
        }
      }else{
        console.log(shoppingmsg)
      }
    },
    setshoppingList (state) {
      let goods = state.loginName + 'goods'
      localStorage.setItem(goods,JSON.stringify(state.shoppingList.goods))
    }

  },
  //可以多次调用mutations的东西
  actions: {

  }
})

export default store
