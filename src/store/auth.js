// store/auth.js
const state = {
  user: null,
  isAuthenticated: !!localStorage.getItem('authenticated'),
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
    if (isAuthenticated) {
      localStorage.setItem('authenticated', 'true'); // Store flag in localStorage upon successful login
    } else {
      localStorage.removeItem('authenticated'); // Remove flag from localStorage upon logout
    }
  }
}

const actions = {
  login({ commit }, { username, password }) {
    // In a real-world scenario, validate the credentials with a backend
    if (username === 'demo' && password === 'password') {
      commit('setUser', { username })
      commit('setAuthentication', true)
      return true
    } else {
      return false
    }
  },
  logout({ commit }) {
    commit('setUser', null)
    commit('setAuthentication', false)
  }
}

const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated
}

export default {
  namespaced: true, // Ensure that this module is namespaced
  state,
  mutations,
  actions,
  getters
}
