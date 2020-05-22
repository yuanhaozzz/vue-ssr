<template>
    <div class="main-container">
        <div class="main-content flex-space-between">
            <!-- 左侧栏 -->
            <main-left></main-left>
            <!-- 路由 -->
            <section class="center-router entry-center">
                <transition name="translate">
                    <router-view  :key="key"></router-view>
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
    computed:{
	    key(){
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
            width: 53%;
        }
        .test{
             min-height: 100px;
                width: 22%;
        }
    }
}
</style>
<style>
.translate-enter-active,
.translate-leave-active {
    transition: all 1s;
}

.translate-enter /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(1200px);
}
.translate-leave-to {
    transform: translateY(1400px);
}

.translate-enter-to,
.translate-leave {
    transform: translateY(0px);
}


</style>
