<template>
  <article class="page-container">
    <div class="page-content wrap clearfix">
      <div class="page-content-main fl">
        <section class="g-panel notes-box" v-for="item in notesData">
          <div class="g-panel-title">
            <h3 class="title"><a href="#"><i class="fa fa-header fa-title"></i>{{ item.title }}</a></h3>
          </div>
          <div class="g-panel-body">
            <p class="text">
              {{ item.details | substr }}
            </p>
            <div class="notes-box-foot clearfix">
              <a href="#" class="a-more">更多...</a>
            </div>
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
  import { mapGetters } from 'vuex'
  import Login from './layout/login'
  export default {
    components: {
      Login
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created () {
      this.$store.dispatch('getAllNotes')
    },
    computed: {
      ...mapGetters({
        notesData: 'getAllData'
      })
    },
    filters: {
      substr: function (value) {
        if (!value) return ''
        return value.substr(0, 100) + '...'
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
      }
    }
    &-body {
      padding: 15px;
    }
  }
  .notes-box {
    margin-top: 20px;
    border: 1px solid #eee;
    .title {
      font-size: 16px;
    }
    .text {
      padding-bottom: 15px;
      border-bottom: 1px dashed #ddd;
      text-indent: 25px;
      line-height: 22px;
      font-size: 14px;
      color: #666;
    }
    &-foot {
      padding: 15px 0 0;
      .a-more {
        float: right;
        margin-right: 25px;
        color: @bClor;
        &:hover {
          color: @bClorH;
        }
      }
    }
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
