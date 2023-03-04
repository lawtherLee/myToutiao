import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'TOUTIAO',
      reducer ({ histories }) {
        return { histories }
      }
    })
  ],
  state: {
    user: JSON.parse(window.localStorage.getItem('userToken')) || {},
    myChannels: [],
    histories: []
  },
  getters: {
    isLogin (state) {
      return !!state.user.token
    }
  },
  mutations: {
    SET_TOKEN (state, payload) {
      // state.user = payload
      window.localStorage.setItem('userToken', JSON.stringify(payload))
    },
    SET_MY_CHANNEL (state, channels) {
      state.myChannels = channels
    },
    // 搜索历史
    SET_HISTORIES (state, histories) {
      state.histories = histories
    }
  },
  actions: {},
  modules: {}
})
