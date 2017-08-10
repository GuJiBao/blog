<template>
  <div class="wrapper">
    <gheader></gheader>
    <router-view></router-view>
    <gfooter></gfooter>
  </div>
</template>

<script>
  import Gheader from '@/components/layout/Header'
  import Gfooter from '@/components/layout/Footer'
  export default {
    components: {
      Gheader,
      Gfooter
    }
  }
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/styles/font-awesome.min.css';
  .wrapper {
    width: 100%;
  }
</style>
