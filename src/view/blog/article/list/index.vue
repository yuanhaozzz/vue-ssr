<template>
    <div class="article-list-container">
        <section class="article-list-tab">
            <ul class="flex-space-around">
                <li :class="{'action': index === tabIndex}" v-for="(item, index) of tabList" @click="switchTab(index)">{{item}}</li>
            </ul>
        </section>
        
        <section class="article-list-content">
            <article-itme></article-itme>
            <article-itme></article-itme>
            <article-itme></article-itme>
            <article-itme></article-itme>
        </section>
    </div>
</template>

<script>
import ArticleItme from './components/ArticleItem'
export default {
    data: () => {
        return {
            tabIndex: 0,
            tabList: ['全部', '最新', '最热', '源码', '面试题']
        }
    },
    methods: {
        /**
         * 选项卡切换
         * @param {Number} index 选中下标
         */
         switchTab(index) {
             this.tabIndex = index
         }
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
