<template>
    <div class="blog-wrapper">
        <blog-header></blog-header>
        <blog-main></blog-main>
        <!-- 返回顶部 -->
        <img :class="{ 'blog-content-rocket': true, 'rocket-show': rocketShow }"
             :src="rocket"
             alt=""
             @click="backToTop" />
        <loading />
    </div>
</template>

<script>
import BlogHeader from './components/Header';
import BlogMain from './components/BlogMain';
import Loading from '@/components/loading/Loading';
import Rocket from '@/assets/images/rocket.svg';
import { mapActions } from 'vuex';
export default {
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store
            .dispatch('article/getHomeList', { type: 0 })
            .then(() => store.dispatch('article/getStatisticst'));
    },
    data: () => {
        return {
            rocket: Rocket,
            rocketShow: false,
        };
    },
    mounted () {
        this.handleScroll();
    },
    methods: {
        /**
         * 滚动事件
         */
        handleScroll () {
            let that = this;
            document.addEventListener('scroll', (e) => {
                let scrollTop =
                    document.scrollTop || document.documentElement.scrollTop;
                if (scrollTop > 400) {
                    that.rocketShow = true;
                } else {
                    that.rocketShow = false;
                }
            });
        },

        /**
         * 返回顶部
         */
        backToTop () {
            let scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop =
                    scrollTop - 30;
                setTimeout(() => {
                    this.backToTop();
                }, 10);
            }
        },
        ...mapActions('article', ['getHomeList']),
    },
    components: {
        BlogHeader,
        BlogMain,
        Loading,
    },
};
</script>

<style lang="less" scoped>
.blog-wrapper {
    height: 100%;
    background-color: #f9f9ff;
    .blog-content-rocket {
        position: fixed;
        bottom: -60px;
        right: 50px;
        width: 60px;
        cursor: pointer;
        transition: all 1s;
    }
    .rocket-show {
        bottom: 60px;
    }
}
</style>
