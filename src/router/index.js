// router.js
import Vue from 'vue';
import Router from 'vue-router';
// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Routes from './config';

Vue.use(Router);

export function createRouter() {
    let createRoute = new Router({
        mode: 'history',
        routes: Routes,
    });
    if (global.Window) {
        NProgress.configure({
            showSpinner: true,
        });
        createRoute.beforeEach((to, from, next) => {
            NProgress.start();
            next();
        });
        createRoute.afterEach(() => {
            console.log('---');
            NProgress.done();
        });
    }

    return createRoute;
}
