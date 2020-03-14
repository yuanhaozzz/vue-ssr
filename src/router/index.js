// router.js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let Home = () => import('@/view/home');
let Article = () => import('@/view/article');
let Mood = () => import('@/view/mood');
let Self = () => import('@/view/self');
let Message = () => import('@/view/message');

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                redirect: '/home'
            },
            {
                path: '/home',
                component: Home
            },
            {
                path: '/article',
                component: Article
            },
            {
                path: '/mood',
                component: Mood
            },
            {
                path: '/self',
                component: Self
            },
            {
                path: '/message',
                component: Message
            },
        ]
    });
}