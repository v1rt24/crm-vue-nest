// @ts-nocheck

import {FetchQuery} from '../../utils/fetchQuery';

export default {
    namespaced: true,
    state: () => ({
        list: [],
        offset: 0,
        limit: +import.meta.env.VITE_LIMIT,
        order: '',
        start: '',
        end: '',
    }),
    getters: {
        getList: state => state.list,
        allPrise: state => state.list.reduce((acc, prod) => acc += (prod.cost * prod.quantity), 0),
    },
    mutations: {
        // Добавление позиции в заказ
        add(state, position) {
            const candidate = state.list.find(el => el.id === position.id);

            if (!candidate) {
                state.list.push(position);
            } else {
                candidate.quantity += position.quantity;
            }
        },
        // Удаление позиции из заказа
        remove(state, id) {
            const idx = state.list.findIndex(el => el.id === id);

            if (state.list[idx]) {
                state.list.splice(idx, 1);
            }
        },
        // Очистка заказа
        clear(state) {
            state.list = [];
        },
        // Изменение пагинации
        setOffset(state, offset) {
            state.offset = offset;
        },
        // Установка фильтрации
        setDataFilter(state, {order, start, end}) {
            state.order = order;
            state.start = start;
            state.end = end;
        },
    },
    actions: {
        // Получение позиций категории
        async positionLists({commit}, id) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery(`api/positions/${id}`);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        // Создание заказа
        async create({commit}, orders) {
            commit('message/clearMessage', null, {root: true});

            try {
                const order = orders.map(item => {
                    delete item.category_id;
                    delete item.id;
                    delete item.user_id;

                    return item;
                });

                const res = await FetchQuery('api/orders', 'POST', order);

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
        // Для подгрузки заказов по клику на кнопку
        async actionSetOffset({state, commit, dispatch}) {
            const offset = state.offset += state.limit;
            commit('setOffset', offset);
            return await dispatch('orderAll');
        },
        // Получение всех заказов пользователя
        async orderAll({state, commit}) {
            commit('message/clearMessage', null, {root: true});

            let filterData = '';

            if (state.order) {
                filterData += `order=${state.order}&`;
            }

            if (state.start) {
                filterData += `start=${state.start}&`;
            }

            if (state.end) {
                filterData += `end=${state.end}&`;
            }

            try {
                return await FetchQuery(`api/orders?${filterData}offset=${state.offset}&limit=${state.limit}`);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        /*async orderAll({state, commit}, payload) {
            commit('message/clearMessage', null, {root: true});

            let filterData = '';

            if (payload) {
                const {order, start, end} = payload;

                if (order) {
                    filterData += `order=${order}&`;
                }

                if (start) {
                    filterData += `start=${start}&`;
                }

                if (end) {
                    filterData += `end=${end}&`;
                }
            }

            try {
                return await FetchQuery(`api/orders?${filterData}offset=${state.offset}&limit=${state.limit}`);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },*/
    },
};