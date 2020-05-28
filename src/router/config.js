// 重构首页
let contentLayout = () => import('@/view/blog/layout');
// 文章列表
let ArticleList = () => import('@/view/blog/article/list');
// 文章详情
let ArticleDetail = () => import('@/view/blog/article/detail');
// 留言板
let Message = () => import('@/view/blog/message');

// 测试
let Test = () => import('@/view/test');

export default [
    {
        path: '/',
        redirect: '/blog/content',
    },
    {
        path: '/test',
        component: Test,
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
            {
                path: 'message',
                component: Message,
            },
        ],
    },
];
