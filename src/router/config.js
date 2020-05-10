let Layout = () => import('@/view/layout');
let Home = () => import('@/view/home');
let Article = () => import('@/view/article');
let Mood = () => import('@/view/mood');
let Self = () => import('@/view/self');
let Message = () => import('@/view/message');
// // 文章详情
// let ArticleDetail = () => import('@/view/home/page/ArticleDetail');
// 分享
let ShareDay = () => import('@/view/wechar/ShareLiChao');

// 重构首页
let contentLayout = () => import('@/view/blog/layout');
// 文章列表
let ArticleList = () => import('@/view/blog/article/list');
// 文章详情
let ArticleDetail = () => import('@/view/blog/article/detail');

export default [
    {
        path: '/',
        redirect: '/blog/content',
    },
    {
        path: '/blog/client',
        component: Layout,
        children: [
            {
                path: '',
                component: Home,
            },
            {
                path: 'home',
                component: Home,
            },
            {
                path: 'article',
                component: Article,
            },
            {
                path: 'mood',
                component: Mood,
            },
            {
                path: 'self',
                component: Self,
            },
            {
                path: 'message',
                component: Message,
            },
        ],
    },
    {
        path: '/blog/article/detail',
        component: ArticleDetail,
    },
    {
        path: '/blog/share/day',
        component: ShareDay,
    },
    {
        path: '/blog/content',
        component: contentLayout,
        children: [
            {
                path: '',
                component: ArticleList,
            },
            {
                path: 'detail',
                component: ArticleDetail,
            },
        ],
    },
];
