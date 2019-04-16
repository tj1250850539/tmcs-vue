<template>
  <div>
    <div id="re_header">
      <a class="re_back_a" @click='$router.back()'>返回</a>
      <h2>淘宝注册</h2>
    </div>
    <div id="re_main">
      <form action>
        <h3 class="re_tit_hint">为了你的账户安全请填写一个手机号完成验证</h3>
        <div class="re_info">
          <div class="re_info_pu re_info_region">
            <label for="">国家/地区</label>
            <select name="" id="re_select">
              <option value="">马拉维(+256)</option>
              <option value="">中国(+86)</option>
              <option value="">中国</option>
              <option value="">中国</option>
            </select>
            <i>∨</i>
          </div>
          <span class="re_info_after"></span>
          <div class="re_info_pu re_info_phone">
            <label for="">手机号</label>
            <input type="text">
          </div>
        </div>
        <div class="re_slide" ref='slider'>
          <div class="re_slide_mask" :class='{mask_w:isReach}' ref='mask' style='width:0'></div>
          <div class="re_sliding" :class='{reach:isReach}' ref='thunk' @touchend="up" @touchstart="down" @touchmove="move">>></div>
          <label for="" class="re_slide_lab">向右滑动验证</label>
        </div>
      </form>
    </div>
    <div id="re_footer">
      继续操作即视为同意<a href="">淘宝平台服务协议、</a><a href="javascript:;">隐私权政策、</a><a href="javascript:;">法律声明</a>和<a href="javascript:;">支付宝及客户端服务协议</a>
      <p>系统将同步为您创建支付宝账户</p>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return{
      isDown: false,
      left:'',
      isDown:false,
      slideLeft:0,
      psThunkLeft:0,
      psThunkW:0,
      psSliderW:0,
      isReach:false
    }
  },
  watch: {
    left: function(newData,formerData){
      this.$refs.thunk.style.left = newData+"px"
      this.$refs.mask.style.width = newData+"px"
    }
  },
  methods: {
    down(event){
      this.isDown = true
      var t = event.touches[0];
      var sliderL = this.$refs.slider.offsetLeft;
      this.$refs.thunk.onclick = function(e){
      this.slideLeft = t-sliderL
      }
    },
    move(){
      if(this.isDown){
        var t = event.touches[0];
        this.left= t.pageX-this.$refs.thunk.offsetWidth/2+this.slideLeft
        this.psThunkLeft = parseInt(this.$refs.thunk.style.left) //滑块距离起点的距离
        this.psThunkW = parseInt(this.$refs.thunk.offsetWidth)  //滑块的宽度
        this.psSliderW = parseInt(this.$refs.slider.offsetWidth) //承载滑块的宽度
        // console.log(this.$refs.thunk.style.left) //thunk距离起点的距离
        if(this.left < 0){
          this.left = 0;
        }
        if(this.psThunkLeft+this.psThunkW == this.psSliderW){
          //只要滑块到底,不论有没有抬起手指 都触发验证成功
          this.isReach = false  //false 表示滑块已经到顶了 不需要添加css3过渡动画
          alert('验证通过')
          this.$router.push('/register2')
        }
        if(this.left>this.$refs.slider.offsetWidth-this.$refs.thunk.offsetWidth)
          this.left=this.$refs.slider.offsetWidth-this.$refs.thunk.offsetWidth
        }


    },
    up(){
      if(this.psThunkLeft+this.psThunkW < this.psSliderW){
         this.isReach = true  //ture 表示滑块还没有到顶,需要添加css3过渡动画
         var _this = this
         setTimeout(function(){
           _this.$refs.thunk.style.left = '0px'
           _this.$refs.mask.style.width = '0px'
           _this.isReach = false
         },500)
      }
      this.isDown=false;
    }
  },
  computed: {

  }
}
</script>
<style lang="less">
#re_header {
  background: #e6e6e6;
  background-image: linear-gradient(#f2f2f2, #e6e6e6);
  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 1px 8px rgba(0, 0, 0, 0.2);
  border-bottom: 1px #c1c1c5 solid;
  padding: 3px 0;
  position: relative;
  .re_back_a {
    left: 5px;
    background: #e6e6e6;
    background-image: linear-gradient(#f2f2f2, #e6e6e6);
    border: 1px #c1c1c5 solid;
    position: absolute;
    top: 8px;
    display: inline-block;
    width: auto;
    padding: 4px 10px;
    font-size: 14px;
    line-height: 20px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  h2 {
    color: #333;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    height: 40px;
    overflow: hidden;
    font-size: 20px;
    font-weight: 400;
  }
}
#re_main {
  margin-top: 10px;
  margin-bottom:5px;
  position: relative;
  .re_tit_hint {
    font-size: 14px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .re_info{
    padding:6px 0;
    margin-top:5px;
    overflow: hidden;
    .re_info_after{
      margin-left:15px;
      width:100%;
      height:0.5px;
      float:left;
      display: block;
      background:#ccc;
    }
    .re_info_pu{
      padding:4px 15px;
      width:auto;
      height:33px;
      line-height: 33px;
      background:#fff;
      label{
        margin-right: 15px;
        text-align: left;
        font-size:16px;
      }
    }
    .re_info_region{
      display: flex;
      align-items: center;
      #re_select{
      flex:1;
      margin-left:50px;
      color: #333;
      font-size: 16px;
      -webkit-appearance: none;
      padding: 0;
      border: 0;
      background-color: transparent;
      option{
        text-align: left;
      }
      }
      i{
        width:12px;
        height:12px;
        display: inline-block;
        line-height:12px;
      }
    }
    .re_info_phone{
      border-bottom:1px solid #d2d2d2;
    }
  }
  .re_slide{
    // position: absolute;
    height: 52px;
    box-shadow: 0 0 3px #999;
    background-color: #ddd;
    margin:0 15px;
    position: relative;
    margin-top:10px;
    .mask_w{
      -webkit-animation: maskw 0.5s infinite;
    }
    .reach{
      -webkit-animation: thunkisreach 0.5s infinite;
    }
    .re_sliding{
      width:52px;
      height:52px;
      background:#fff;
      font-size:24px;
      text-align: center;
      line-height: 52px;
      color:#ccc;
      position: absolute;
      display:inline-block;
    }
    .re_slide_mask{
      height:100%;
      background:rgb(120,196,48);
      position: absolute;
    }
    .re_slide_lab{
      background: -webkit-gradient(linear, left top, right top, color-stop(0, #4d4d4d), color-stop(.4, #4d4d4d), color-stop(.5, white), color-stop(.6, #4d4d4d), color-stop(1, #4d4d4d));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-animation: slidetounlock 3s infinite;
      width:100%;
      height:100%;
      display:inline-block;
      float:left;
      font-size:17px;
      text-align:center;
      line-height: 55px;
    }
  }
}
#re_footer{
  font-size:14px;
  text-align: center;
  color: #6C6C6C;
  line-height: 20px;
  a{
    color: #f40;
  }
}
@keyframes maskw {
  100% {
    width:0px;
  }
}
@keyframes thunkisreach {
  100% {
      left:0;
  }
}
@keyframes slidetounlock {
  0% {
      background-position: -200px 0;
  }
  100% {
      background-position: 200px 0;
  }
}
</style>
