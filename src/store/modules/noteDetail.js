import axios from 'axios'
import * as types from '../mutation-types'

const state = {
  data: ''
}

const getters = {
  getNoteDetailData: state => state.data.data,
  getPrevNote: state => state.data.prevNote,
  getNextNote: state => state.data.nextNote
}

const actions = {
  getNoteDetailData ({commit}, params) {
    axios.get('/api/getNoteDetail', {
      params: {
        id: params.id
      }
    }).then(function (response) {
      commit(types.RECEIVE_NOTEDETAIL, {data: response.data.returnData})
    }).catch(function (error) {
      console.log(error)
    })
  }
}

const mutations = {
  [types.RECEIVE_NOTEDETAIL] (state, {data}) {
    state.data = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

