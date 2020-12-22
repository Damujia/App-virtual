import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orderData: {},
    badData: {},
    stockData: {},
    detailData: {}
  },
  mutations: {
    setorder (state, data) {
      state.orderData = data
    },
    setbad (state, data) {
      state.badData = data
    },
    setstock (state, data) {
      state.stockData = data
    },
    setdetail(state, data) {
      state.detailData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
