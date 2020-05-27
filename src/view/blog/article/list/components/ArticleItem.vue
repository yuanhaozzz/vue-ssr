<template>
    <div class="article-item-container">
        <div class="article-item-info flex-start">
            <img
                src="https://www.wnooo.cn/content/uploadfile/201905/thum52-37521557483025.jpg"
            />
            <div class="article-item-info-box">
                <h4>浩哥</h4>
                <span>{{ articleItem.releaseTime | formatDate }}</span>
            </div>
        </div>

        <div class="article-item-article flex-start" @click.stop="jumpToDetail">
            <img class="article-cover" :src="articleItem.imageUrl" />
            <div class="article-box">
                <h4>{{ articleItem.title }}</h4>
                <p>
                    {{ articleItem.description }}
                </p>
            </div>
        </div>
        <!-- 操作栏 -->
        <div class="article-item-bottom" @click.stop="">
            <ul class="flex-space-around">
                <li class="flex-center" title="点亮你的小心心">
                    <!-- 点赞 -->
                    <img
                        :src="!articleItem.isLike ? like : selectLike"
                        alt=""
                        @click="handleLike(articleItem.isLike)"
                    />
                    <span
                        @click="handleLike(articleItem.isLike)"
                        :class="{ active: articleItem.isLike }"
                        >{{ articleItem.likes }}</span
                    >
                </li>
                <li class="flex-center" title="评论数量">
                    <img :src="leave" alt="" />
                    <span>{{ articleItem.comment }}</span>
                </li>
                <li class="flex-center" title="阅读量">
                    <img :src="eye" alt="" />
                    <span>{{ articleItem.pageViews }}</span>
                </li>
            </ul>
        </div>
        <notification ref="notification" />
    </div>
</template>

<script>
import Like from '@/assets/images/like.png';
import SelectLike from '@/assets/images/select-like.png';
import Leave from '@/assets/images/leave.png';
import Eye from '@/assets/images/eye.png';
import { setLocalStorage, getLocalStorage } from '@/utils/common';
import Notification from '@/components/notification';
export default {
    props: {
        article: {
            type: Object,
            default: () => {},
        },
    },
    data: () => {
        return {
            like: Like,
            selectLike: SelectLike,
            leave: Leave,
            eye: Eye,
            articleItem: {},
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        /**
         * 跳转详情
         */
        jumpToDetail() {
            this.$router.push({
                path: '/blog/content/detail',
                query: {
                    id: this.article.id,
                },
            });
        },
        /**
         * 初始化详情
         */
        init() {
            this.articleItem = this.article;
            this.$set(
                this.articleItem,
                'isLike',
                getLocalStorage('articleItem' + this.articleItem.id)
            );
        },

        /**
         *   点赞
         */
        handleLike(isLike) {
            if (!isLike) {
                this.articleItem.isLike = true;
                ++this.articleItem.likes;
                setLocalStorage('articleItem' + this.articleItem.id, '1');

                let { likes, id } = this.articleItem;
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
    components: {
        Notification,
    },
};
</script>

<style lang="less" scoped>
.article-item-container {
    background: #fff;
    padding: 20px 20px 0;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    .article-item-info {
        margin-bottom: 18px;
        img {
            border-radius: 5px;
            width: 45px;
            height: 45px;
            margin-right: 15px;
        }
        .article-item-info-box {
            color: #464646;
            h4 {
                margin-bottom: 6px;
                font-size: 17px;
            }
            span {
                font-size: 14px;
            }
        }
    }
    .article-item-article {
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #e5e9ef;
        img {
            width: 170px;
            height: 120px;
        }
        .article-box {
            flex: 1;
            padding: 15px;
            h4 {
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p {
                font-size: 14px;
                margin-top: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 19px;
                max-height: 38px;
                color: #99a2aa;
            }
        }
    }
    .article-item-bottom {
        border-top: 1px solid #f4f4f4;
        margin-top: 15px;
        li {
            width: 33%;
            text-align: center;
            border-right: 1px solid #f4f4f4;
            font-size: 16px;
            color: #999;
            min-height: 35px;
            user-select: none;
            img {
                width: 18px;
                margin-right: 5px;
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
</style>
