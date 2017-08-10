import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  userInfo: {}
}

const getters = {
  getUserInfo: state => state.userInfo
}

const actions = {
  getLoginInfo ({ commit }) {
    axios.get('/api/user/login').then(function (result) {
      let obj = result.data
      if (!obj.code) {
        commit(types.RECEIVE_LOGININFO, { userInfo: {
          loginStatus: true,
          name: obj.userName,
          isAdmin: obj.isAdmin
        } })
      } else {
        commit(types.RECEIVE_LOGININFO, { userInfo: {
          loginStatus: false
        } })
      }
    })
  }
}

const mutations = {
  [types.RECEIVE_LOGININFO] (state, { userInfo }) {
    state.userInfo = userInfo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
