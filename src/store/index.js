import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state, 
  getters,
  mutations,
  actions,
  modules: {
  }
})

// 새로고침 해도 로그인 유지
const { token } = localStorage
store.commit('LOGIN', token)

export default store