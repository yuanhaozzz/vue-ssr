<template>
    <div class="article-detail-container" ref="detail" v-if="isShow">
        <div class="article-detail-box">
            <!-- 操作 -->
            <div class="article-detail-header flex-start">
                <ul class="flex-start">
                    <li @click="closeLayer"></li>
                    <li @click="closeLayer"></li>
                    <li @click="closeLayer"></li>
                </ul>
            </div>
            <!-- 标题 -->
            <div class="article-detail-title">
                <h3 >{{detail.title}}</h3>
                <span>发布于 {{detail.releaseTime | formatDate}} / 看过{{detail.pageViews}}次</span>
            </div>
            <!-- 内容 -->
            <div class="article-detail-content">
                  <div class="article-detail-content-el" v-html="compiledMarkdownValue"></div>
            </div>
            <!-- 点赞 打赏 -->
            <div class="article-detail-bottom">
                <ul class="flex-space-between">
                    <li>
                        <!-- <img :src="selectLike" alt=""> -->
                        <img :src="like" alt="">
                        13
                    </li>
                    <li>
                        <img :src="gift" alt="">
                        打赏
                    </li>
                    <li>
                        <img :src="share" alt="">
                        分享
                    </li>
                </ul>
            </div>
            <!-- 完成内容 -->
            <p class="article-detail-footer" @click="jumpToDetail">查看完整内容</p>
            <!-- 加载 -->
            <!-- <loading /> -->
        </div>
    </div>
</template>

<script>


import Loading from '@/components/loading/Loading'
import Gift from '@/assets/images/gift.png'
import SelectLike from '@/assets/images/select-like.png'
import Like from '@/assets/images/like.png'
import Share from '@/assets/images/share.png'

import { mapGetters } from 'vuex';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
    // asyncData({ store, route, query }) {
    //     // 触发 action 后，会返回 Promise
    //     return store.dispatch('article/getDetail', query);
    // },
    data: () => {
        return {
            gift: Gift,
            selectLike: SelectLike,
            like: Like,
            share: Share,
            item: {},
            html: '<p>测试</p>',
            isShow:false
        }
        
    },
    mounted() {
        
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeLayer() {
            this.isShow = false
        },
        
        /**
         * 打开弹窗
         */
        openLayer(item) {
            this.item = item
            let that = this
            this.$store.dispatch('article/getDetail', {id:this.item.id}).then(() => {
                that.isShow = true
                // let { id, pageViews } = this.detail;
                // let params = {
                //     id,
                //     pageViews: +pageViews + 1
                // };
                // this.$http.post('/blog/client/update/data', params);
            })
        },

        /**
         * 跳转详情
         */
        jumpToDetail() {
            this.$router.push({
                  path: '/blog/content/detail',
                  query: {
                      id: this.item.id
                  }
              })
        }
    },
    computed: {
        ...mapGetters('article', ['detail']),
        compiledMarkdownValue: function () {
            return marked(this.detail.article, {
                highlight: function (code) {
                    //新加的，用来配置语法高亮
                    return hljs.highlightAuto(code).value;
                }
            });
        }
    },
    components: {
        Loading
    }
};
</script>

<style lang="less" scoped>
.article-detail-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
    z-index: 99;
    .article-detail-box{
        margin: 40px auto 0;
        max-width: 800px;
        min-height: 150px;
        border-radius: 5px;
        background-color: #FFF;
        box-shadow: 0 10px 60px rgba(0,0,0,.4);
    }
    .article-detail-header{
        position: relative;
        background: #f3f3f3;
        border-radius: 5px;
        font-size: 10px;
        height: 24px;
        padding-left: 10px;
        ul{
            li{
                width: 9px;
                height: 9px;
                border-radius: 10px;
                margin-right: 5px;
            }
            li:nth-of-type(1){
                background-color: #f46965;
            }
            li:nth-of-type(2){
                background-color: #e9cd06;
            }
            li:nth-of-type(3){
                background-color: #81d95e;
            }
        }
    }
    .article-detail-title{
        padding: 20px 25px 10px;
        border-bottom: 1px solid #eee;
        h3{
            font-size: 22px;
            line-height: 1.4;
        }
        span{
            color: #5f5f5f;
            font-size: 12px;
        }
    }
    .article-detail-content{
        position: relative;
        padding: 15px 25px;
        font-size: 15px;
        height: 560px;
        .article-detail-content-el{
            height: 100%;
            overflow-y: scroll;
        }
    }
    .article-detail-bottom{
        color: #999;
        font-size: 14px;
        border-top: 1px solid #f4f4f4;
        ul{
            li{
                width: 33%;
                display: flex;
                justify-content: center;
                align-items: center;
                 border-right: 1px solid #f4f4f4;
                 height: 35px;
                 img{
                     width: 17px;
                     margin-right: 10px;
                 }
            }
            li:last-child{
                border: none;
            }
        }
    }
    .article-detail-footer{
        text-align: center;
        border-top: 1px solid #eee;
        padding: 15px 2px;
        color: #666;
        font-size: 16px;
        cursor: pointer;
    }
    .article-detail-footer:hover{
        background-color: #f5f8fa;;
    }
}
</style>
<style lang="less">
pre {
    padding: 16px;
    overflow: auto;
    font-size: 18px;
    line-height: 1.45;
    border-radius: 3px;
    background: #fdf6e3;
    font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
        "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    margin: 10px 0;
}
.hljs-keyword {
    color: #dc322f !important;
}
.hljs-string {
    color: #2aa198 !important;
}
.hljs-params {
    color: #657b83 !important;
}
.hljs-subst {
    color: #859900 !important;
}
.hljs-title {
    color: #268bd2 !important;
}
.hljs-built_in {
    color: #dc322f !important;
}
blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
}
.hljs-comment {
}
</style>