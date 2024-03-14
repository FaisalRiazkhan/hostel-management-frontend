import axios from 'axios';
// store / auth.js
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
  async login({ commit }, { email, password }) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
        const { token } = response.data;
        
        // Fetch user details using the obtained token
        const userResponse = await axios.get('http://127.0.0.1:8000/api/logged_user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = userResponse.data;
        commit('setUser', user);
        commit('setAuthentication', true);
        return true;
    } catch (error) {
        console.error('Login failed', error);
        return false;
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
