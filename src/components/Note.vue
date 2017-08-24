<template>
  <div class="note-list">
    <div class="note-item" v-for="note in notes">
      <div class="note-title">{{note.title}}</div>
      <div class="note-der"></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['listNum'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
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
    }
  }
</script>
<style>

</style>
