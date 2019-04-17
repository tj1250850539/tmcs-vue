<template>
  <div id="home">
    <router-view></router-view>
    <Navbar :tabs='tabs'></Navbar>
  </div>
</template>

<script>
import Navbar from '../components/tabBar'
export default {
  name: 'home',
  data () {
    return {
      tabs: [
        { name: '首页', href: '/index', icon: 'icon-shouye2' },
        { name: '品牌闪购', href: '/brand', icon: 'icon-gouwudai' },
        { name: '分类', href: '/classify', icon: 'icon-leimupinleifenleileibie2' },
        { name: '我的', href: '/personalCenter', icon: 'icon-My' }
      ]
    }
  },
  components: {
    Navbar
  }
}
</script>

<style lang="less">
#home{
  padding-bottom: 50px;
}

</style>
