// @ts-nocheck

export default {
    namespaced: true,

    state: () => ({
        message: null,
    }),
    getters: {
        getMessage: state => state.message,
    },
    mutations: {
        setMessage(state, message) {
            state.message = message;
        },
        clearMessage(state) {
            state.message = null;
        },
    },
    actions: {},
};