import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
axios.defaults.baseURL = 'https://iapitest.eva.guru'
if (localStorage.getItem('token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
}

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null
  },
  mutations: {
    saveUser (state, val) {
      localStorage.setItem('user', JSON.stringify(val))
      state.user = val
    },
    saveToken (state, val) {
      localStorage.setItem('token', val)
      state.token = val
      axios.defaults.headers.common.Authorization = `Bearer ${val}`
    },
    resetData (state) {
      state.user = null
      state.token = null
      localStorage.clear()
    }
  },
  getters: {
    isLoggedIn (state) {
      return !!state.user
    }
  },
  actions: {
    loginAttemp ({ commit }, user) {
      return new Promise((resolve, reject) => {
        return axios.post('user/auth', user)
          .then((response) => {
            if (response.data.ApiStatusCode === 200) {
              commit('saveToken', response.data.Data.token)
              commit('saveUser', response.data.Data.user)
              resolve(response.data.Data.user)
            } else {
              reject(response.data.ApiStatusMessage)
            }
          })
          .catch((er) => reject(er.message))
      })
    },
    logout ({ commit }) {
      commit('resetData')
    },
    getData () {
      const obj = {
        marketplace: 'Amazon.com',
        sellerId: 'A2AYEFBRNOKNF9'
      }
      return axios.post('/data/sales-finances', obj).then((response) => {
        return response.data
      })
    }
  },
  modules: {}
})
