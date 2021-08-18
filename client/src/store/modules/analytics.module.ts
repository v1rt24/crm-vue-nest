// @ts-nocheck

import {FetchQuery} from '../../utils/fetchQuery';

export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async getOverview({commit}) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery('api/analytics/overview');
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        async getAnalytics({commit}) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery('api/analytics/analytics');
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