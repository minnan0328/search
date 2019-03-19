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
      var url = 'http://10.201.121.14:8081/search'
      // console.log(payload)
      axios.post(url, {
        query: payload,
      }).then((response) => {
        // console.log(response.data)
        commit('setIndex', response.data)
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
