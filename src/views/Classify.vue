<template>
  <div id="classify">
    <van-nav-bar
      title="全部分类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="tab-nav">
      <div class="tab-content">
        <van-badge-group :active-key="activeKey" @change="onChange" >
          <van-badge :title="item.name" v-for="item in navList" :key='item.id' ref='actives' @click="navID(item.id)"/>
        </van-badge-group>
      </div>
      <ClassifyList :id='navId'></ClassifyList>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ClassifyList from '../components/ClassifyList'
import { types } from 'util';
export default {
  data() {
    return {
      activeKey: 0,
      navList: [],
      menuList: {},
      navId: '2122'
    };
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onChange(key) {
      this.activeKey = key;
    },
    navID (id){
      this.navId = id
    },
    getNavList () {
      axios.get('/tmData/classify.json').then(res => {
        if (res.data.ret === '调用成功'){
          this.navList = res.data.data.list
        }else{
          alert('获取数据失败')
        }
      })
    },
    getActiveKey (id) {
      for(var i=0;i < this.navList.length;i++) {
        if(this.navList[i].id === id){
          this.activeKey = i
        }
      }
    }
  },
  components: {
    ClassifyList
  },
  created () {
    this.getNavList()
    this.navId = this.$route.params.id || '2122'
 },
  updated () {
    this.getActiveKey(this.navId)
  }
}
</script>
<style lang="less">
#classify{
  height: 100%;
  background: #EEE;
  overflow: hidden;
  .van-nav-bar{
    line-height: 43px;
    height: 43px;
    background: #EEE;
    border-bottom: 1px solid #E1E1E1;
  }
  .tab-nav{
    height: 93%;
    .tab-content{
      float: left;
      height: 100%;
      width: 23%;
      .van-badge-group{
        height: 100%;
        text-align: center;
        color: #9B9B9B;
        font-size: 14px;
        overflow-y: auto;
        overflow-x: hidden;
        .van-badge{
          background: #EEE;
        }
          .van-badge--select{
          border-color: #fff;
          background: #fff;
        }
      }
    }
  }
}

</style>

