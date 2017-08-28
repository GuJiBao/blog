import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NoteDetail from '@/components/note/NoteDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/noteDetail/:id',
      name: 'noteDetail',
      component: NoteDetail
    }
  ]
})
