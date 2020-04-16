<template>
    <div class="home-wrapper flex-start">
        <!-- 侧边栏 -->
        <aside class="home-aside">
            <!-- 热门文章 -->
            <hot-article :hotList="homeList.hotList"></hot-article>
            <!-- 热门标签 -->
            <tag-list></tag-list>
            <!-- 图文推荐 -->
            <recommend-list :list="homeList.recommendList"></recommend-list>
        </aside>
        <div class="home-content">
            <!-- 轮播图 推荐文章 -->
            <section>
                <home-header></home-header>
            </section>

            <!-- 最新文章 热门文章 -->
            <section>
                <article-list :list="homeList"></article-list>
            </section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeHeader from './component/Header';
import ArticleList from './component/ArticleList';
import HotArticle from './component/HotArticle';
import TagList from './component/TagList';
import RecommendList from './component/RecommendList';
export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('article/getHomeList');
    },
    data: () => {
        return {};
    },
    computed: {
        ...mapGetters('article', ['homeList']),
    },
    mounted() {
        console.log(this.homeList);
    },
    components: {
        HomeHeader,
        ArticleList,
        HotArticle,
        TagList,
        RecommendList,
    },
};
</script>

<style lang="less" scope>
.home-wrapper {
    width: 970px;
    border-radius: 15px;
    background: #fefff7;
    align-items: flex-start;
    padding: 30px;
    .home-content {
        width: 650px;
        margin-left: 20px;
    }
    .home-aside {
        width: 290px;
    }
}
@media screen and (max-width: 768px) {
    .layout-wrapper {
        padding-bottom: 10px;
        .header {
            height: 215px;
        }
        .nav {
            width: 100%;
            top: 166px;
            ul {
                width: 100%;
                justify-content: space-around;

                li {
                    width: 20%;
                    font-size: 12px;
                    padding: 0;
                }
            }
        }
        .section {
            padding: 15px;
        }
    }

    .home-aside {
        display: none;
    }
    .home-wrapper {
        width: 100%;
        box-sizing: border-box;
        padding: 15px;
        .home-content {
            width: 100%;
            margin: 0;
            .article-now-list {
                padding-right: 0;
            }
            .list-item-bottom-cover {
                width: 70px !important;
                height: 70px !important;
                margin-right: 15px !important;
            }
            .article-now-list-container {
                li {
                    padding: 5px !important;
                }
            }
            .list-item-bottom-description {
                h3 {
                    margin-bottom: 5px !important;
                    font-size: 16px;
                }
                p {
                    -webkit-line-clamp: 2 !important;
                    margin-bottom: 0px !important;
                    font-size: 12px !important;
                    line-height: 20px;
                }
                .tag-blog {
                    display: none;
                }
            }
        }
    }
}
</style>
