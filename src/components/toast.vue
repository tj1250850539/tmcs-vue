<template>
  <transition>
    <div class='re_box_hint' v-show='isShow' :style='{width:hintW,height:hintH}'>{{ hintTxt }}</div>
  </transition>
</template>
<script>
/*
isShow --隐藏显示效果
hintW/hintH -- 设置提示框的宽高
hintTxt  --提示的内容

 */
export default {
  props: {
    isShow: {
      type:Boolean
    },
    hintTxt: {
      type:String
    },
    hintW: {
      type:String,
      default:'200px'
    },
    hintH: {
      type:String,
      default:'50px'
    }
  }
}
</script>
<style lang="less">
  .re_box_hint{
  display:flex;
  position:absolute;
  background:rgba(0, 0, 0, 0.8);
  border-radius:5px;
  color:rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  text-align: center;
  top:50px;
  left:0;
  right:0;
  margin:auto;
  font-size:16px;
}
.v-enter-active{
  animation: hintshow 0.6s
}
.v-leave-active{
  animation: hintshow 0.6s reverse
}
@keyframes hintshow {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
