<template>
   <ul class="nav-bar">
    <li v-for="(item, index) in tabs" :key="index">
      <router-link :to="item.href" active-class="active" tag="a">
        <i :class="['iconfont',item.icon]"></i>
        <span>{{ item.name }}</span>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array
    }
  }
}
</script>
<style lang="less">
@import '../styles/tabBar.less';
</style>
