<template>
    <div class="main-container">
        <div class="main-content flex-space-between">
            <!-- 左侧栏 -->
            <main-left></main-left>
            <!-- 路由 -->
            <section class="center-router">
                <transition name="translate">
                    <router-view :key="key"></router-view>
                </transition>
            </section>
            <!-- 右侧栏 -->
            <main-right></main-right>
        </div>
    </div>
</template>

<script>
import MainLeft from './MainLeft';
import MainRight from './MainRight';
export default {
    computed: {
        key () {
            return this.$route.path + Math.random();
        }
    },
    components: {
        MainLeft,
        MainRight,
    },
};
</script>

<style lang="less" scoped>
.main-container {
    padding-top: 20px;
    background-color: #f9f9ff;
    .main-content {
        max-width: 1200px;
        margin: 0 auto;
        align-items: flex-start;
        .center-router {
            width: 600px;
            position: relative;
            height: 100%;
        }
        .test {
            min-height: 100px;
            width: 22%;
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
