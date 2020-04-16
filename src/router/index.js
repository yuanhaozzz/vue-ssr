// router.js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let Layout = () => import('@/view/layout');
let Home = () => import('@/view/home');
let Article = () => import('@/view/article');
let Mood = () => import('@/view/mood');
let Self = () => import('@/view/self');
let Message = () => import('@/view/message');
// 文章详情
let ArticleDetail = () => import('@/view/home/page/ArticleDetail');
// 分享
let ShareDay = () => import('@/view/wechar/ShareLiChao');

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                redirect: '/client/home'
            },
            {
                path: '/client',
                component: Layout,
                children: [
                    {
                        path: '',
                        component: Home
                    },
                    {
                        path: 'home',
                        component: Home
                    },
                    {
                        path: 'article',
                        component: Article
                    },
                    {
                        path: 'mood',
                        component: Mood
                    },
                    {
                        path: 'self',
                        component: Self
                    },
                    {
                        path: 'message',
                        component: Message
                    }
                ]
            },
            {
                path: '/article/detail',
                component: ArticleDetail
            },
            {
                path: '/share/day',
                component: ShareDay
            }
        ]
    });
}
