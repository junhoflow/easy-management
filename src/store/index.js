import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: true,
    fireUser: null,
    title: '원래제목',
    user: null,
    token: ''
  },
  mutations: {
    setEdit (state, edit) {
      state.editable = edit
    },
    setFireUser (state, fireU) {
      state.fireUser = fireU
    },
    setTitle (state, p) {
      state.title = p
    },
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    getUser ({ commit }, user) {
      commit('setUser', user)
      if (!user) return
      user.getIdToken()
        .then(token => {
          commit('setToken', token)
        })
    }
  },
  modules: {
  }
})
