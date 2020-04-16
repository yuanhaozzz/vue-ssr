<template>
    <div class="article-detail-wrapper">
        <div class="article-detail-center">
            <h1 class="article-detail-title">标题</h1>
            <!-- 信息 -->
            <div class="article-detail-info">
                <span class="article-detail-info-original">原创</span>
                <span class="article-detail-info-author">{{
                    detail.author
                }}</span>
                <span class="article-detail-info-time">最后发布于 {{ detail.releaseTime }}
                </span>
                <span class="article-detail-info-count">阅读数 {{ detail.pageViews }}</span>
            </div>
            <div class="article-detail-content"
                 v-html="compiledMarkdownValue"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

export default {
    asyncData ({ store, route, query }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('article/getDetail', query);
    },
    data: () => {
        return {
            html: '<p>测试</p>'
        };
    },
    mounted () {
        let { id, pageViews } = this.detail;
        let params = {
            id,
            pageViews: +pageViews + 1
        };
        this.$http.post('/blog/client/update/data', params);
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
    }
};
</script>

<style lang="less" scoped>
.article-detail-wrapper {
    position: relative;
    background-color: #f0d0a9;
    padding-bottom: 50px;
    box-sizing: border-box;
    padding: 20px;
    height: 100%;
    .article-detail-center {
        width: 60%;
        margin: 0 auto;
        padding: 10px 20px 20px;
        background-color: #fff;
        height: 90%;
        border-radius: 5px;
        .article-detail-title {
            font-size: 20px;
            color: #000;
            margin-bottom: 5px;
        }
        .article-detail-info {
            font-size: 12px;
            padding-bottom: 12px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eee;
            .article-detail-info-original {
                color: #ca0c16;
                background: #f9ecec;
                margin-right: 8px;
                display: inline-block;
                margin-top: 4px;
                width: 34px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                border-radius: 2px;
                vertical-align: 1px;
            }
            .article-detail-info-author {
                color: #333;
            }
            .article-detail-info-time,
            .article-detail-info-count {
                color: #858585;
                margin-left: 8px;
            }
        }
        .article-detail-content {
            height: 90%;
            overflow-y: scroll;
        }
        .article-detail-content::-webkit-scrollbar {
            display: none;
        }
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
