import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('userToken'))
  },
  getters: {
    isLogin (state) {
      return !!state.user.token
    }
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.user.token = payload
      window.localStorage.setItem('userToken', JSON.stringify(payload))
    }
  },
  actions: {},
  modules: {}
})
