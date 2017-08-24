<template>
  <article class="page-container">
    <div class="page-content wrap clearfix">
      <div class="page-content-main fl">
        <section class="g-panel home-notes">
          <div class="g-panel-title"><h3>笔记列表</h3></div>
          <div class="g-panel-content">
            <Note listNum="2"/>
          </div>
        </section>
      </div>
      <div class="page-content-aside fr">
        <Login></Login>
      </div>
    </div>
  </article>
</template>

<script>
  import Login from './layout/login'
  import Note from './Note.vue'

  export default {
    components: {
      Login,
      Note
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @bClor: #42b983;
  @bClorH: #48d69a;

  .fa-title {
    margin-right: 5px;
    font-size: 16px;
    color: @bClor;
  }

  .g-panel {
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.24);
    &-title {
      padding: 0 15px;
      background-color: #f9f9f9;
      border-bottom: 1px solid rgba(0, 0, 0, .07);
      box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.07);
      h3 {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
    &-body {
      padding: 15px;
    }
  }
  .home-notes {
    margin-top: 20px;
    border: 1px solid #eee;

  }

  /*侧边栏*/
  .r-aside {
    width: 100%;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.24);
    border: 1px solid #eee;
    &-title {
      height: 40px;
      background-color: #f9f9f9;
      h3 {
        line-height: 40px;
        text-indent: 10px;
        font-size: 16px;
      }
    }
  }

</style>
