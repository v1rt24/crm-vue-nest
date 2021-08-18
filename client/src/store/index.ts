import {createStore, createLogger} from 'vuex';

import message from './modules/message.module';
import auth from './modules/auth.module';
import categories from './modules/categories.module';
import position from './modules/position.module';
import order from './modules/order.module';
import analytics from './modules/analytics.module';

export default createStore({
    state: {},
    mutations: {},
    getters: {},
    actions: {},
    modules: {
        message,
        auth,
        categories,
        position,
        order,
        analytics,
    },
    // plugins: [createLogger()],
});