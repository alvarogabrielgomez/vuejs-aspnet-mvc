import Vue from "vue";
import Vuex from "vuex";
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
    //mode: 'history',
    //base: __dirname,
    routes: [
        { path: '/', component: () => import('../components/home/home.vue') },
        { path: '/home', component: () => import('../components/home/home.vue') },
        { path: '/login', component: () => import('../components/login/login.vue') },
        { path: '/logout', component: () => import('../components/login/logout.vue') },

        // otherwise redirect to home
        { path: '*', redirect: '/' }

    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if (loggedIn && to.path === '/login') {
        return next('/home');
    }

    next();
});