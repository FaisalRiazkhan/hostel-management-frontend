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
        commit('setToken', token);
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
async logout({ commit, getters }) {
  try {
    const token = getters.token; // Assuming you have a getter for retrieving the authentication token
    await axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Clear user data and authentication flag from the state
    commit('setUser', null);
    commit('setAuthentication', false);
  } catch (error) {
    console.error('Logout failed', error);
  }
}
}

const getters = {
  // user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  token: (state) => state.token
}

export default {
  namespaced: true, // Ensure that this module is namespaced
  state,
  mutations,
  actions,
  getters
}
