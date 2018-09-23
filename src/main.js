// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import { router, appRouter } from './router';
import store from './store'
import axios from '@/api/axios.config.js'
import iView from 'iView';
import 'iview/dist/styles/iview.css';
import moment from 'moment';

Vue.use(iView);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created() {
        this.$store.commit('app/setLeftMenuList', appRouter);
        // this.$store.dispatch('app/filterLeftMenus', appRouter);
    }
})
