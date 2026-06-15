import { createStore } from 'vuex';

const TOKEN_KEY = 'token';

/**
 * Store mínimo para la sesión local. El "token" es simplemente una marca de
 * autenticación persistida en localStorage (autenticación local sencilla).
 */
const store = createStore({
  state: {
    token: localStorage.getItem(TOKEN_KEY) || null,
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem(TOKEN_KEY, token);
    },
    removeToken(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export default store;
