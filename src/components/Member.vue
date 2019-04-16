<template>
  <div id="lgn_body">
    <h2 id="lgn_header">{{ title }}</h2>
    <div id="lgn_main">
      <form action="">
        <div class="lgn_pu lgn_bank">
          <label for="" class="lgn_lab">{{ lab1 }}</label>
          <input :type="itype" :placeholder="pr1">
          <slot name='pwd_on_off'></slot>
          <!-- <div style="position:absolute;width:20px;height:20px;background:#000;"></div> -->
        </div>
        <slot name="re_pwd_hint"></slot>
        <div class="lgn_pu lgn_pwd">
          <label for="" class="lgn_lab">{{ lab2 }}</label>
          <input type="text" :placeholder="pr2">
        </div>
        <slot name="re_uname_hint"></slot>
        <div class="lgn_sub">
          <input type="submit" :value="subtxt" style="width:100%">
        </div>
      </form>
      <slot name="a_link"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title:{
      type:String
    },
    lab1: {
      type:String
    },
    lab2: {
      type:String
    },
    pr1: {
      type:String
    },
    pr2: {
      type:String
    },
    itype: {
      type:String
    },
    subtxt: {
      type:String
    }
  },
}
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

</style>
