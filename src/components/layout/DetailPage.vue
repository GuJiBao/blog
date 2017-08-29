<template>
  <div class="detail-page clearfix">
    <router-link :to="prevUrl" @click.native="flushPage" class="fl">上一篇: {{pTitle}}</router-link>
    <router-link :to="nextUrl" @click.native="flushPage" class="fr">下一篇：{{nTitle}}</router-link>
  </div>
</template>

<script>
  export default {
    props: ['prevData', 'nextData'],
    data () {
      return {
        prevUrl: this.prevData ? '/noteDetail/' + this.prevData._id : '',
        pTitle: this.prevData ? this.prevData.title : '没有了',
        nextUrl: this.nextData ? '/noteDetail/' + this.nextData._id : '',
        nTitle: this.nextData ? this.nextData.title : '没有了'
      }
    },
    methods: {
      flushPage: function () {
        this.$router.go(0)
      }
    }
  }
</script>

<style lang="less" scoped>
  .detail-page{
    margin-top: 20px;
  }
</style>
