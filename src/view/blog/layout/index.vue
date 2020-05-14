<template>
    <div class="blog-wrapper">
        <blog-header></blog-header>
        <blog-main></blog-main>
        <!-- 返回顶部 -->
        <img :class="{'blog-content-rocket': true, 'rocket-show': rocketShow}" :src="rocket" alt="" @click="backToTop">
    </div>
</template>

<script>
import BlogHeader from './components/Header';
import BlogMain from './components/BlogMain';
import Rocket from '@/assets/images/rocket.svg'

export default {
     data: () => {
        return{
            rocket: Rocket,
            rocketShow: false
        }
    },
    mounted() {
        this.handleScroll()
    },
    methods: {
        /**
         * 滚动事件
         */
        handleScroll() {
            let that = this
            document.addEventListener('scroll', e => {
                let scrollTop = document.scrollTop || document.documentElement.scrollTop
                console.log(scrollTop)
                if (scrollTop > 400) {
                    that.rocketShow = true
                } else {
                    that.rocketShow = false
                }
            })
        },

        /**
         * 返回顶部
         */
        backToTop() {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            if (scrollTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = scrollTop - 30
                setTimeout(() => {
                    this.backToTop()
                }, 1000 / 60);
            }
            
        }
    },
    components: {
        BlogHeader,
        BlogMain,
    },
};
</script>

<style lang="less" scoped>
.blog-wrapper {
    height: 100%;
    background-color: #f9f9ff;
    .blog-content-rocket{
        position: fixed;
        bottom: -60px;
        right: 50px;
        width: 60px;
        cursor: pointer;
        transition: all 1s;
    }
    .rocket-show{
        bottom: 60px;
    }
}
</style>
