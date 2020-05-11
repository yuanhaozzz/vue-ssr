import { createApp } from './app';
import Vue from 'vue';
import { Button, Table, Icon } from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Icon', Icon);

const { app, router, store } = createApp();
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c);
        });

        if (!activated.length) {
            return next();
        }
        console.log('start loading');
        // 这里如果有加载指示器 (loading indicator)，就触发

        Promise.all(
            activated.map(c => {
                if (c.asyncData) {
                    return c.asyncData({ store, route: to });
                }
            })
        )
            .then(() => {
                console.log('end loading');
                // 停止加载指示器(loading indicator)

                next();
            })
            .catch(next);
    });

    app.$mount('#app');
});
