import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import login from './modules/login'
import notes from './modules/notes'
import noteDetail from './modules/noteDetail'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    login,
    notes,
    noteDetail
  }
})

export default store
