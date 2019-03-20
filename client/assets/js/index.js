import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    search: {}
  },
  actions: {
    postsearch({ commit }, payload) {
      var url = 'http://localhost:8081/search'
      axios.post(url, {
        query: payload.search,
      }).then((response) => {
        commit('setIndex', response.data)
        payload.searchCallback()
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mutations: {
    setIndex: (state, payload) => {
      state.search = payload
    }
  }
})
export default store
