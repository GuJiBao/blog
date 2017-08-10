<template>
  <header class="header-wrap">
    <div class="wrap header clearfix">
      <h1 class="logo">我的测试<i class="t">Gujb</i></h1>
      <div class="search">
        <input type="text" class="input-text" placeholder="请输入..."><button href="javascript:;" class="btn btn-success ml10"><i class="fa fa-search"></i>搜索</button>
      </div>
    </div>
    <div class="nav-wrap">
      <nav id="nav" class="wrap">
        <a href="/" class="active">首页</a>
        <a :href="item.url" v-for="(item, key) in menusData">{{ item.name }}</a>
      </nav>
    </div>
  </header>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    created () {
      this.$store.dispatch('menus/getMenus')
    },
    computed: {
      ...mapGetters({
        menusData: 'menus/getMenus'
      })
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/styles/mixins/size.less";
  .header-wrap {
    width: 100%;
    background-color: #fafbfc;
  }
  .header {
    height: 80px;
    .logo {
      position: relative;
      float: left;
      height: 40px;
      margin-top: 20px;
      line-height: 40px;
      text-indent: 20px;
      color: #1d365d;
      font-size: 24px;
      .t {
        position: absolute;
        right: -30px;
        top: -12px;
        color: #42b983;
        font-family: Monotype Corsiva;
        font-size: 14px;
      }
    }
    .search {
      float: right;
      height: 34px;
      margin-top: 23px;
      .input-text {
        width: 234px;
        height: 34px;
        border: 1px solid #eee;
      }
    }
  }

  .nav-wrap {
    .size(100%, 40px);
    background-color: #1d365d;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35);
  }
  #nav {
    height: 40px;
    line-height: 40px;
  }
  #nav a {
    padding: 10px 25px;
    color: #b9c8e0;
    font-size: 16px;
    &:hover,
    &.active {
      color: #fff;
      background-color: rgba(255,255,255,0.15);
    }
    transition: all .3s;
  }
</style>
