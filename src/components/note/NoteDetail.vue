<template>
  <article class="page-container">
    <div class="page-content wrap clearfix">
      <div class="page-content-main fl">
        <div class="detail-wrap note-detail">
          <h1 class="title">{{data.title}}</h1>
          <div class="note-content">
            {{data.content}}
          </div>
          <DetailPage :prevData="prevNote" :nextData="nextNote"></DetailPage>
        </div>
      </div>
      <div class="page-content-aside fr">
        <Login></Login>
      </div>
    </div>
  </article>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Login from '../layout/login'
  import DetailPage from '../layout/DetailPage'

  export default {
    components: {
      Login,
      DetailPage
    },
    created () {
      this.$store.dispatch('getNoteDetailData', {
        id: this.$route.params.id
      })
    },
    mounted () {
    },
    computed: {
      ...mapGetters({
        data: 'getNoteDetailData',
        prevNote: 'getPrevNote',
        nextNote: 'getNextNote'
      })
    }
  }
</script>
<style lang="less" scoped>
  .detail-wrap {
    margin-top: 20px;
    padding: 10px 15px 15px;
    background-color: #f9f9f9;
    box-shadow: 0 1px 2px 0px rgba(0, 0, 0, 0.24);
    border: 1px solid #eee;
    .title {
      padding: 30px 0;
      text-align: center;
      font-size: 16px;
      font-weight: 900;
    }
    .note-content {
      line-height: 25px;
    }
  }
</style>
