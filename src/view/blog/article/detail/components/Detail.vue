<template>
    <div class="article-detail-container">
        <div class="article-detail-box"
             :style="isLayer ? 'box-shadow: 0 10px 60px rgba(0,0,0,.4);' : ''">
            <!-- 标题 -->
            <div class="article-detail-title">
                <h3>{{ detail.title }}</h3>
                <span>发布于 {{ detail.releaseTime | formatDate }} / 看过{{
                        detail.pageViews
                    }}次</span>
            </div>
            <!-- 内容 -->
            <div class="article-detail-content">
                <div class="article-detail-content-el"
                     :style="isLayer ? style : ''"
                     v-html="compiledMarkdownValue"></div>
            </div>
            <!-- 点赞 打赏 -->
            <div class="article-detail-bottom">
                <ul class="flex-space-between">
                    <li @click="handleLike(detail.isLike)">
                        <!-- 点赞 -->
                        <img :src="!detail.isLike ? like : selectLike" />
                        <span :class="{ active: detail.isLike }">{{ detail.likes }}</span>
                    </li>
                    <li @click="handleReward">
                        <img :src="gift"
                             alt="" />
                        打赏
                    </li>
                    <li>
                        <img :src="share"
                             alt="" />
                        分享
                    </li>
                </ul>
            </div>
            <!-- 打赏 -->
            <div class="article-detail-reward flex-center"
                 v-if="isShowReward">
                <img src="http://yuanhao-web.cn/server/uploads/2d14a2c2a1afd59f8e917103ba3a3c3.png">
            </div>
        </div>
        <notification ref="notification" />
    </div>
</template>

<script>
import Notification from '@/components/notification';
import Gift from '@/assets/images/gift.png';
import SelectLike from '@/assets/images/select-like.png';
import Like from '@/assets/images/like.png';
import Share from '@/assets/images/share.png';
import { getLocalStorage, setLocalStorage } from '@/utils/common';

import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
    props: {
        isLayer: {
            type: Boolean,
            default: true,
        },
        detail: {
            type: Object,
            default: () => { },
        },
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
                overflow: 'hidden',
            },
            isShowReward: false
        };
    },
    mounted () {
        this.initPage();
        console.log(window.innerWidth)
    },
    methods: {
        /**
         * 初始化
         */
        initPage () {
            // 浏览量
            if (!this.isLayer) {
                let { id, pageViews } = this.detail;
                let params = {
                    id,
                    pageViews: +pageViews + 1,
                };
                this.$http.post('/blog/client/update/data', params);
            }
            // 点赞
            this.$set(
                this.detail,
                'isLike',
                getLocalStorage('articleItem' + this.detail.id)
            );
        },

        /**
         * 处理打赏
         */
        handleReward () {
            this.isShowReward = !this.isShowReward
        },

        /**
         *   点赞
         */
        handleLike (isLike) {
            // 弹窗详情禁止点击
            if (this.isLayer) {
                return;
            }

            if (!isLike) {
                this.detail.isLike = true;
                ++this.detail.likes;
                setLocalStorage('articleItem' + this.detail.id, '1');

                let { likes, id } = this.detail;
                let params = {
                    id,
                    likes,
                };
                this.$http.post('/blog/client/update/data', params);
            } else {
                this.$refs.notification.open();
            }
        },
    },
    computed: {
        compiledMarkdownValue: function () {
            return marked(this.detail.article, {
                highlight: function (code) {
                    //新加的，用来配置语法高亮
                    return hljs.highlightAuto(code).value;
                },
            });
        },
    },
    components: {
        Notification
    }
};
</script>

<style lang="less" scoped>
.article-detail-container {
    .article-detail-box {
        max-width: 800px;
        min-height: 150px;
        border-radius: 5px 5px 0 0px;
        background-color: #fff;
    }
    .article-detail-title {
        padding: 20px 25px 10px;
        border-bottom: 1px solid #eee;
        h3 {
            font-size: 22px;
            line-height: 1.4;
        }
        span {
            color: #5f5f5f;
            font-size: 12px;
        }
    }
    .article-detail-content {
        position: relative;
        padding: 15px 25px;
        font-size: 15px;
        // height: 560px;
        img {
            width: 100%;
        }
        .article-detail-content-el {
            height: 100%;

            // overflow-y: scroll;
        }
    }
    .article-detail-bottom {
        color: #999;
        font-size: 14px;
        border-top: 1px solid #f4f4f4;
        ul {
            user-select: none;
            li {
                width: 33%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: 1px solid #f4f4f4;
                height: 35px;
                cursor: pointer;
                img {
                    width: 17px;
                    margin-right: 10px;
                }
                .active {
                    color: #f8c7d3;
                }
            }
            li:last-child {
                border: none;
            }
        }
    }
    .article-detail-reward {
        padding: 15px;
        img {
            width: 200px;
        }
    }
}
@media screen and (max-width: 756px) {
    .article-detail-container {
        .article-detail-box {
            width: 100%;
        }
        .article-detail-content {
            box-sizing: border-box;
            padding: 0 10px;
        }
    }
}
</style>
<style lang="less">
@media screen and (max-width: 756px) {
    .article-detail-container {
        pre {
            width: 335px;
            margin: 0 auto;
        }
    }
}
.article-detail-container {
    pre {
        position: relative;
        line-height: 1.5;
        font-family: Menlo, Monaco, Consolas, Courier New, monospace;
        font-size: 14px;
        code {
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
    .hljs-literal {
        color: teal !important;
    }
    .hljs-comment {
        color: #998 !important;
    }
    .article-detail-content-el img {
        max-width: 100%;
    }
    .article-detail-content-el {
        h1,
        h2,
        h3 {
            padding: 10px 0;
            font-weight: bold;
        }
        h1 {
            font-size: 22px;
        }
        h2 {
            font-size: 20px;
        }
        h3 {
            font-size: 18px;
        }
        h4 {
            font-size: 16px;
        }
        a {
            color: #0269c8 !important;
        }
        p {
            margin: 5px 0;
        }
    }
}
</style>
