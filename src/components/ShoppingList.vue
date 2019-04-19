<template>
  <div class="Shopping">
    <div   v-if='showIsData'>
      <div class="ShoopingList" v-for="(item,index) in shoppingList" :key='index'>
        <van-card
        :price="item.price"
        :desc="'月销量'+item.sold"
        :title="item.title"
        :thumb="item.img" @touchstart='gogoods(item.nid)'/>
        <i class="iconfont icon-gouwuche" @click="goshopping(item.nid)"></i>
      </div>
    </div>
    <p v-else class='no_data_content' style='width:100%;height:100%;'>
      天猫超市太坑爹啦<br>数据加密拿不到<br>假数据太长不想写
    </p>
    <div class="tm-footer">
      <!-- <van-tabbar v-model="active">
        <van-tabbar-item icon="shopping-cart-o" :info="shoppingNum"></van-tabbar-item>
      </van-tabbar> -->
      <div class="f-icon">
        <van-tag round type="danger" v-show="shoppingNum">{{ shoppingNum }}</van-tag>
        <i class="iconfont icon-gouwuche" @click="$router.push('/shoppingTrolley')"></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    shoppingKey: {
      type: Number
    }
  },
  data() {
    return {
      active: 0,
      shoppingList: [],
      shoppingNum: 0,
      showIsData:true
    }
  },
  methods: {
    showNotify() {
      this.$notify({
        message: ('加入成功'),
        duration: 700,
      })
    },
    compare(property){
      return function(a,b){
        var value1 = parseInt(a[property]);
        var value2 = parseInt(b[property]);
        return value1 - value2;
      }
    },
    getShoppingList () {
      axios.get('/tmData/commodityList.json').then(res => {
        if (res.data.ret === '调用成功'){
          for(var key in res.data.data){
            if (key === this.$route.params.id) {
              if(this.shoppingKey === 1){
                this.shoppingList = res.data.data[key].srp
              }else if(this.shoppingKey === 2){
                this.shoppingList = res.data.data[key].srp
                this.shoppingList.sort(this.compare('sold'))
              }else{
                this.shoppingList = res.data.data[key].srp
                this.shoppingList.sort(this.compare('price'))
              }
            }
          }
          if(this.shoppingList.length == 0){
            this.showIsData = false
            console.log('没有数据')
          }
        }else{
          alert('获取数据失败')
        }
      })
    },
    gogoods (nid) {
      this.$router.push({
        name: 'gogoods',
        query: {
          id: this.$route.params.id,
          nid: nid
        }
      })
    },
    goshopping (id) {
      if (!this.$store.state.isLogin) {
        this.$router.push('/login')
      }else{
        let shoppingId = id
        let shoppingNid = this.$route.params.id
        this.$store.commit({type:'pushShopping', shoppingId:shoppingId,shoppingNid:shoppingNid, num:1})
        this.shoppingNum = this.$store.state.shoppingList.goods.length
        this.showNotify()
      }
    }
  },
  created () {
    this.getShoppingList()
    if(this.$store.state.shoppingList.goods){
      this.shoppingNum = this.$store.state.shoppingList.goods.length
    }
  }
}
</script>

<style lang="less">
.no_data_content{
  position: absolute;
  top:200px;
  text-align:center;
  width:100%;
  font-size:24px;
  color:#999;
}
.Shopping{
  padding-bottom: 50px;
}
.ShoopingList{
  position: relative;
  margin-bottom: 5px;
  border-bottom: 1px solid #cacaca;
  i{
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 20px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: #e8374d;
    text-align: center;
    font-size: 22px;
    color: #fff;
    margin-top: -10px;
  }
}
.ShoopingList:nth-last-of-type(1){
  border-bottom: 0;
  margin-bottom: 0;
}
.van-card__title {
  padding-right: 8px;
  border-bottom: dotted 1px #e2e2e2;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.van-card:not(:first-child){
  margin: 0;
}
.tm-footer{
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
  background-color: #f0f0f0;
  .f-icon{
    width: 40px;
    height: 40px;
    border: 3px solid #fff;
    border-radius: 50px;
    font-size: 13px;
    line-height: 42px;
    text-align: center;
    background: #e8374d;
    margin: auto;
    .van-tag{
      position: absolute;
      left:52%;
      top: -5px;
    }
    i{
      line-height: 42px;
      font-size: 26px;
      color: #fff;
    }
  }
  .van-card__title{
    padding-bottom: 0;
  }
  .van-popup--top{
  top:50% !important;
}
  // .van-tabbar{
  //   height: 60px;
  // }
  // .van-tabbar-item{
  //   //height: 60px !important;
  //   background-color: #f0f0f0;
  // }
  // .van-tabbar-item__icon{
  //   width: 40px;
  //   height: 40px;
  //   border: 3px solid #fff;
  //   border-radius: 50px;
  //   font-size: 13px;
  //   line-height: 42px;
  //   text-align: center;
  //   background: #e8374d;
  //   margin: auto;


}
</style>
