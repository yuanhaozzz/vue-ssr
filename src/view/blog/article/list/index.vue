<template>
    <div class="article-list-container">
        <!-- 选项卡 -->
        <section class="article-list-tab">
            <ul class="flex-space-around">
                <li :class="{ action: index === tabIndex }"
                    v-for="(item, index) of tabList"
                    :key="index"
                    @click="switchTab(item, index)">
                    {{ item.name }}
                </li>
            </ul>
        </section>
        <!-- 文章列表 -->
        <section class="article-list-content">
            <template v-if="homeList.list.length > 0">
                <div v-for="item of homeList.list"
                     :key="item.id"
                     @click="jumpToDetail(item)">
                    <!-- 子组件 -->
                    <div class="article-item-container">
                        <div class="article-item-info flex-start">
                            <img src="https://www.wnooo.cn/content/uploadfile/201905/thum52-37521557483025.jpg" />
                            <div class="article-item-info-box">
                                <h4>浩哥</h4>
                                <span>{{ item.releaseTime | formatDate }}</span>
                            </div>
                        </div>

                        <div class="article-item-article flex-start"
                             @click.stop="jumpToDetail">
                            <img class="article-cover"
                                 :src="item.imageUrl" />
                            <div class="article-box">
                                <h4>{{ item.title }}</h4>
                                <p>
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>
                        <!-- 操作栏 -->
                        <div class="article-item-bottom"
                             @click.stop="">
                            <ul class="flex-space-around">
                                <li class="flex-center"
                                    title="点亮你的小心心">
                                    <!-- 点赞 -->
                                    <img :src="!item.isLike ? like : selectLike"
                                         alt=""
                                         @click="handleLike(item)" />
                                    <span @click="handleLike(item)"
                                          :class="{ active: item.isLike }">{{ item.likes }}</span>
                                </li>
                                <li class="flex-center"
                                    title="评论数量">
                                    <img :src="leave"
                                         alt="" />
                                    <span>{{ item.comment }}</span>
                                </li>
                                <li class="flex-center"
                                    title="阅读量">
                                    <img :src="eye"
                                         alt="" />
                                    <span>{{ item.pageViews }}</span>
                                </li>
                            </ul>
                        </div>
                        <notification ref="notification" />
                    </div>
                </div>
            </template>

            <template v-else>
                <p class="article-list-content-empty">正在加急创作中！！</p>
            </template>
        </section>
        <!-- 加载组件 -->
        <!-- 弹窗详情 -->
        <layer ref="layerDetail"> </layer>
    </div>
</template>

<script>
import Layer from '../detail/components/Layer';
import { showLoading, hideLoading } from '@/utils/common';
import Like from '@/assets/images/like.png';
import SelectLike from '@/assets/images/select-like.png';
import Leave from '@/assets/images/leave.png';
import Eye from '@/assets/images/eye.png';
import { setLocalStorage, getLocalStorage } from '@/utils/common';
import Notification from '@/components/notification';
import { mapGetters } from 'vuex';
export default {
    asyncData ({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store
            .dispatch('article/getHomeList', { type: 0 })
    },
    data: () => {
        return {
            tabIndex: 0,
            tabList: [
                { name: '全部', type: 0 },
                { name: '最新', type: 1 },
                { name: '最热', type: 2 },
                { name: '源码', type: 3 },
                { name: '面试题', type: 4 },
            ],
            elLoading: '',
            like: Like,
            selectLike: SelectLike,
            leave: Leave,
            eye: Eye,
        };
    },
    methods: {
        /**
         * 选项卡切换
         * @param {Number} index 选中下标
         */
        switchTab (item, index) {
            let { type } = item;
            showLoading();
            this.$nextTick(() => {
                this.$store
                    .dispatch('article/getHomeList', { type })
                    .then((res) => {
                        setTimeout(() => {
                            hideLoading();
                        }, 400);
                    });
                this.tabIndex = index;
            });
        },

        /**
         * 跳转详情
         */
        jumpToDetail (item) {
            this.$refs.layerDetail.openLayer(item);
        },
        // 子组件
        /**
         * 跳转详情
         */
        jumpToDetail () {
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
        init () {
            this.homeList.map(item => {
                item.isLike = getLocalStorage('articleItem' + item.id)
                return item
            })
        },

        /**
         *   点赞
         */
        handleLike (item) {
            let { isLike } = item

            if (!isLike) {
                item.isLike = true;
                ++item.likes;
                setLocalStorage('articleItem' + item.id, '1');

                let { likes, id } = item;
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
        ...mapGetters('article', ['homeList']),
    },
    mounted () { },
    components: {
        Layer,
        Notification,
    },
};
</script>

<style lang="less" scoped>
.article-list-container {
    .article-list-tab {
        margin-bottom: 20px;
        border-radius: 5px;
        background: #fff;
        background-color: #fff;

        ul {
            padding: 0 10px;
            li {
                margin: 0 10px;
                height: 35px;
                min-width: 56px;
                color: #99a2aa;
                text-align: center;
                font-size: 14px;
                line-height: 35px;
                position: relative;
                cursor: pointer;
                user-select: none;
            }
            .action {
                border-bottom: 2px solid #a1a1a1;
            }
        }
    }
    .article-list-content {
        .article-list-content-empty {
            font-size: 25px;
            text-align: center;
        }
    }
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
}
</style>
