<template>
  <div>
    <img class='recommend_img' src="//gw.alicdn.com/tfs/TB1hHw3MAvoK1RjSZFwXXciCFXa-1125-360.png" alt="">
      <p class='recommend_tit'>
        <span>新人单件包邮</span>
        <span class='recommend_tit_span c_999'>购物立减999</span>
      </p>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
.recommend_img{
  width:100%;
}
.recommend_tit{
  font-size: 18px;
  color: #051B28;
  font-weight: 700;
  margin: 0 15px;
  position: absolute;
  top: 20px;
  z-index: 9;
  width: 100%;
  display:flex;
  align-items:center;
  .recommend_tit_span{
    font-size:12px;
    margin-left:10px;
    font-weight: 0;
  }
}
</style>
