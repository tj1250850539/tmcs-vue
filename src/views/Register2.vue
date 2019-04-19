<template>
  <div id="lgn_body">
    <h2 id="lgn_header">设置账户信息</h2>
    <div id="lgn_main">
      <form action="">
        <div class="lgn_pu lgn_bank">
          <label for="" class="lgn_lab">登录密码</label>
          <input :type="itype" placeholder="输入新密码" v-model="userPwd">
          <span style='line-height:22px;color:#999;margin-right:4px;' v-show='PwdRegOk'>格式错误</span>
          <van-switch v-model='checked' size='20px' />
        </div>
        <p class='hint_txt pwd_hint_txt'>密码由6-20位英文字母、数字或符号组成</p>
        <div class="lgn_pu lgn_pwd">
          <label for="" class="lgn_lab">会员名</label>
          <input type="text" placeholder="5-25个字符" v-model='userName'>
          <span style='line-height:21px;color:#999' v-show='NameRegOk'>格式错误</span>
        </div>
        <p class='hint_txt'>6-25个字符.推荐使用中文.请勿包括姓名/身份证/银行卡等隐私信息,可用于登录或找回密码</p>
        <div class="lgn_sub">
          <input type="submit" value="注 册" style="width:100%" @touchstart='register'>
        </div>
      </form>
    </div>
    <toast :isShow='isShow' :hintTxt='hintTxt' hintW='150px' hintH='100px'></toast>
  </div>
</template>
<script>
import toast from '../components/toast'
export default {
  components:{
    toast
  },
  data () {
    return {
      checked: false,
      itype: 'password',
      PwdRegOk: false, //密码是否符合正则
      NameRegOk: false, //昵称是否符合正则
      isLoginPath: false, //是否允许跳转
      userPwd: '',
      userName: '',
      hintTxt: '',
      isShow: false,
    }
  },
  watch: {
    checked:function (newItype,oldItype) {
      newItype ? this.itype = 'text' : this.itype = 'password'
    },
    userPwd: function (newUserPwd, olduserName) {
      let userPwdReg = /^\w{6,20}$/
      if (userPwdReg.test(newUserPwd)) {
        this.PwdRegOk = false
        this.isLoginPath = true
      } else {
        this.PwdRegOk = true
        this.isLoginPath = false
      }
    },
    userName: function (newUserName, oldUserName) {
      let userPwdReg = /^([\u4e00-\u9fa5]|\w){3,12}$/
      if (userPwdReg.test(newUserName)) {
        this.NameRegOk = false
        this.isLoginPath = true
      } else {
        this.NameRegOk = true
        this.isLoginPath = false
      }
    }
  },
  methods: {
    register (event){
      let _this = this
      if (this.isLoginPath) {//因为当用户输入符合正则时,PwdRegOk和NameRegOk都是false,所以取反
        this.$store.commit({
          type: 'changeuser',
          userPhone: this.$route.params.phone,
          userName: this.userName,
          userPwd: this.userPwd
        })
        this.hintTxt = '跳转至登录...'
        this.isShow = true
        setTimeout(() => {
          _this.$router.replace('/login')
          _this.isShow = false
        }, 500)
      } else {
        this.hintTxt = '注册失败!'
        this.isShow = true
        setTimeout(() => { _this.isShow = false }, 1000)
      }
    },
    switch () {
      this.checked ? this.itype = 'text' : this.itype = 'password'
    }
  },
  mounted () {
    this.switch()
  }
}
</script>
<style lang="less">
  .hint_txt{
    font-size:14px;
    color:#6c6c6c;
    padding-left:10px;
    margin-top:8px;
  }
  .pwd_hint_txt{
    margin-bottom:20px;
  }
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
</style>
