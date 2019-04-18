<template>
  <div id="g_box">
    <div id="g_header" ref='g_header' :class='{backdonghuashow:iscolor,backdonghuahid:!iscolor}'>
      <div>
        <a class="iconfont icon-iconfontjiantou1 g_icon_ba" :class='{g_icon_scrolldown:iscolor}' @touchstart='$router.back() '></a>
        <a class="iconfont icon-fangdajing g_icon_ba" :class='{g_icon_scrolldown:iscolor}' ></a>
      </div>
      <div>
        <a class="iconfont icon-liebiao g_icon_ba" :class='{g_icon_scrolldown:iscolor}'></a>
        <a class="iconfont icon-gouwuche g_icon_ba" :class='{g_icon_scrolldown:iscolor}'></a>
      </div>
    </div>
    <div id="g_cont" ref='g_cont'>
      <div class='g_cont_img1'>
        <div class='g_cont_img2'>
          <img :src=" Oflag === 1 ? gData.goodsImgUrl :gData.img" alt="">
        </div>
      </div>
      <div class='g_cont_info'>
        <h2 class='g_cont_cost'>
          <p>
            <i class='c_201 fs20'>¥</i>
            <b class='c_201 fs24'>{{ Oflag === 1 ? gData.goodsMoney : gData.price }}</b>
          </p>
          <span class='g_cont_rec'>超市推荐</span>
        </h2>
        <p style='font-size:14px;'>{{ Oflag === 1 ? gData.goodsName : gData.title }}</p>
        <div class='g_cont_correlation'>
          <span>满88包邮(20kg内)</span>
          <span> {{ Oflag === 1 ? gData.goodsSales : '月销量'+gData.sold+'件' }}</span>
          <span>广东惠州</span>
        </div>
      </div>
      <div class='g_cont_sales'>
        <div class='sales_info'>
          <span class='c_201'>促销</span>
          <div>
            <p>老板带着小姨子跑路了,所有商品挥泪大甩卖</p>
            <p>原价100多,200多,300多的产品现在统统60块!!</p>
          </div>
        </div>
        <i class='fs24'>></i>
      </div>
      <div class='g_cont_tm'>
        <h3>
          <img src="//img.alicdn.com/tfs/TB1N_qLmvDH8KJjy1XcXXcpdXXa-740-63.png_320x320Q90s50.jpg_.webp" alt="">
        </h3>
        <div class='tm_physical'>
          <div class='tm_info'>
          <span class='c_201'>物流</span>
          <div>
            <p>至罗湖区：22:00前付款，预计4月17日送达,可选...</p>
            <p>
              <img style='height:14px;' src="//img.alicdn.com/tfs/TB1No7XbvxNTKJjy0FjXXX6yVXa-145-28.png_320x320Q50s50.jpg_.webp" alt="">
              <span class='c_999'>天猫保障的配送服务</span>
            </p>
          </div>
        </div>
        </div>
        <div class='tm_serve'>
          <div class='tm_info'>
            <span class='c_201'>服务</span>
            <div>
              <p>满88包邮 · 一站式购齐 · 极速退款 · 正品保证</p>
              <p>
                <img style='height:12px;' src="//img.alicdn.com/tfs/TB1KT1TavBNTKJjy0FdXXcPpVXa-318-54.png_320x320Q50s50.jpg_.webp" alt="">
                <span class='c_999'>全程保障,购物无忧</span>
              </p>
            </div>
          </div>
          <i class='fs24'>></i>
        </div>
      </div>
      <div class='g_cont_norms'>
        <div class='norms_select norms_comm'>
          <div class='norms_info'>
            <span class='c_999' ref='getel'>选择</span>
            <p>配送至罗湖区,请选择分类</p>
          </div>
          <i class='fs24'>></i>
        </div>
        <div class='norms_par norms_comm'>
          <div class='norms_info'>
            <span class='c_999'>参数</span>
            <p>包装体积,毛重...</p>
          </div>
          <i class='fs24'>></i>
        </div>
      </div>
      <p v-for='item in 10' :key='item' class='g_cont_p'>{{ item }}.{{ gData.title }}</p>
    </div>
    <van-goods-action id="g_footer">
      <van-goods-action-mini-btn icon="shop-collect-o" text="店铺"/>
      <van-goods-action-mini-btn icon="star-o" text="收藏"/>
      <van-goods-action-big-btn text="加入购物车"/>
    </van-goods-action>
    <transition>
      <div id='alert_mask' v-show='flag'>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
      </div>
    </transition>
  </div>
</template>


<script>
import Axios from 'axios'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      elGCont:null,
      elGHeader:null,
      iscolor:false,
      gData:{},
      Oflag: 1,
      flag: false
    }
  },
  mounted () {
    this.isScroll()
    this.Oflag = Object.getOwnPropertyNames(this.$route.query).length
    if(this.Oflag === 1){
      this.getGoods()
    }else{
      this.getGoodsInfo()
    }
  },
  methods: {
    isScroll(){
      this.elGCont = this.$refs.g_cont
      this.elGHeader = this.$refs.g_header
      var _this = this
      this.elGCont.addEventListener('scroll',function(){
        let scrollTop = _this.elGCont.scrollTop
        if(scrollTop>_this.elGHeader.offsetHeight){
          setTimeout(function(){
            _this.elGHeader.style.background = '#fff'
          },500)
          _this.iscolor = true
        } else {
          setTimeout(function(){
            _this.elGHeader.style.background = 'transparent'
          },500)

           _this.iscolor = false
        }
      })
    },
    getGoodsInfo () {
      Axios.get('/tmData/commodityList.json').then(res => {
        let data = res.data
        if(data.ret === '调用成功'){
          for(let key in data.data){
            if(key === this.$route.query.id){
              for(let srpnid in data.data[key].srp){
                if(data.data[key].srp[srpnid].nid == this.$route.query.nid){
                  this.gData = data.data[key].srp[srpnid]
                }
              }
            }
          }
        } else {
          console.log('获取失败')
        }

      })
    },
    getGoods () {
      Axios.get('/tmData/likeGoods.json').then(res => {
         console.log(res)
        if(res.statusText.toLowerCase() === 'ok'){
          let data = res.data
          for (var key in data) {

            for(var i in data[key].goodss){
              if(data[key].goodss[i].goodsId === this.$route.query.id){
                this.gData = data[key].goodss[i]
              }
            }
          }
        } else {
          console.log('获取失败')
        }
      })
    }
  }
};
</script>
<style lang="less">
.c_999{
  color:#999;
}
.c_201{
  color:rgb(255,0,112)
}
.fs20{
  font-size:20px;
}
.fs24{
  font-size:24px;
}
#g_box{
  overflow:hidden;
  #alert_mask{
    position:absolute;
    bottom:50px;
    width: 100%;
    height:auto;
    // min-height:300px;
    padding:50px 0;
    background:#fff;
    z-index:100;
  }
  #g_footer{
    z-index:101;
  }
  height:100%;
  display: flex;
  flex-direction: column;
  #g_header {
  background:transparent;
  height: 44px;
  display: flex;
  align-items: center;
  padding:0 5px;
  position:fixed;
  box-sizing:border-box;
  width:100%;
  top:0;
  left:0;
  justify-content: space-between;
  .g_icon_ba{
    display:inline-block;
    line-height: 30px;
    text-align: center;
    color:#fff;
    font-size:20px;
    margin:0 4px;
    width:30px;
    height:30px;
    border-radius:50%;
    background-color: rgba(0,0,0,.4);
  }
  .g_icon_scrolldown{
    background:#fff;
    color:#000;
  }
}
#g_cont {
  flex:1;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  margin-bottom:50px;
  .g_cont_p{
    background:#fff;
    line-height:30px;
    text-align:center;
    color:#999;
    margin-bottom:10px
  }
  .g_cont_img1{
    width:100%;
    background: -webkit-linear-gradient(top,rgb(248, 246, 246),rgb(165, 243, 213),rgb(248, 246, 246));
    box-sizing:border-box;
    padding:50px;
    .g_cont_img2{
      width:100%;
      border-radius: 10px;
      img{
        width:100%;
        border-radius:10px;
      }
    }
  }
  .g_cont_info{
    background:#fff;
    padding:0 10px;
    .g_cont_cost{
      height:36px;
      display:flex;
      align-items: center;
      .g_cont_rec{
        display:block;
        font-size:12px;
        color:#fff;
        background:rgb(251,104,120);
        margin-left:10px;
      }
    }
    .g_cont_correlation{
      display:flex;
      justify-content: space-between;
      height:30px;
      align-items: center;
      span{
        color:#999;
      }
    }
  }
  .g_cont_sales{
    min-height:60px;
    padding: 12px 10px;
    box-sizing:border-box;
    background:#fff;
    margin:10px 0;
    display:flex;
    justify-content: space-between;
    .sales_info{
      display:flex;
      span{
        margin-right:10px;
      }
    }
    i{
      color:#999;
      display:flex;
      justify-content:right;
      align-items: flex-start;
    }
  }
  .g_cont_tm{
    padding:10px;
    background:#fff;
    min-height:50px;
    .tm_serve{
      margin-top:20px;
      display:flex;
      align-items: center;
      justify-content: space-between;
      i{
        color:#999;
        display:flex;
        align-items: center;
      }
    }
    .tm_info{
      display:flex;
      span{
        margin-right:10px;
      }
    }

  }
  .g_cont_norms{
    min-height:83px;
    margin:10px 0;
    padding:0 10px;
    background:#fff;
    .norms_comm{
      margin-top:15px;
      display:flex;
      align-items: center;
      justify-content: space-between;
      i{
        color:#999;
        display:flex;
        align-items: center;
      }
    }
    .norms_info{
      display:flex;
      span{
        margin-right:10px;
      }
    }
  }

}

.van-goods-action-mini-btn {
  min-width: 13%;
  color: #999;
  font-size: 12px;
}
.van-button--warning {
  background-color: #ff9500;
  font-size: 15px;
}
.backdonghuashow {
  animation: backdonghu 0.8s;
}
.backdonghuahid {
  animation: backdonghuashow 0.8s;
}
}
@keyframes backdonghu {
  100%{
    background:#fff
  }
}
@keyframes backdonghuashow {
  100%{
    background:transparent;
  }
}
@keyframes alertmask {
  0%{
    bottom:-500px
  }
  100%{
    bottom:50px
  }
}
.v-enter-active {
  animation: alertmask 0.5s
}
.v-leave-active {
  animation: alertmask 0.5s reverse
}
</style>
