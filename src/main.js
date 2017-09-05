// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-default/index.css';
import locale from 'element-ui/lib/locale/lang/fr';
import App from './App'
import router from './router'
import VueYouTubeEmbed from 'vue-youtube-embed';
import BigTitle from './components/utils/BigTitle.vue';
import { store } from './store/store';
import VueSocketio from 'vue-socket.io';
import Clipboard from 'v-clipboard';
Vue.use(VueSocketio, 'http://localhost:4001');
Vue.use(VueYouTubeEmbed);
Vue.use(BigTitle);
Vue.use(ElementUI, { locale });
Vue.use(Clipboard);

Vue.config.productionTip = false;



const token = localStorage.getItem('token');

if (token) {
    //we need to update application state
    store.commit('granted', localStorage.getItem('user'));
    store.commit('role', localStorage.getItem('role'));
}

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    if (to.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.requiresAdmin)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.auth.logged || store.getters.auth.role !== 'admin') {
            next({
                path: '/signin',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.auth.logged) {
            next({
                path: '/signin',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }

    } else {
        next();
    }
})
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});