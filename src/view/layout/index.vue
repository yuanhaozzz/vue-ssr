<template>
    <div class="layout-wrapper">
        <header class="header"></header>
        <nav class="nav flex-center">
            <ul class="flex-start">
                <li
                    :class="{
                        'flex-center': true,
                        select: selectIndex === index,
                    }"
                    @click="handleJumpToRouter(item, index)"
                    v-for="(item, index) of navList"
                    :key="index"
                >
                    {{ item.name }}
                </li>
            </ul>
        </nav>
        <section class="section flex-center">
            <transition name="fade">
                <router-view />
            </transition>
        </section>
    </div>
</template>
<script>
export default {
    data: () => {
        return {
            navList: [
                { name: '首页', routePath: '/blog/client/home' },
                { name: '文章', routePath: '/blog/client/article' },
                { name: '心情说说', routePath: '/blog/client/mood' },
                { name: '个人档', routePath: '/blog/client/self' },
                { name: '留言', routePath: '/blog/client/message' },
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
.layout-wrapper {
    position: relative;
    background-color: #f0d0a9;
    padding-bottom: 50px;
    .header {
        height: 330px;
        background: url('~@/assets/images/header-background.jpg') center 0
            scroll no-repeat;
    }
    .nav {
        height: 50px;
        width: 100%;
        position: absolute;
        top: 280px;
        left: 0;
        background-color: rgba(154, 108, 58, 0.5);
        user-select: none;
        ul {
            li {
                height: 50px;
                width: 90px;
                transition: all 0.5s;
                padding: 0 30px;
                cursor: pointer;
                color: #fff;
                font-weight: 900;
            }
            li:hover {
                background-color: #dcba9a;
                border-radius: 60px 0;
            }
            .select {
                color: #f2cb94;
            }
        }
    }
    .section {
        padding-top: 15px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.fade-leave {
    opacity: 1;
}
</style>
