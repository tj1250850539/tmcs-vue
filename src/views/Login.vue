<template>
  <div id="lgn_body">
    <h2 id="lgn_header">淘宝用户登录</h2>
    <div id="lgn_main">
      <form action="">
        <div class="lgn_pu lgn_bank">
          <label for="" class="lgn_lab">账号</label>
          <input type="text" placeholder="手机号/邮箱/会员名" v-model="loginPhone">
          <slot name='pwd_on_off'></slot>
          <!-- <div style="position:absolute;width:20px;height:20px;background:#000;"></div> -->
        </div>
        <slot name="re_pwd_hint"></slot>
        <div class="lgn_pu lgn_pwd">
          <label for="" class="lgn_lab">登录密码</label>
          <input type="password" placeholder="请输入密码" v-model="loginPwd">
        </div>
        <slot name="re_uname_hint"></slot>
        <div class="lgn_sub">
          <input type="submit" @touchstart='login' value="登 录" style="width:100%">
        </div>
      </form>
      <div class="lgn_link">
          <a href="javascript:;">短信校验码登录</a>
          <router-link to="./register1" tag="a">免费注册</router-link>
      </div>
    </div>
    <toast :isShow='isShow' :hintTxt='hintTxt' hintW='100px' hintH='100px'></toast>
  </div>
</template>
<script>
import toast from '../components/toast'
export default {
  components: {
    toast
  },
  data () {
    return {
      isShow:false,
      hintTxt:'',
      loginPhone: '',
      loginPwd: '',
      isExist:false
    }
  },
  methods: {
    login (){
      let userObj = this.$store.state.userAccount
      // console.log(this.$store.state.userAccount) //拿到vuex中储存的用户账号对象
      let _this = this
      for(let item in userObj){
        if(this.loginPhone == userObj[item].userPhone || this.loginPhone == userObj[item].userName){
          this.isExist = true //判断账号是否存在
          for(let userInfo in userObj[item]){
            if(this.loginPwd == userObj[item].userPwd){
              this.hintTxt = '登录成功'
              this.isShow = true
              setTimeout(() => {_this.isShow = false,_this.$router.push('/index')},500)
              break;
            } else {
              this.hintTxt = '密码错误'
              this.isShow = true
              setTimeout(() => {_this.isShow = false},1000)
              break;
            }
          }
          break;
        } else {
          this.isExist = false
        }
      }
      if(!this.isExist){
        this.hintTxt = '账号不存在'
        this.isShow = true
        setTimeout(() => {this.isShow = false},1000)
      }
    }
  }
};
</script>
<style lang="less">
#lgn_body{
    display: flex;
    flex-direction: column;
    #lgn_header{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 45px;
      font-size:17px;
      border-bottom: 1px solid #c8c8c8;
      color: #000;
      background-color: #f7f7f8;
    }
    #lgn_main{
      margin-top: 17.5px;
      .lgn_pu{
        border-bottom: 1px solid #ddd;
        padding: 14px 10px;
        color: #6c6c6c;
        background-color: #fff;
        text-align: left;
        display: flex;
        input{
          flex: 1;
          color:#666;
          font-size:16px;
        }
        input::placeholder{
          color:#ccc;
          font-size:16px;
        }
        .lgn_lab{
        display:inline-block;
        width:75px;
        font-size:16px;
        }
      }
      .lgn_sub{
        margin:17.5px 9px;
        input{
          width: 100%;
          height:47px;
          line-height: 47px;
          border: 1px solid #f40;
          border-radius: 5px;
          color: #fff;
          text-align: center;
          font-size: 17px;
          display: block;
          background: #ff0036!important;
          border-color: #ff0036!important;
        }
      }
    }
  }
.lgn_link{
  margin:17.5px 9px;
  font-size:16px;
  display: flex;
  justify-content:space-between;
  a{
    color:#ff0036;
  }
}
</style>
