<template>
   <div class='exclusive_goods_info'>
          <div class='goods_info_top'>
            <img :src="itemImg" alt="">
            <h3 class='goods_info_tit'>{{ customTitle }}</h3>
            <span style='color:#666;'>{{ specs }}</span>
            <div class='goods_info_price'>
              <div>
                <p class='price_flex'><span class='font_s'>¥{{ itemActPriceStr }}</span><i class='goods_d_hint'>折扣价</i></p>
                <p class='c_999'>超市价:¥456</p>
              </div>
              <i class='iconfont icon-gouwuche goods_info_vehicle' @click="goshopping"></i>
            </div>
          </div>
          <div class='goods_info_bottom'>
            <p>推荐理由&nbsp;&nbsp;&nbsp;&nbsp;{{ benefitPoint }}</p>
          </div>
        </div>
</template>
<script>
export default {
  props: {
    customTitle: {
      type:String
    },
    itemActPriceStr: {
      type:String
    },
    itemImg: {
      type:String
    },
    specs: {
      type:String
    },
    benefitPoint:{
      type:String
    }
  },
  methods: {
    goshopping () {
      if (!this.$store.state.isLogin) {
        this.$router.push('/login')
      }else{

      }
    }
  }
}
</script>
<style lang="less">
.exclusive_goods_info{
        background:#fff;
        padding:0 20px;
        box-sizing:border-box;
        width:49%;
        min-height:300px;
        background:fff;
        margin-bottom:2%;
        .goods_info_top{
          img{
            width:100%;
          }
          .goods_info_tit{
            font-size:14px;
            font-weight:600;
            margin-bottom:5px;
          }
          .goods_info_price{
            margin:5px 0;
            display:flex;
            justify-content: space-between;
            align-items: center;
            .goods_d_hint{
              line-height:16px;
              background:#FF4800;
              opacity: 0.7;
              font-size:10px;
              padding:0 2px;
              color:#fff;
              margin-left:8px;
              border-radius:4px;
            }
            .goods_info_vehicle{
              background:#FF4800;
              width:25px;
              height:25px;
              color:#fff;
              line-height:20px;
              text-align:center;
              border-radius:50%;
            }
          }
        }
        .goods_info_bottom{
          padding-top:10px;
          margin-top:10px;
          border-top:1px dashed #eee;
          color:#3d4245;
          p{
            padding-right:5px;
            margin-right:5px;
            font-weight:600;
            color:#666;
          }
        }
      }
      .exclusive_goods_info:nth-child(odd){
        margin-right:2%;
      }
</style>
