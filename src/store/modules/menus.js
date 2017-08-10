import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  menus: []
}

const getters = {
  getMenus: state => state.menus
}

const actions = {
  getMenus ({ commit }) {
    axios.get('/api/menus').then(function (response) {
      commit(types.RECEIVE_MENUS, { menus: response.data.data })
    }).catch(function (error) {
      console.log(error)
    })
  }
}

const mutations = {
  [types.RECEIVE_MENUS] (state, { menus }) {
    state.menus = menus
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
