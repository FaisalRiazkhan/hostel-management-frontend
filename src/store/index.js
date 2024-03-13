// store/index.js
import { createStore } from 'vuex';
import authModule from './auth';
const store = createStore({
    modules: {
        auth: authModule,
      },
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setAuthentication(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    login({ commit }) {
      // Perform your login logic (e.g., API call)
      commit('setAuthentication', true);
    },
    logout({ commit }) {
      // Perform your logout logic (e.g., clear tokens)
      commit('setAuthentication', false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
