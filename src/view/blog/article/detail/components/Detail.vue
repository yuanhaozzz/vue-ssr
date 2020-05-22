<template>
    <div class="article-detail-container">
        
        <div class="article-detail-box" :style="isLayer? 'box-shadow: 0 10px 60px rgba(0,0,0,.4);': ''">
           
            <!-- 标题 -->
            <div class="article-detail-title">
                <h3 >{{detail.title}}</h3>
                <span>发布于 {{detail.releaseTime | formatDate}} / 看过{{detail.pageViews}}次</span>
            </div>
            <!-- 内容 -->
            <div class="article-detail-content">
                  <div class="article-detail-content-el" :style="isLayer ? style : ''" v-html="compiledMarkdownValue"></div>
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

import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
    props: {
        isLayer: {
            type: Boolean,
            default: true
        },
        detail: {
            type: Object,
            default: () => {}
        }
    },
    data: () => {
        return {
            gift: Gift,
            selectLike: SelectLike,
            like: Like,
            share: Share,
            item: {},
            html: '<p>测试</p>',
            isShow: false,
            style: {
                height: '600px',
                overflow: 'hidden'
            }
        }
        
    },
    mounted() {
        
    },
    computed: {
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
    .article-detail-box{
        max-width: 800px;
        min-height: 150px;
        border-radius: 5px 5px 0 0px;
        background-color: #FFF;
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
        // height: 560px;
         img{
                width: 100%;
            }
        .article-detail-content-el{
            height: 100%;
           
            // overflow-y: scroll;
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
}
</style>
<style lang="less">
.article-detail-container{
    pre {
        position: relative;
        line-height: 1.5;
        font-family: Menlo,Monaco,Consolas,Courier New,monospace;
        overflow: auto;
    font-size: 14px;
    code{
        padding: 18px 15px 12px;
        overflow-x: auto;
            color: #333;
            background: #f8f8f8;
            display: block;
            word-break: normal;
    }
    }
    .hljs-keyword {
        color: #dc322f !important;
    }
    .hljs-string {
        color: #d14 !important;
    }
    .hljs-params {
        color: #657b83 !important;
    }
    .hljs-subst {
        color: #859900 !important;
    }
    .hljs-title {
        color: #900 !important;
    }
    .hljs-built_in {
        color: #0086b3 !important;
    }
    blockquote {
        padding: 0 1em;
        color: #6a737d;
        border-left: 0.25em solid #dfe2e5;
    }
    .hljs-literal{
        color: teal !important;
    }
    .hljs-comment {
        color: #998 !important;
    }
    .article-detail-content-el img{
        max-width: 100%;
    }
    .article-detail-content-el{
         h1, h2, h3{
                padding: 10px 0;
                font-weight: bold;
         }
         h1{
             font-size: 22px;
         }
         h2{
             font-size: 20px;
         }
         h3{
             font-size: 18px;
         }
         h4{
             font-size: 16px;
         }
       a{
               color: #0269c8 !important;
       }
       p{
           margin: 5px 0;
       }
    }
}

</style>