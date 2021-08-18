import {createApp} from 'vue';
import App from './App.vue';

import './assets/materialize/fonts/icon.css';
import './assets/materialize/materialize.min.css';
import './assets/scss/style.scss';

import router from './router';
import store from './store';

import Plugins from './utils/plugins';

const app = createApp(App);

// Директивы
import {toolTip} from './directives/directives';

// @ts-ignore
app.directive('toolTip', toolTip);
// /Директивы

app.use(router);
app.use(store);
app.use(Plugins);

app.mount('#app');
