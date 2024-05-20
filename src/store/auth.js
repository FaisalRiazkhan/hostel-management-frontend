import axios from 'axios'
// store / auth.js

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: localStorage.getItem('authenticated') === 'true',
  token: localStorage.getItem('token'), // Add token to the state
  permissions: []
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  },
  setUser(state, user) {
    state.user = user
    // Update authenticated state based on user presence
    state.authenticated = !!user
    localStorage.setItem('user', JSON.stringify(user))
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setAuthentication(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
    if (isAuthenticated) {
      localStorage.setItem('authenticated', 'true') // Store flag in localStorage upon successful login
    } else {
      localStorage.setItem('authenticated', 'false') // Remove flag from localStorage upon logout
    }
  },
  logout(state) {
    // console.log('Logging out...'); // Log the logout action
    state.user = null
    state.token = null
    // state.authenticated = false;
    // Clear any other authentication-related state variables
    localStorage.removeItem('authenticated')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('Logout completed.') // Log completion of logout
  }
}

const actions = {
  async login({ commit }, { email, password }) {
    try {
        const response = await axios.post('login', { email, password });
        const { token } = response.data;
        commit('setToken', token);
        // Fetch user details using the obtained token
        const userResponse = await axios.get('logged_user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

      const user = userResponse.data
      // console.log('user data on login:', user);
      commit('setUser', user)
      commit('setAuthentication', true)
      return true
    } catch (error) {
      console.error('Login failed', error)
      return false
    }
  },
  async logout({ commit, state }) {
    try {
      const token = state.token
      // console.log('Token before logout request:', token);
      if (!token) {
        throw new Error('Authentication token is not available')
      }
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      // Clear the token from local storage
      localStorage.removeItem('token')
      commit('setAuthentication', false)

      commit('logout')
    } catch (error) {
      console.error('Logout failed', error)
    }
  },

  async fetchUser({ commit, state }) {
    try {
      const token = state.token
      if (!token) {
        throw new Error('Authentication token is not available')
      }
      const response = await axios.get('logged_user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const user = response.data
      commit('setUser', user)
      commit('setPermissions', user.permissions || [])
      console.log('fetched user data:', user)
    } catch (error) {
      console.error('Failed to fetch user', error)
      commit('logout') 
    }
  }
}

const getters = {
  // user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
  token: (state) => state.token,
  getUser: (state) => state.user,
  getPermissions: (state) => state.permissions,
  hasPermission: (state) => (permission) => state.permissions.includes(permission)
}

export default {
  namespaced: true, // Ensure that this module is namespaced
  state,
  mutations,
  actions,
  getters
}
