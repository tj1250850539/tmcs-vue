<template>
  <div id="commodity">
    <div class="head">
      <div class="h-left" @touchstart="backout">
        <i class="iconfont icon-shouye2"></i>
        <span>天猫超市</span>
      </div>
      <van-search placeholder="请输入搜索关键词" v-model="value"/>
    </div>
    <div class="nav">
      <van-tabs type="card">
        <van-tab title="综合">
          <ShoppingList :shoppingKey='1'></ShoppingList>
        </van-tab>
        <van-tab title="热销">
          <ShoppingList :shoppingKey='2'></ShoppingList>
        </van-tab>
        <van-tab title="价格">
          <ShoppingList :shoppingKey='3'></ShoppingList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import ShoppingList from '../components/ShoppingList.vue'
export default {
  data () {
    return {
      value :''
    }
  },
  methods: {
    backout (e) {
      this.$router.push('/index')
      e.preventDefault()
    }
  },
  components: {
    ShoppingList
  }
}
</script>

<style lang="less">
#commodity{
  background-color: #eee;
  .head{
    padding: 8px 6px;
    height: 32px;
    line-height: 32px;
    color: #888;
    .h-left{
      float: left;
      i{
        font-size: 20px;
        position: relative;
        top: 2px;
      }
      span{
        margin-left: 5px;
      }
    }
    .van-search{
      float: right;
      height: 32px;
      background: #fff;
      border-radius: 5px;
      .van-search__content{
        background: #fff;
        height: 32px;
      }
    }
  }
  .nav{
    padding: 8px 6px;
    background-color: #efeff4;
    .van-tabs{
      .van-tabs__wrap{
        .van-tabs__nav{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .van-tabs__content{
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
.van-tabs__nav--card .van-tab.van-tab--active{
  background: #5e646e;
}
.van-tabs__nav--card .van-tab,.van-tabs__nav--card{
  border:1px solid #5e646e;
}
.van-tabs__nav--card .van-tab{
  color: #5e646e;
}
</style>

