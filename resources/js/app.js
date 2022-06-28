window.Vue = require('vue').default;

import router from './router';
import Vuex from 'vuex'
import storeData from "./store/index"
import App from './layouts/App.vue';

Vue.use(Vuex)

Vue.component('notes', require('./components/Notes.vue').default);

const store = new Vuex.Store(
    storeData
)

const app = new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
