<template>
  <div id='br_box'>
    <div id="br_title" ref='br_title' :class='{scroll_he:iscolor}'>
        <a class="iconfont icon-fangdajing tit_icon" :class='{scroll_a:iscolor}'></a>
        <h1 class='top_tit' :class='{scroll_h2:iscolor}'>品牌闪购</h1>
        <a class="iconfont icon-gouwuche tit_icon" :class='{scroll_a:iscolor}' @click="$router.push('/shoppingTrolley')"></a>
    </div>
    <div id='br_header'>
      <img class='he_img' src="//img.alicdn.com/tfscom/TB1PaOMKXOWBuNjy0FiXXXFxVXa.png_760x760Q50s50.jpg_.webp" alt="">
      <div class='he_time'>
        <p class='he_tit'>今日购大牌</p>
        <div class='he_out_time'>
          <span>剩余</span>
          <span class='hour span_time'>{{ hours }}</span>
          <span>:</span>
          <span class='min span_time'>{{ min }}</span>
          <span>:</span>
          <span class='second span_time'>{{ conds }}</span>
        </div>
      </div>
    </div>
    <div id='br_feat'>
      <div class='feat_img_box'>
        <img  class='feat_img' :src="featData.bannerUrl" alt="">
        <div class='feat_desc'>
          <img :src="featData.logoUrl1" alt="">
          <p>{{ featData.mainTitle }}</p>
          <p>{{ featData.subTitle }}</p>
        </div>
      </div>
      <div class='feat_goods'>
        <brandgoods
        v-for='item in featData.items'
        :key='item.idtmId'
        :itemPrice='item.itemPrice'
        :shortTitle='item.shortTitle'
        :specDetail='item.specDetail'
        :itemImg='item.itemImg'
        ></brandgoods>
      </div>
    </div>
    <div id='br_cont'>
      <div class='cont_goods' v-for='aitem in contData' :key='aitem.id'>
        <div class='cont_goods_left'>
          <img :src="aitem.bannerUrl" alt="">
          <div class='cont_desc_box'>
            <img :src="aitem.logoUrl1" alt="">
            <p>{{ aitem.mainTitle }}</p>
            <p style='font-size:14px;font-weight:800;'>{{ aitem.subTitle }}</p>
          </div>
        </div>
        <div class='cont_card_box'>
          <brandgoods
          v-for='bitem in aitem.items'
          :key='bitem.itemId'
          :itemPrice='bitem.itemPrice'
          :shortTitle='bitem.shortTitle'
          :specDetail='bitem.specDetail'
          :itemImg='bitem.itemImg'
          ></brandgoods>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import brandgoods from '../components/BrandGoods.vue'
import Axios from 'axios'
import { setInterval } from 'timers';
export default {
  data () {
    return {
      featData:{},
      contData:[],
      iscolor:false,
      conds:new Date().getSeconds(),
      min:new Date().getMinutes(),
      hours:new Date().getHours()
    }
  },
  components: {
    brandgoods
  },
  mounted () {
    this.getBrandData ()
    this.isScroll()
    this.brandOutTime()
  },
  methods: {
    isScroll(){
      this.elGHeader = this.$refs.br_title
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
    getBrandData () {
      Axios.get('/tmData/brand.json').then(res => {
        let data = res.data;
        if(data.ret === '调用成功'){
          for(let item in data.data.bigBrandFloor){
            if(item == 0){
              this.featData = data.data.bigBrandFloor[item]
              // console.log(this.featData.items)
              // console.log('-----------------------------')
            } else {
              this.contData.push(data.data.bigBrandFloor[item])
              // console.log(this.contData)
            }
          }
        } else {
          console.log('获取失败')
        }
      })
    },
    brandOutTime (){
      var _this = this
      outTime ()
      setInterval(outTime,1000)
      function outTime () {
        let date = new Date().getTime() //设置当前时间
        let end = new Date('2019/4/19 22:00:00').getTime() //设置未来时间
        let time = end-date //得到时间差
        _this.conds = parseInt(time/1000%60)<10?'0'+ parseInt(time/1000%60): parseInt(time/1000%60)
        _this.min = parseInt(time/1000/60%60)<10?'0'+ parseInt(time/1000/60%60): parseInt(time/1000/60%60)
        _this.hours = parseInt(time/1000/60/60)<10?'0'+parseInt(time/1000/60/60):parseInt(time/1000/60/60)
      }
        // console.log(this.hours+'时'+this.min+'分'+this.conds+'秒')
    }
  },
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
#br_box{
  overflow-x:hidden;
  #br_title{
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
  #br_header{
    position: relative;
    height:88px;
    margin-bottom:10px;
    .he_img{
      position:absolute;
      z-index: 1;
      width:100%;
    }
    .he_time{
      width:100%;
      top:44px;
      position:absolute;
      z-index:2;
      padding:15px 10px 0;
      box-sizing:border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .he_tit{
        font-size:18px;
        color:#fff;
        font-weight: 800;
      }
      .he_out_time{
        color:#28373D;
        font-size:14px;
        span{
          margin:0 2px;
        }
        .span_time{
          padding:0 3px;
          font-size:12px;
          background:#000;
          color:#fff;
        }
      }
    }
  }
  #br_feat{
    margin:0 15px;
    position: relative;
    min-height:200px;
    .feat_img_box{
      position:relative;
      .feat_img{
        width:100%;
        position: relative;
        z-index:3;
        border-radius:5px;
      }
      .feat_desc{
        position:absolute;
        z-index:6;
        top:0;
        left:20px;
        width:90px;
        color:#fff;
        font-size:14px;
        font-weight: 600;
        img{
          width:100%;
        }
      }
    }

    .feat_goods{
      display:flex;
      position: relative;
      z-index:3;
      box-sizing:border-box;
      top:-12px;
      width:100%;
      min-height:150px;
      background: #fff;
       padding: 5px 10px 9px;
       border-top-left-radius: 10px;
    }
  }
  #br_cont{
    margin:0 15px;
    .cont_goods{
      margin:10px 0;
      width:100%;
      display:flex;
      box-sizing:border-box;
      border-radius: 5px;
      background:#fff;
      height:185px;
      .cont_goods_left{
        width:110px;
        height:100%;
        position:relative;
        .cont_desc_box{
          position:absolute;
          top:16px;
          width:100%;
          display:flex;
          align-items: center;
          flex-direction: column;
          color:#fff;
          img{
            width:60px;
            height:30px;
          }
        }
        img{
          width:100%;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          height:100%;
        }
      }
      .cont_card_box{
        flex:1;
        padding:7px 10px;
        overflow: hidden;
        display: flex;
        box-sizing:border-box;
      }

    }
  }
  .br_icon_scrolldown{
    background:#fff;
    color:#000;
  }
}
</style>
