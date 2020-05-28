<template>
    <div class="main-container">
        <div class="main-content flex-space-between">
            <!-- 左侧栏 -->
            <main-left></main-left>
            <!-- 路由 -->
            <section :class="{'center-router': true, 'action': sidebar}">
                <!-- 移动端浮层 -->
                <div class="content-layer"
                     v-if="sidebar"
                     @click.stop="hideSidebar"></div>
                <transition name="translate">
                    <router-view :key="key"></router-view>
                </transition>
            </section>
            <!-- 右侧栏 -->
            <main-right></main-right>

        </div>
        <!-- 移动端侧边栏 -->
        <sidebar />
    </div>
</template>

<script>
import MainLeft from './MainLeft';
import MainRight from './MainRight';
import Sidebar from './Sidebar';
import { mapGetters } from 'vuex'
export default {
    methods: {
        hideSidebar () {
            this.$store.commit('article/showSidebar', !this.sidebar)
        }
    },
    components: {
        MainLeft,
        MainRight,
        Sidebar
    },
    computed: {
        key () {
            return this.$route.path + Math.random();
        },
        ...mapGetters('article', ['sidebar'])
    }
};
</script>

<style lang="less" scoped>
.main-container {
    padding-top: 20px;
    background-color: #f9f9ff;
    height: 100%;
    .main-content {
        max-width: 1200px;
        margin: 0 auto;
        align-items: flex-start;
        height: 100%;
        .center-router {
            width: 600px;
            position: relative;
            overflow-y: scroll;
            height: 100%;
        }
        .test {
            min-height: 100px;
            width: 22%;
        }
    }
}
@media screen and (max-width: 756px) {
    .main-container {
        padding-top: 0px;
        .center-router {
            width: 600px;
            position: relative;
            overflow-y: scroll;
            height: 100%;
            transition: all 0.4s;
        }
        .action {
            transform: translate(260px, 0);
            opacity: 0.8;
            filter: blur(5px);
        }
        .content-layer {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 999;
            height: 100%;
            width: 100%;
            opacity: 0;
        }
    }
}
</style>
<style>
.translate-enter-active,
.translate-leave-active {
    transition: all 0.4s;
}

.translate-enter,
.translate-leave-to {
    opacity: 0;
}

.translate-enter-to,
.translate-leave {
    transition-delay: 0.4s;
    opacity: 1;
}
</style>
