<template>
  <login
    title="淘宝用户登录"
    lab1='账号'
    lab2='登录密码'
    pr1='手机号/邮箱/会员名'
    pr2='请输入密码'
    itype='text'
    subtxt='登 录'
  >
    <template v-slot:a_link>
      <div class="lgn_link">
          <a href="javascript:;">短信校验码登录</a>
          <router-link to="./register1" tag="a">免费注册</router-link>
      </div>
    </template>
  </login>
</template>
<script>
import login from "../components/Member";
export default {
  components: { login }
};
</script>
<style lang="less">
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
