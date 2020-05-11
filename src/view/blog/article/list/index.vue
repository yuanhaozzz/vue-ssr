<template>
    <div class="article-list-container">
        <section class="article-list-tab">
            <ul class="flex-space-around">
                <li :class="{'action': index === tabIndex}" v-for="(item, index) of tabList" @click="switchTab(item, index)">{{item.name}}</li>
            </ul>
        </section>
        
        <section class="article-list-content">
            <template v-for="item of homeList.hotList">
            <div @click="jumpToDetail(item)">
                <article-itme :article="item"></article-itme>
            </div>
            </template>
        </section>
    </div>
</template>

<script>
import ArticleItme from './components/ArticleItem'
import {mapGetters} from 'vuex'
export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('article/getHomeList');
    },
    data: () => {
        return {
            tabIndex: 0,
            tabList: [
                {name: '全部', type: ''},
                {name: '最新', type: 1},
                {name: '最热', type: 2},
                {name: '源码', type: 3},
                {name: '面试题', type: 4},
                ]
        }
    },
    methods: {
        /**
         * 选项卡切换
         * @param {Number} index 选中下标
         */
         switchTab(item, index) {
             let {type} = item
             this.$store.dispatch('article/getHomeList', {type})
             this.tabIndex = index
         },

         /**
          * 跳转详情
          */
          jumpToDetail(item) {
              this.$router.push({
                  path: '/blog/content/detail',
                  query: {
                      id: item.id
                  }
              })
          }
    },
     computed: {
        ...mapGetters('article', ['homeList']),
    },
    mounted() {
        console.log(this.homeList.list, '---------');
    },
    components: {
        ArticleItme
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

    }
}
</style>
