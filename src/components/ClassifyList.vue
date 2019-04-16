<template>
  <div class="tab-menu">
    <div v-for="(mItem, index) in menuList" :key="index">
      <h2>{{ mItem.name }}</h2>
      <ul class="clearfix">
        <router-link tag="li" v-for="item in mItem.list" :key="item.id" :to="{ name: 'shopping', params: {id: item.id}}">
          <img :src="item.pic">
          <p>{{ item.name }}</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      menuList: {}
    };
  },
  watch: {
    id: function(newl, old){
      this.getMenuList()
    }
  },
  methods: {
    getMenuList() {
      axios.get("/tmData/classifyList.json").then(res => {
        if (res.data.ret === "调用成功") {
          for (var key in res.data.data) {
            if (key === this.id) {
              this.menuList = res.data.data[key].models;
            }
          }
        } else {
          alert("获取数据失败");
        }
      });
    }
  },
  created() {
    this.getMenuList()
  }
};
</script>

<style lang="less">
.tab-menu {
  float: right;
  width: 77%;
  background: #fff;
  height: 100%;
  padding: 10px 4%;
  box-sizing: border-box;
  overflow-y: auto;
  div {
    h2 {
      font-size: 14px;
      line-height: 14px;
      color: #9b9b9b;
      padding: 15px 0;
    }
    ul {
      li {
        float: left;
        width: 33.33333%;
        margin: 5px 0;
        img {
          width: 76px;
          height: 76px;
          margin: 0 auto;
        }
        p {
          line-height: 23px;
          height: 23px;
          padding: 4px 0;
          font-size: 14px;
          color: #5d5d5d;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>

