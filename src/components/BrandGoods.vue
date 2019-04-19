<template>
  <div class='cont_goods_cent'>
    <img class='cent_goods_img' :src="itemImg" alt="">
    <p class='fw_800'>{{ shortTitle }}</p>
    <span class='c_999'>{{ specDetail }}</span>
    <div class='cent_goods_val'>
      <p>
        <span class='val_fc'>¥</span>
        <em class='val_fc'>{{ itemPrice }}</em>
      </p>
      <i class="iconfont icon-gouwuche gwc_ba"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemPrice:{
      type:String
    },
    shortTitle:{
      type:String
    },
    specDetail:{
      type:String
    },
    itemImg:{
      type:String
    }
  }
}
</script>
<style lang="less">
.val_fc{
  font-size:16px;
  color:#FF610E;
  font-weight: 600;
}
.fw_800{
  font-weight: 800;
  font-size:12px;
  white-space:nowrap;
  margin-bottom:10px;
}
.c_999{
  color:#999;
}
.cont_goods_cent{
  flex:1;
  overflow:hidden;
  margin:0 6px;
  .cent_goods_img{
    width:100%;
  }
  .cent_goods_val{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-top:8px;
    .gwc_ba{
      margin-right:15px;
      display:block;
      width:22px;
      height:22px;
      font-size:12px;
      background:#FF610E;
      border-radius:50%;
      line-height: 22px;
      text-align: center;
      color:#fff;
    }
  }
}
</style>
