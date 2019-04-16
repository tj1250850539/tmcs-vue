<template>
  <div class="Shopping">
    <div class="ShoopingList" v-for="item in shoppingList" :key='item.nid' @touchstart='gogoods(item.nid)'>
      <van-card
      :price="item.price"
      :desc="'月销量'+item.sold"
      :title="item.title"
      :thumb="item.img"/>
      <i class="iconfont icon-gouwuche"></i>
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
      shoppingList: []
    }
  },
  methods: {
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
    }
  },
  created () {
    this.getShoppingList()
  }
}
</script>

<style lang="less">
.ShoopingList{
  position: relative;
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
  }
}
.ShoopingList:nth-last-of-type(1){
  border-bottom: 0;
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
</style>
