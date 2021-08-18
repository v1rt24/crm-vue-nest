// @ts-nocheck
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Overview',
        component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue'),
        meta: {layout: 'Main', title: 'Главная', auth: true},
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        meta: {layout: 'Auth', title: 'Регистрация'},
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {layout: 'Auth', title: 'Авторизация'},
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: () => import(/* webpackChunkName: "analytics" */ '../views/Analytics.vue'),
        meta: {layout: 'Main', title: 'Аналитика', auth: true},
    },
    {
        path: '/history',
        name: 'History',
        component: () => import(/* webpackChunkName: "history" */ '../views/History.vue'),
        meta: {layout: 'Main', title: 'История', auth: true},
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
        meta: {layout: 'Main', title: 'Заказы', auth: true},
        children: [
            {
                path: '',
                name: 'OrderItems',
                component: () => import(/* webpackChunkName: "orderCategories" */ '../views/order/OrderCategories.vue'),
                meta: {layout: 'Main', title: 'Новые заказы', auth: true},
            },
            {
                path: ':id',
                name: 'OrderCategoryPage',
                component: () => import(/* webpackChunkName: "categoryPage" */ '../views/order/CategoryPage.vue'),
                meta: {layout: 'Main', title: 'Заказы', auth: true},
                props: true,
            },
        ],
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import(/* webpackChunkName: "categories" */ '../views/Categories.vue'),
        meta: {layout: 'Main', title: 'Категории', auth: true},
    },
    {
        path: '/categories/:id',
        name: 'Category',
        component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
        meta: {layout: 'Main', title: 'Категории', auth: true},
        props: true,
    },
    {
        path: '/categories/new',
        name: 'AddCategory',
        component: () => import(/* webpackChunkName: "addCategory" */ '../views/Category.vue'),
        meta: {layout: 'Main', title: 'Добавить категорию', auth: true},
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
    routes,
});

router.beforeEach((to, from) => {
    document.title = to.meta.title || '';

    const auth = to.meta.auth;
    const isAuth = store.getters['auth/isAuth'];

    if (auth && !isAuth) {
        return {
            name: 'Login',
            query: {message: 'auth'},
        };
    }
});

export default router;