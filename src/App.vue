<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            navList: [
                { name: '首页', routePath: '/home' },
                { name: '文章', routePath: '/article' },
                { name: '心情说说', routePath: '/mood' },
                { name: '个人档', routePath: '/self' },
                { name: '留言', routePath: '/message' },
            ],
            selectIndex: 0,
        };
    },
    methods: {
        handleJumpToRouter(item, index) {
            let { routePath } = item;
            this.$router.push({
                path: routePath,
            });
            this.selectIndex = index;
        },
    },
};
</script>
<style lang="less">
@import url(./assets/css/reset.less);
html,
body,
#app {
    height: 100%;
}
#app {
    position: relative;
    font-family: 'microsoft yahei';
}
</style>
