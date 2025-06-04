import {createStore} from "vuex";

const store = createStore({
    state: {
        token: localStorage.getItem('token') || null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        removeToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        },
    }
});

export default store;