import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  allData: [1, 2, 3]
}

const getters = {
  getAllData: state => state.allData
}

const actions = {
  getAllNotes ({ commit }) {
    axios.get('/notes').then(function (response) {
      commit(types.RECEIVE_NOTES, { notes: response.data.list })
    }).catch(function (error) {
      console.log(error)
    })
  }
}

const mutations = {
  [types.RECEIVE_NOTES] (state, { notes }) {
    state.allData = notes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
