<template>
  <div class="shoppingTrolley">
    <div class="head">
      <div class="h-left" @touchstart="backout">
        <i class="iconfont icon-shouye2"></i>
        <span>天猫超市</span>
      </div>
      <van-search placeholder="搜索天猫超市" v-model="value"/>
    </div>
    <div class="order-address">
      <i class="iconfont icon-dizhi"></i>
      <span>当前城市：深圳</span>
    </div>
    <div class="main">
      <div class="prompt-empty" v-if="shoppingFlag">
        <span></span>
        <i class="iconfont icon-gouwuche"></i>
        <span></span>
        <div>
          <p>购物车还是空的，</p>
          <p>去挑几件中意的商品吧</p>
        </div>
        <a href="/">开始购物</a>
      </div>
      <div class="shoppingList" v-else>
        <div class="list clearfix"  v-for='(item,index) in shoppingTrolleyList' :key='index'>
          <!-- <van-checkbox @click='fn2($event,index)'></van-checkbox> -->
          <div class="list-left">
            <span class="iconfont icon-right" :class="{bckred:fn2(index)}" @click="fn3(index)"></span>
          </div>
          <van-card
            :num="item.num"
            :price="item.price"
            :title="item.name"
            :thumb="item.url"
          >
            <div slot="footer">
              <van-stepper @change="fn1($event,index)"/>
              <van-button size="mini">
                <i class="iconfont icon-dustbin_icon"></i>
              </van-button>
            </div>
          </van-card>
        </div>
        <div class="m-footer">
          <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked">
              <p>总重<span>342</span>kg</p>
              <p>总价<span>$342</span></p>
            </van-checkbox>
          </van-submit-bar>
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
      value: "",
      shoppingFlag: false,
      checked: false,
      shoppingList: [],
      commodityList: {},
      likeGoodsList: [],
      shoppingTrolleyList:[],
      checkeds0: false,
      checkeds1: false,
      checkeds2: false,
      checkeds3: false,
      checkeds4: false,
      checkeds5: false,
      checkeds6: false,
      checkeds7: false,
      checkeds8: false,
      checkeds9: false,
      checkeds10: false,
      Index0: 1,
      Index1: 1,
      Index2: 1,
      Index3: 1,
      Index4: 1,
      Index5: 1,
      Index6: 1,
      Index7: 1,
      Index8: 1,
      Index9: 1,
      Index10: 1,
    }
  },
  methods: {
    backout(e) {
      this.$router.push('/index')
      e.preventDefault()
    },
    getcommodityList () {
      axios.get('/tmData/commodityList.json').then(res => {
        if (res.data.ret === '调用成功') {
          this.commodityList = res.data.data
        }else{
          alert('数据获取失败')
        }
      })
    },
    getlikeGoodsList () {

      axios.get('/tmData/likeGoods.json').then(res => {
        if (res.statusText.toLowerCase() === 'ok') {
          this.likeGoodsList = res.data
        }else{
          alert('数据获取失败')
        }
      })
    },
    onSubmit() {},
    getShoppingList () {
      let shopping = this.$store.state.shoppingList.goods
      var likeGoodsList = this.likeGoodsList
      var commodityList = this.commodityList
      for (let i = 0; i < shopping.length; i++) {
        if(shopping[i].nid){
          for(let q in commodityList){
            if(q == shopping[i].nid){
              for(let w in commodityList[q].srp){
                for(let e in commodityList[q].srp[w]){
                  if(shopping[i].id == commodityList[q].srp[w].nid){
                    var url = commodityList[q].srp[w].img
                    var name = commodityList[q].srp[w].title
                    var price = commodityList[q].srp[w].price
                    this.shoppingTrolleyList.push({ id:shopping[i].id, url: url,name: name,price: price,num:shopping[i].num })
                    break
                  }
                }
              }
            }

          }
        }else{
          for(let j in likeGoodsList){
            for(let t in likeGoodsList[j].goodss){
              for(let k in likeGoodsList[j].goodss[t]){
                if(shopping[i].id == likeGoodsList[j].goodss[t].goodsId){
                  var url = likeGoodsList[j].goodss[t].goodsImgUrl
                  var name = likeGoodsList[j].goodss[t].goodsName
                  var price = likeGoodsList[j].goodss[t].goodsMoney
                  this.shoppingTrolleyList.push({ id:shopping[i].id, url: url,name: name,price: price,num:shopping[i].num })
                  break
                }
              }
            }
          }
        }


      }
    },
    fn1 (e,i) {
      var Index = 'Index'+i
      this[Index] = e
    },
    fn2 (i) {
      var index = 'checkeds' + i
      return this[index]
      console.log(index)
    },
    fn3 (i) {
      var index = 'checkeds' + i
      this[index] = !this[index]
      console.log(index,this[index])
    }
  },
  watch: {
    commodityList: function(newd,okd) {
      if(this.shoppingFlag === false){
        this.getShoppingList()
      }

    }
  },
  created () {
    this.getlikeGoodsList()
    this.getcommodityList()
    let goods = this.$store.state.loginName + 'goods'
    if (this.$store.state.shoppingList.goods) {
      this.shoppingFlag = false
    }else{
      this.shoppingFlag = true
    }
  }
}
</script>

<style lang="less">
.shoppingTrolley {
  .head {
    padding: 8px 6px;
    height: 32px;
    line-height: 32px;
    background: #fff;
    color: #888;
    .h-left {
      float: left;
      i {
        font-size: 20px;
        position: relative;
        top: 2px;
      }
      span {
        margin-left: 5px;
      }
    }
    .van-search {
      float: right;
      height: 32px;
      background: #fff;
      border-radius: 5px;
      .van-search__content {
        background: #fff;
        height: 32px;
      }
    }
  }
  .order-address {
    font-size: 14px;
    font-weight: 700;
    padding: 0 10px;
    background-color: #fff;
    margin-top: 1px;
    margin-bottom: 3px;
    height: 33px;
    line-height: 33px;
    color: #999;
    i {
      color: #ccc;
      margin-left: 20px;
    }
    span {
      line-height: 33px;
      margin-left: 10px;
    }
  }
  .main {
    .prompt-empty {
      padding-top: 120px;
      text-align: center;
      background-color: #eee;
      font-size: 14px;
      span {
        display: inline-block;
        border-top: 2px solid #ddd;
        width: 61px;
        text-decoration: none;
        vertical-align: bottom;
        height: 20px;
      }
      i {
        margin: 0 16.5px;
        font-size: 40px;
        color: #ddd;
      }
      div {
        margin-top: 18px;
        color: #999;
        p {
          line-height: 1.75;
        }
      }
      a {
        display: inline-block;
        line-height: 40px;
        background-color: #dd2727;
        color: #fff;
        border: 0;
        width: 122px;
        height: 40px;
        text-align: center;
        border-radius: 2px;
        margin-top: 25px;
        outline: 0;
        font-size: 14px;
      }
    }
    .shoppingList {
      background: #fff;
      overflow: hidden;
      .list {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        .list-left{
          float: left;
          width: 10%;
          height: 100%;
          text-align: center;
          margin-top: 10%;
          margin-left: 3%;
          span{
            display: inline-block;
            text-align: center;
            line-height: 30px;
            font-size: 22px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-weight: 700;
            border: 1px solid #7c849a;
            color: #fff;
            background-color: #fff;
            margin: auto;
          }
        }
        .van-checkbox {
          float: left;
          width: 10%;
          height: 90px;
          line-height: 90px;
          padding-left: 2%;
          box-sizing: border-box;
          .van-checkbox__icon .van-icon {
            border: 1px solid #7c849a;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            width: 30px;
          }
        }
        .van-card {
          float: right;
          width: 87%;
          margin-top: 0;
          background-color: #fff;
          position: relative;
          .van-card__footer {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 68%;
            text-align: right;
            margin-bottom: 20px;
            padding-right: 20px;
            box-sizing: border-box;
            .van-stepper {
              position: absolute;
              left: 10px;
              top: -4px;
            }
            .van-button {
              border: 0;
              min-width: 20px;
              i {
                font-size: 22px;
                color: #999;
              }
            }
          }
        }
        .van-card__content {
          flex-direction: initial;
        }
        .van-card__title {
          width: 70%;
        }
        .van-card__bottom {
          width: 30%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .van-card__price {
          color: #999;
        }
        .van-card__num {
          color: #333;
        }
      }

      .van-checkbox__icon--checked .van-icon {
        background-color: red;
      }
      .m-footer {
        .van-icon {
          margin-left: 10px;
          border: 0.01rem solid #7c849a;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.2rem;
          width: 0.3rem;
          margin-top: -3px;
        }
      }
    }
  }
}
.van-card__title{
  padding-bottom: 0 !important;
}
.bckred{
  background-color: red !important;
}
</style>

