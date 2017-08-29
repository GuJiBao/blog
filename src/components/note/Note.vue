<template>
  <div class="note-list">
    <div class="item" v-for="note in notes">
      <h3 class="title"><router-link :to="'/noteDetail/' + note._id" class="a-link">{{note.title}}</router-link></h3>
      <p class="descr">{{note.description | getChars(50)}}</p>
      <div class="tips"><span class="time">{{note.addTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
        <router-link :to="'/noteDetail/' + note._id" class="a-link">查看详情</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Filter from '../../assets/js/filters'

  export default {
    props: ['listNum'],
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('getNoteData', {
        limit: this.listNum
      })
    },
    computed: {
      ...mapGetters({
        notes: 'getNotes'
      })
    },
    filters: Filter
  }
</script>
<style lang="less" scoped>
  .note {
    &-list {
      padding: 0 15px 15px;
      .item {
        margin-top: 15px;
        padding: 10px 15px 15px;
        background-color: #f9f9f9;
        .title {
          height: 35px;
          line-height: 35px;
          border-bottom: 1px dashed #c7c8c9;
          font-size: 14px;
          font-weight: 900;
        }
        .descr {
          margin: 15px 0 10px;
          color: #666;
          font-size: 14px;
        }
        .tips {
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          .time {
            font-size: 12px;
            color: #999;
          }
          .a-link {
            float: right;
            font-size: 14px;
            color: #42b983;
          }
        }
      }
    }
  }
</style>
