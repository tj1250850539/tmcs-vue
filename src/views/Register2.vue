<template>
  <div>
    <register2
      title="设置账户信息"
      lab1='登录密码'
      lab2='会员名'
      pr1='输入新密码'
      pr2='5-25个字符'
      :itype='itype'
      subtxt='注 册'
    >
      <template v-slot:re_pwd_hint>
        <p class='hint_txt pwd_hint_txt'>密码由6-20位英文字母、数字或符号组成</p>
      </template>
      <template v-slot:pwd_on_off>
        <!-- <div>
<div style="position:absolute;width:20px;height:20px;background:#000;"></div>
        </div> -->
        <van-switch v-model="checked" size="20px"/>
      </template>
      <template v-slot:re_uname_hint>
        <p class='hint_txt'>5-25个字符.推荐使用中文.请勿包括姓名/身份证/银行卡等隐私信息,可用于登录或找回密码</p>
      </template>
    </register2>
  </div>
</template>
<script>
import register2 from '../components/Member'
export default {
  data () {
    return {
      checked: false,
      itype: 'password'
    }
  },
  watch: {
    checked:function(newItype,oldItype){
      newItype?this.itype='text':this.itype='password'
    }
  },
  methods: {
    switch () {
      this.checked?this.itype='text':this.itype = 'password'
    }
  },
  mounted () {
    this.switch()
  },
  components: {
    register2
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
</style>
