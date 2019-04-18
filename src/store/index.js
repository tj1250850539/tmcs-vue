import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  //放数据的
  state: {
    userPhone:0,
    //储存的数据是用户注册的{账号,密码,用户名}
    userAccount: [
      {
        userPhone:123,
        userName:'root',
        userPwd:'root'
      },
      {
        userPhone:789,
        userName:'root2',
        userPwd:'root2'
      },
      {
        userPhone:15909497267,
        userName:'root3',
        userPwd:'root3'
      }
    ],
  },
  //对数据的二次计算
  getters: {

  },
  //唯一能修改state 的东西
  mutations: {
    changePhone (state,userPhone) {
      state.userPhone = userPhone
    },
    changeuser (state,obj){
      state.userAccount.push(obj)
    }
  },
  //可以多次调用mutations的东西
  actions: {

  }
})

export default store
