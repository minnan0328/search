import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    index: {}
  },
  actions: {
    postAdmin({ commit }, payload) {
      var url = 'http://10.201.80.73/search'
      axios.post(url, {
        query: '柯文哲',
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  mutations: {
    // setIndex: (state, payload) => {
    //   state.index = payload
    // }
  }
})
export default store
