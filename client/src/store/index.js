import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            email: '',
            uid: '',
            photoURL: '',
        },
    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        },
    },
    actions: {
        setUser({ commit }, value) {
            commit('setUser', value);
        },
    },
    modules: {},
});
