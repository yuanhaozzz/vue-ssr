<template>
    <div class="article-list-container">
        <!-- 选项卡 -->
        <section class="article-list-tab">
            <ul class="flex-space-around">
                <li :class="{'action': index === tabIndex}" v-for="(item, index) of tabList" :key="index" @click="switchTab(item, index)">{{item.name}}</li>
            </ul>
        </section>
        <!-- 文章列表 -->
        <section class="article-list-content">
            <template v-if="homeList.list.length > 0">
                <div v-for="(item, index) of homeList.list"  :key="index" @click="jumpToDetail(item)">
                    <article-itme :article="item"></article-itme>
                </div>
            </template>
            <template v-else>
                <p class="article-list-content-empty">敬请期待</p>
            </template>
        </section>
        <!-- 加载组件 -->
        <loading  v-show="isLoad"/>
        <!-- 弹窗详情 -->
        <LayerDetail ref="detail"/>
    </div>
</template>

<script>
import ArticleItme from './components/ArticleItem'
import Loading from '@/components/loading/Loading'
import LayerDetail from '../detail/components/detail'
import {mapGetters} from 'vuex'
export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('article/getHomeList', {type:0});
    },
    data: () => {
        return {
            tabIndex: 0,
            tabList: [
                {name: '全部', type: 0},
                {name: '最新', type: 1},
                {name: '最热', type: 2},
                {name: '源码', type: 3},
                {name: '面试题', type: 4},
                ],
            isLoad: false
        }
    },
    methods: {
        /**
         * 选项卡切换
         * @param {Number} index 选中下标
         */
         switchTab(item, index) {
             let {type} = item
             this.isLoad = true
             this.$nextTick(() => {
                 this.$store.dispatch('article/getHomeList', {type}).then(res => {
                    setTimeout(() => {
                        this.isLoad = false
                    }, 400);
                })
                this.tabIndex = index
            })
         },

         /**
          * 跳转详情
          */
          jumpToDetail(item) {
              this.$refs.detail.openLayer(item)
          }
    },
     computed: {
        ...mapGetters('article', ['homeList']),
    },
    mounted() {
        console.log(this.homeList.list, '---------');
    },
    components: {
        ArticleItme,
        Loading,
        LayerDetail
    },
};
</script>

<style lang="less" scoped>
.article-list-container {
    .article-list-tab{
        margin-bottom: 20px;
        border-radius: 5px;
        background: #fff;
        background-color: #fff;

        ul{
            padding: 0 10px;
            li{
                margin: 0 10px;
                height: 35px;
                min-width: 56px;
                color: #99a2aa;
                text-align: center;
                font-size: 14px;
                line-height: 35px;
                position:relative;
            }
            .action{
                border-bottom: 2px solid #a1a1a1;
            }
        }
    }
    .article-list-content{
        .article-list-content-empty{
            font-size: 25px;
            text-align: center;
        }
    }
}
</style>
