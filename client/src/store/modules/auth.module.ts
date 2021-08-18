// @ts-nocheck
import {FetchQuery} from '../../utils/fetchQuery';

const TOKEN = import.meta.env.VITE_TOKEN;

export default {
    namespaced: true,

    state: () => ({
        token: localStorage.getItem(TOKEN) || null,
    }),
    getters: {
        getToken(state) {
            return state.token;
        },
        isAuth(state) {
            return !!state.token;
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN, token);
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN);
        },
    },
    actions: {
        async register({commit}, payload) {
            commit('message/clearMessage', null, {root: true});

            try {
                const {token} = await FetchQuery('api/auth/register', 'POST', payload);
                commit('setToken', token);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        async login({commit}, payload) {
            commit('message/clearMessage', null, {root: true});

            try {
                const {token} = await FetchQuery('api/auth/login', 'POST', payload);
                commit('setToken', token);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
    },
};