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
      /* 連接 API post 搜尋內容 */
      var url = 'http://localhost:8081/search'
      axios.post(url, {
        query: payload.search,
      }).then((response) => {
        /* 暫存 response.data 至 state.search */
        // console.log(response)
        commit('setIndex', response.data)
        /* Callback  searchComputed() */
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
