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
      var url = 'http://10.201.80.73/search'
      axios.post(url, {
        query: '柯文哲',
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
      getSearchInfo({ commit}, payload) {
        var url = '../../../static/data/search.json'
        axios.get(url)
          .then((res) => {
            console.log(res.data)
              // commit('setAllConfig', payloads)
          }).catch((error) => {
              console.log(error)
          })
      },
  },
  mutations: {
    // setIndex: (state, payload) => {
    //   state.search = payload
    // }
  }
})
export default store
