<template>
    <div class="article-list-wrapper flex-start">
        <!-- 最新文章 -->
        <div class="article-now-list">
            <div class="article-list-title flex-space-between">
                <h3>最新文章</h3>
                <p>Recommend</p>
            </div>
            <ul class="article-now-list-container">
                <li
                    v-for="(item, index) of list.list"
                    @click="jumpToDetail(item)"
                    :key="index"
                >
                    <div class="flex-start list-item-bottom">
                        <img
                            :src="item.imageUrl"
                            alt=""
                            class="list-item-bottom-cover"
                        />
                        <div class="list-item-bottom-description">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                            <div
                                class="flex-space-between description-container"
                            >
                                <div class="tag-box tag-blog flex-start">
                                    <img :src="tag" alt="" />
                                    <span>个人博客</span>
                                </div>
                                <div class="tag-box tag-time flex-start">
                                    <img :src="time" alt="" />
                                    <span>
                                        {{
                                            item.releaseTime
                                                | format('yyyy-MM-dd')
                                        }}</span
                                    >
                                </div>
                                <div class="tag-box flex-start">
                                    <img :src="eye" alt="" />
                                    <span>浏览 {{ item.pageViews }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Tag from '@/assets/images/tag.png';
import Time from '@/assets/images/time.png';
import Eye from '@/assets/images/eye.png';
export default {
    props: {
        list: {
            type: Object,
            default: () => {},
        },
    },
    data: () => {
        return {
            tag: Tag,
            time: Time,
            eye: Eye,
        };
    },
    methods: {
        /**
         * 跳转详情
         * @param {Object} item 当前数据
         */
        jumpToDetail(item) {
            window.open(`/blog/article/detail?id=${item.id}`);
        },
    },
};
</script>

<style lang="less" scoped>
.article-list-wrapper {
    margin-top: 20px;
    align-items: flex-start;
    .article-sidebar {
        width: 35%;
    }
    .article-list-title {
        padding-bottom: 5px;
        border-bottom: #db6d4c 5px solid;
        font-weight: bold;
        p {
            text-decoration: none;
            color: #838383;
        }
    }
    .article-now-list {
        width: 100%;
        padding-right: 20px;
        .article-now-list-container {
            li:nth-last-child(1) {
                border: none;
            }
            li {
                padding: 18px;
                border-bottom: 1px solid #eee;
                h3 {
                    color: #5d5d5d;
                }
                h3:hover {
                    text-decoration: underline;
                }
                span {
                    font-size: 12px;
                    color: #aaa;
                    margin: 5px 0;
                }

                .list-item-bottom {
                    margin-top: 5px;
                    .list-item-bottom-cover {
                        border-radius: 3px;
                        width: 200px;
                        height: 138px;
                        display: block;
                        cursor: pointer;
                        margin-right: 30px;
                    }
                    .list-item-bottom-description {
                        flex: 1;
                        h3 {
                            margin-bottom: 10px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                        p {
                            color: #5d5d5d;
                            font-size: 14px;
                            line-height: 25px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            text-indent: 2em;
                            margin-bottom: 5px;
                        }
                    }
                    .tag-box {
                        img {
                            width: 15px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
