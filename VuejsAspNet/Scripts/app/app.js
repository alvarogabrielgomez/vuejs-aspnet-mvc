import Vue from 'vue';
import { store } from './store';
import { router } from './helpers';
import App from './components/App';
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';

Vue.use(Donut);

window.custom = require('./custom');
window.axios = require('axios');

Vue.config.productionTip = false;

window.axios.defaults.headers.common = {
    //'X-CSRF-TOKEN': window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

Vue.component('dashboard-layout', require('./components/home/dashboard-layout.vue').default);
Vue.component('dashboard-ficha', require('./components/home/dashboard-ficha.vue').default);
Vue.component('dashboard-historico', require('./components/home/dashboard-historico.vue').default);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});