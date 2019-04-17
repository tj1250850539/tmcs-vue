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
      <div class="prompt-empty" v-if="shopping === ''">
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
        <div class="list clearfix">
          <van-checkbox v-model="checked" checked-color="red"></van-checkbox>
          <van-card
            num="2"
            price="2.00"
            title="盼盼铜锣烧红豆味1kg 早餐整箱 西式蛋糕点手撕面包休闲食品"
            thumb="//img.alicdn.com/bao/uploaded/i1/725677994/O1CN01vKZKIT28vIfOZlSni_!!0-item_pic.jpg_sum.jpg"
          >
            <div slot="footer">
              <van-stepper v-model="Index"/>
              <van-button size="mini">
                <i class="iconfont icon-dustbin_icon"></i>
              </van-button>
            </div>
          </van-card>
        </div>
        <div class="list clearfix">
          <van-checkbox v-model="checked" checked-color="red"></van-checkbox>
          <van-card
            num="2"
            price="2.00"
            title="盼盼铜锣烧红豆味1kg 早餐整箱 西式蛋糕点手撕面包休闲食品"
            thumb="//img.alicdn.com/bao/uploaded/i1/725677994/O1CN01vKZKIT28vIfOZlSni_!!0-item_pic.jpg_sum.jpg"
          >
            <div slot="footer">
              <van-stepper v-model="Index"/>
              <van-button size="mini">
                <i class="iconfont icon-dustbin_icon"></i>
              </van-button>
            </div>
          </van-card>
        </div>
        <div class="m-footer">
          <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checkeds">
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
export default {
  data() {
    return {
      value: "",
      shopping: "a",
      checkeds: false,
      checked: false,
      Index: 1
    };
  },
  methods: {
    backout(e) {
      this.$router.push('/index')
      e.preventDefault()
    },
    onSubmit() {}
  }
};
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
          float: left;
          width: 90%;
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
              top: -5px;
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
        }
      }
    }
  }
}
</style>

