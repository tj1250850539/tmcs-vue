<template>
  <div id='pe_box'>
    <div id="pe_title" ref='pe_title' :class='{scroll_he:iscolor}'>
        <a class="iconfont icon-fangdajing tit_icon" :class='{scroll_a:iscolor}'></a>
        <h1 class='top_tit' :class='{scroll_h2:iscolor}'>权益中心</h1>
        <a class="iconfont icon-gouwuche tit_icon" :class='{scroll_a:iscolor}' @click="$router.push('/shoppingTrolley')"></a>
    </div>
    <div id='pe_header'>
      <h1 class='header_user'>
        <img class='user_img' src="http://img.mp.sohu.com/upload/20170619/b21b3e8d03714011a551f6c641fb3f6a.png" alt="">
        你好,&nbsp;&nbsp;&nbsp;{{ this.$store.state.loginName }}
      </h1>
      <div class='header_togoo'>
        <div class='user_card'>
          <div class='card_sty'>
            <p><em class='f_20'> 0</em>&nbsp;<b style='opacity: 0.5;'>张</b></p>
            <p>优惠券</p>
          </div>
          <div class='card_sty b_lr' >
            <p><em class='f_20'> 0</em>&nbsp;<b style='opacity: 0.5;'>张</b></p>
            <p>购物券</p>
          </div>
          <div class='card_sty'>
            <p><em class='f_20'> 0</em>&nbsp;<b style='opacity: 0.5;'>张</b></p>
            <p>超市卡</p>
          </div>
        </div>
        <div class='togoo_img'>
          <img src="https://gw.alicdn.com/tfs/TB1Q8.BAwTqK1RjSZPhXXXfOFXa-324-214.png" alt="">
        </div>
      </div>
    </div>
    <div id='pe_recommend'>
      <bannerbenefit></bannerbenefit>
    </div>
    <div id='pe_exclusive'>
      <h2 class='exclusive_tit'><span>新人专享</span>限6小时专属优惠</h2>
      <div class='exclusive_goods'>
        <exclusive
        v-for='aitem in groupItems'
        :key='aitem.itemId'
        :customTitle='aitem.customTitle'
        :itemImg='aitem.itemImg'
        :specs='aitem.specs'
        :itemActPriceStr='aitem.itemActPriceStr'
        :benefitPoint='aitem.benefitPoint'></exclusive>
      </div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import exclusive from '../components/ExclusiveGoods'
import bannerbenefit from '../components/bannerBenefit.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      groupItems:{},
      bannerList:{},
      iscolor:false,
    }
  },
  computed: {
    ...mapState(['userName','userPhone'])

  },
  components: {
    exclusive,
    bannerbenefit
  },
  mounted () {
    this.getExclusiveData ()
    this.isScroll()
  },
  methods: {
    isScroll(){
      this.elGHeader = this.$refs.pe_title
      var _this = this
      document.addEventListener('scroll',function(){
        let scrollTop = document.documentElement.scrollTop
        // console.log(scrollTop)
        if(scrollTop>_this.elGHeader.offsetHeight){
          _this.iscolor = true
        } else {
          _this.iscolor = false
        }
      })
    },
    getExclusiveData () {
      Axios.get('/tmData/newexclusive.json').then(res => {
        let data = res.data;
        if(data.data.ret === '调用成功'){
          this.groupItems = data.data.groupItems
          this.bannerList = data.data.bannerBenefitDTOList
          // console.log(this.groupItems)
          // console.log(this.bannerList)
        }
      })
    }
  }
}
</script>
<style lang="less">
.scroll_he{
  background:#fff !important;
}
.scroll_a{
  color:#000 !important;
}
.scroll_h2{
  color:#30B30E !important;
}
.f_20{
  font-size: 20px;
}
.b_lr{
  border-left: 1px solid rgba(255,255,255,.1);
  border-right: 1px solid rgba(255,255,255,.1);
}
.c_999{
  color:#999;
}
.font_s{
  font-size:16px;
  color:#FF4800;
  font-weight:600;
}
.price_flex{
  display:flex;
  align-items: center;
  margin-bottom:5px;
}
#pe_box{
  overflow-x:hidden;
  #pe_title{
    padding:0 10px;
    box-sizing:border-box;
    height:44px;
    width:100%;
    background:transparent;
    display:flex;
    position: fixed;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    .top_tit{
      font-size:20px;
      color:#fff;
    }
    .tit_icon{
      font-size:24px;
      color:#fff;
    }
  }
  #pe_header{
    width:100%;
    height:164px;
    padding-top:44px;
    box-sizing:border-box;
    background:#1b5;
    .header_user{
      margin-top:10px;
      padding:0 15px ;
      display:flex;
      align-items: center;
      font-size:16px;
      color:#fff;
      font-weight:800;
      height:40px;
      box-sizing:border-box;
      .user_img{
        width:40px;
        height:40px;
        border-radius:50%;
        background:#fff;
        margin-right:8px;
      }
    }
    .header_togoo{
      height:70px;
      display:flex;
      position:relative;
      .user_card{
        display:flex;
        width:250px;
        align-items: center;
        justify-content:space-around;
        .card_sty{
          text-align:center;
          color:#fff;
          width:83px;
        }
      }
      .togoo_img{
        width:162px;
        position:absolute;
        right:0;
        img{
          width:100%;
        }
      }
    }
  }
  #pe_recommend{
    padding-top:20px;
    background:#fff;
    width:100%;
    height:120px;
    position: relative;
  }
  #pe_exclusive{
    width: 100%;
    overflow:hidden;
    .exclusive_tit{
      background:#fff;
      height:26px;
      line-height: 26px;
      color:#999;
      padding:20px 15px 20px;
      span{
        font-size:18px;
        font-weight:800;
        color:#000;
        margin-right:15px;
      }
    }
    .exclusive_goods{
      display:flex;
      width:100%;
      flex-wrap: wrap;

    }
  }
}
</style>

