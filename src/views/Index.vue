<template>
  <div id="mallPage">
    <div id="head">
      <div class="title-wrap">
        <h1>天猫超市</h1>
        <i
          class="iconfont icon-gouwuche"
          :class="{'i-fixed':sFlag}"
          @click="$router.push('/shoppingTrolley')"
        ></i>
      </div>
    </div>
    <div id="main">
      <div class="m-search" :class="{'s-fixed':sFlag}">
        <van-search placeholder="请输入搜索关键词" v-model="value" background="#D53C41" shape="round"/>
      </div>
      <div class="banner">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="image in bannerList" :key="image.id">
            <div class="bannerImg">
              <img :src="image.content">
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="advertising">
        <img src="http://img.alicdn.com/tps/i4/TB1OjZdQVzqK1RjSZFCtKbbxVXa.gif">
        <div class="m-card" >
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555331498598&di=72875d22df0f73b7c45fa986fba997b6&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5667c06ab78f66d9b64b14119d40e2a1606ce70e1e73-FDbTnk_fw658">
        </div>
      </div>
      <div
        class="m-news"
        v-for="(fyitem, index) in newsList"
        :key="index"
        v-show="(index+1) === currentPage"
      >
        <van-row type="flex" justify="space-around" v-for="(item, index) in fyitem" :key="index">
          <van-col span="4" v-for="(nimg,index) in item" :key="index">
            <img
              :src="nimg.menuhref"
              @click="$router.push({path:'/classify', query: {id: nimg.id+''}})"
            >
            <span>{{ nimg.menuName }}</span>
          </van-col>
        </van-row>
        <van-pagination v-model="currentPage" :page-count="getpageCount" mode="simple"/>
      </div>
      <div class="m-promo">
        <h2>
          品牌精选
          <span>SHOWTIME</span>
        </h2>
        <div class="promo-img">
          <img :src="promoList.claTitleImg">
        </div>
        <div class="promo-list">
          <img :src="item.clagoodsImg" v-for="item in promoList.clagoods" :key="item.claId">
        </div>
      </div>
      <div class="m-social">
        <h2>
          猜你喜欢
          <span>EXPLORE</span>
        </h2>
        <div class="social-content" v-for="item in socialList" :key="item.rushGoodsId">
          <div>
            <img :src="item.rushGoodsUrl">
          </div>
          <div
            class="imgList"
            v-for="imgItem in item.goodss"
            :key="imgItem.goodsId"
            @click="$router.push({name: 'gogoods', query:{id: imgItem.goodsId}})"
          >
            <img :src="imgItem.goodsImgUrl">
            <div class="item-main">
              <h3>{{ imgItem.goodsName }}</h3>
              <p>{{ imgItem.goodsName }}</p>
            </div>
            <div class="item-imp">
              <p>{{ imgItem.goodsMoney }}</p>
              <div>
                <span>{{ imgItem.goodsSales }}</span>
                <i class="iconfont icon-gouwuche" @click.stop="goshopping(imgItem.goodsId)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      value: '',
      bannerList: [],
      promoList: [],
      socialList: [],
      newsList: [],
      currentPage: 0,
      itemsPerPage: 1,
      totalItems: 0,
      sFlag: false,
      isShow: false
    }
  },
  computed: {
    getpageCount() {
      this.totalItems = this.newsList.length
      return this.totalItems / this.itemsPerPage
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollTop)
  },
  methods: {
    showNotify() {
      this.$notify('加入成功');
    },
    getBannerList() {
      axios.get("/tmData/banner.json").then(res => {
        if (res.statusText.toLowerCase() === "ok") {
          this.bannerList = res.data
        } else {
          alert("获取数据失败")
        }
      });
    },
    getNewsList() {
      axios.get("/tmData/goodsMenu.json").then(res => {
        if (res.statusText.toLowerCase() === "ok") {
          this.newsList = res.data
        } else {
          alert("获取数据失败")
        }
      })
    },
    getPromoList() {
      axios.get("/tmData/handpick.json").then(res => {
        if (res.statusText.toLowerCase() === "ok") {
          this.promoList = res.data
        } else {
          alert("获取数据失败")
        }
      });
    },
    getSocialList() {
      axios.get("/tmData/likeGoods.json").then(res => {
        if (res.statusText.toLowerCase() === "ok") {
          this.socialList = res.data
        } else {
          alert("获取数据失败")
        }
      });
    },
    scrollTop() {
      let scroll = document.documentElement.scrollTop;
      if (scroll > 45) {
        this.sFlag = true
      } else {
        this.sFlag = false
      }
    },
    goshopping(id) {
      if (!this.$store.state.isLogin) {
        this.$router.push('/login')
      }else{
        let shoppingId = id
        this.$store.commit({type:'pushShopping', shoppingId:shoppingId, num:1})
        this.showNotify()
      }
    }
  },
  created() {
    this.getBannerList()
    this.getNewsList()
    this.getPromoList()
    this.getSocialList()
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollTop)
  }
}
</script>

<style lang="less">
#mallPage {
  height: 100%;
  background: #d53c41;
  #head {
    color: #fff;
    font-size: 12px;
    height: 44px;
    line-height: 44px;
    .title-wrap {
      width: 100%;
      h1 {
        margin-left: 18px;
        float: left;
        font-size: 20px;
      }
      i {
        font-size: 20px;
        float: right;
        margin-right: 10px;
      }
    }
  }
  #main {
    .banner {
      .van-swipe {
        height: 140px;
        margin: 10px;
        border-radius: 10px;
        .van-swipe-item {
          background: #d53c41;
          overflow: hidden;
          img {
            width: 100%;
            height: 269px;
            position: relative;
            top: -107px;
          }
        }
      }
    }
    .advertising {
      width: 100%;
      position: relative;
      img {
        width: 100%;
      }
      .m-card {
        position: absolute;
        width: 18.67%;
        height: 56.67%;
        left: 10.13%;
        top: 23%;
        background-size: cover;
        img {
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
    .m-news {
      margin: 10px;
      background: #fff;
      color: #2f2f2f;
      text-align: center;
      border-radius: 10px;
      .van-col {
        height: 75px;
        img {
          width: 45px;
          height: 45px;
          padding-top: 10px;
          display: block;
          border-radius: 50%;
          margin: 0 auto;
        }
      }
    }
    .m-promo {
      margin: 10px;
      background: #fff;
      border-radius: 10px;
      padding: 10px;
      h2 {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #333;
        font-weight: 600;
        span {
          margin-left: 3px;
          color: #1b5;
          transform: scale(1.14285714);
          transform-origin: 0 50%;
        }
      }
      .promo-img {
        height: 120px;
        img {
          height: 150px;
          width: 100%;
          position: relative;
          top: -30px;
        }
      }
      .promo-list {
        height: 120px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        img {
          width: 33%;
        }
      }
    }
    .m-social {
      margin: 10px;
      background: #fff;
      border-radius: 10px;
      padding: 10px;
      h2 {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #333;
        font-weight: 600;
        span {
          margin-left: 3px;
          color: #1b5;
          transform: scale(1.14285714);
          transform-origin: 0 50%;
        }
      }
      .social-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          width: 33%;
          img {
            height: 217px;
            width: 100%;
          }
        }
        .imgList {
          img {
            height: 110px;
            width: 100%;
          }
          .item-main {
            padding: 10px;
            width: 100%;
            color: #333;
            h3 {
              font-size: 14px;
              color: #313d44;
              margin-bottom: 2px;
              font-weight: 600;
              p {
                font-size: 12px;
                font-weight: 400;
                color: #666;
              }
            }
          }
          .item-imp {
            padding: 10px 10px 0;
            width: 100%;
            p {
              color: #333;
              font-size: 14px;
              font-weight: 700;
            }
            div {
              width: 100%;
              color: #9b9b9b;
              i {
                background: red;
                border-radius: 50%;
                color: #fff;
                width: 20px;
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                float: right;
                text-align: center;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
  }
}
.van-popup--top{
  top:50% !important;
}
.van-field__left-icon .van-icon {
  color: #1b5;
  font-size: 20px;
}
.s-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 90%;
  z-index: 9999;
  .van-search {
    background: #fff !important;
    .van-search__content {
      border: #1b5 1px solid;
      background: #fff;
    }
  }
}
.i-fixed {
  position: fixed;
  top: 0;
  right: 0;
  width: 11%;
  background: #fff;
  color: #000;
  height: 55px;
  line-height: 55px;
  text-align: center;
  z-index: 9999;
  margin: 0 !important;
}
.img-enter-active{
  transform-origin:center;
  animation: imgtag 1s;
}
.img-leave-active{
  transform-origin:center;
  animation: imgtag 1s;
}
@keyframes imgtag {
  0%{
    transform: scale(1)
  }
  50%{
    transform: scale(0)
  }
  100%{
    transform: scale(1)
  }
}
</style>
