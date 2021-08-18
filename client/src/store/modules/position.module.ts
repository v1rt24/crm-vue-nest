import {FetchQuery} from '../../utils/fetchQuery';

export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async getPositions({commit}: any, idCategory: number) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery(`api/positions/${idCategory}`);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        async addPosition({commit}: any, position: any) {
            commit('message/clearMessage', null, {root: true});

            try {
                const res = await FetchQuery('api/positions', 'POST', position);

                commit('message/setMessage', {
                    message: 'Позиция добавлена',
                }, {root: true});

                return res;
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        async update({commit}: any, position: any) {
            commit('message/clearMessage', null, {root: true});

            try {
                const res = await FetchQuery(`api/positions/${position.id}`, 'PATCH', position);

                commit('message/setMessage', {
                    message: 'Позиция обновлена',
                }, {root: true});

                return res;
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        async remove({commit}: any, id: number) {
            commit('message/clearMessage', null, {root: true});

            try {
                const res = <{ message: string }>await FetchQuery(`api/positions/${id}`, 'DELETE');

                commit('message/setMessage', {
                    message: res.message,
                }, {root: true});
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