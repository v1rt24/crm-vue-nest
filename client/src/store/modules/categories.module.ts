// //@ts-nocheck
import {FetchQuery} from '../../utils/fetchQuery';

export default {
    namespaced: true,
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        // Получение всех категорий
        async categoriesAll({commit}: any) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery('api/categories');
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        // Получение одной категории
        async getById({commit}: any, id: string) {
            commit('message/clearMessage', null, {root: true});

            try {
                return await FetchQuery(`api/categories/${id}`);
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        // Создание категории
        async create({commit}: any, {name, imageSrc}: any) {
            commit('message/clearMessage', null, {root: true});

            try {
                const formData = new FormData();
                formData.append('name', name);
                if (imageSrc) {
                    formData.append('imageSrc', imageSrc, imageSrc.name);
                }

                await FetchQuery('api/categories', 'POST', formData);

                commit('message/setMessage', {
                    message: 'Категория добавлена',
                }, {root: true});
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        // Обновление категории
        async update({commit}: any, {id, name, imageSrc}: any) {
            commit('message/clearMessage', null, {root: true});

            try {
                const fd = new FormData();
                fd.append('name', name);
                if (imageSrc) {
                    fd.append('imageSrc', imageSrc, imageSrc.name);
                }

                await FetchQuery(`api/categories/${id}`, 'PATCH', fd);

                commit('message/setMessage', {
                    message: 'Категория обновлена',
                }, {root: true});
            } catch (error) {
                commit('message/setMessage', {
                    type: 'error',
                    message: error.message,
                }, {root: true});
                throw error;
            }
        },
        // Удаление категории
        async deleteCat({commit}: any, id: string) {
            commit('message/clearMessage', null, {root: true});

            try {
                await FetchQuery(`api/categories/${id}`, 'DELETE');

                commit('message/setMessage', {
                    message: 'Категория удалена',
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