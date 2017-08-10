import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import menus from './modules/menus'
import login from './modules/login'
import notes from './modules/notes'

Vue.use(Vuex)

const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    menus,
    login,
    notes
  }
})

export default store
