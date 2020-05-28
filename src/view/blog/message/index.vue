<template>
    <div class="message-wrapper">
        <!-- header -->
        <div class="message-header">
            <div class="message-header-top">
                <h3>留言板</h3>
                <span>留言板 上线于 2020年05月27日 / 共{{messageList.length}}条留言</span>
            </div>
            <div class="message-header-bottom">
                <h3>这是一个留言板，希望能够留下你的足迹~</h3>
            </div>
        </div>
        <!-- 评论 -->
        <div class="message-input">
            <Input ref="input"
                   :replyUserData="{}"
                   @hideLayer="hideLayer"
                   @getList="getList" />
        </div>
        <ul class="message-content">
            <li v-for="item of messageList"
                :key="item.id">
                <div class="message-content-item-time">{{item.createTime | formatDate}}</div>
                <div class="message-content-item-left flex-start">
                    <div class="item-avatar"
                         @click="handleComment(item)">
                        <img :src="item.avatar" />
                        <a href="javascript:;">@</a>
                    </div>
                    <div class="item-info">
                        <div class="item-info-name">{{item.userName}}</div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
                <!-- 子评论 -->
                <ul class="message-content-sub">
                    <!-- 左 -->
                    <li v-for="(sub, subIndex) of item.sub"
                        :key="sub.id">
                        <template v-if="subIndex % 2 !== 0">
                            <div class="message-content-item-time">{{sub.createTime | formatDate}}</div>
                            <div class="message-content-item-left flex-start">
                                <div class="item-avatar"
                                     @click="handleComment(sub)">
                                    <img :src="sub.avatar" />
                                    <a href="javascript:;">@</a>
                                </div>
                                <div class="item-info">
                                    <div class="item-info-name">{{sub.userName}}</div>
                                    <p>回复{{sub.parentName}}：{{sub.content}}</p>
                                </div>
                            </div>
                        </template>
                        <!-- 右 -->
                        <template v-else>
                            <div class="message-content-item-time">{{sub.createTime | formatDate}}</div>
                            <div class="message-content-item-right flex-end">
                                <div class="item-info flex-end">
                                    <div class="item-info-name">{{sub.userName}}</div>
                                    <p>回复{{sub.parentName}}：{{sub.content}}</p>
                                </div>
                                <div class="item-avatar"
                                     @click="handleComment(sub)">
                                    <img :src="sub.avatar" />
                                    <a href="javascript:;">@</a>
                                </div>
                            </div>
                        </template>
                    </li>

                </ul>
            </li>
        </ul>
        <!-- 定位 -->
        <div class="message-layer"
             @click="subComment = false"
             v-if="subComment">
            <Input :isPosition="true"
                   @getList="getList"
                   @hideLayer="hideLayer"
                   :replyUserData="replyUserData" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Input from './components/Input';
export default {
    asyncData ({ store, route }) {
        return store.dispatch('article/getMessage')
    },
    data: () => {
        return {
            subComment: false,
            replyUserData: {}
        }
    },
    mounted () {
        console.log(this.messageList)
    },
    methods: {

        getList () {
            this.$store.dispatch('article/getMessage')
        },

        /**
         * 获取用户信息
         * @param {String} type     输入类型
         */
        handleInfo (type) {
            let string = ''
            setLocalStorage(type, this[type])
        },

        /**
         * 展示二级评论
         * @param {Object} item 选中数据
         */
        handleComment (item) {
            this.subComment = true
            this.replyUserData = item
        },

        /**
         * 隐藏弹窗
         */
        hideLayer () {
            this.subComment = false
        }
    },
    computed: {
        ...mapGetters('article', ['messageList'])
    },
    components: {
        Input,
    },
};
</script>

<style lang="less" scope>
.message-wrapper {
    color: #333;
    padding-bottom: 40px;
    .message-header {
        background: #fff;
        margin-bottom: 20px;
        .message-header-top {
            padding: 20px 25px 10px;
            border-bottom: 1px solid #eee;
            h3 {
                font-size: 22px;
                line-height: 1.4;
            }
            span {
                color: #5f5f5f;
            }
        }
        .message-header-bottom {
            position: relative;
            padding: 15px 25px;
            font-size: 15px;
        }
    }
    .message-input {
        padding: 10px 15px;
        background-color: #fff;
    }
    .message-content {
        margin-top: 20px;
        li {
            margin-bottom: 15px;
            background-color: #fff;
            padding: 10px 15px;
            .message-content-item-time {
                font-size: 12px;
                padding: 3px 10px;
                color: #d4d4d4;
                text-align: center;
            }
            .message-content-sub {
                li {
                    padding: 0;
                }
            }
            .message-content-item-left,
            .message-content-item-right {
                align-items: flex-start;
                img {
                    width: 55px;
                    height: 55px;
                    border-radius: 100%;
                }
                .item-avatar {
                    position: relative;
                    width: 55px;
                    height: 55px;
                    a {
                        width: 55px;
                        height: 55px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        text-align: center;
                        line-height: 55px;
                        background-color: rgba(0, 0, 0, 0.2);
                        color: #fff !important;
                        border-radius: 100%;
                        display: none;
                    }
                }
                .item-avatar:hover a {
                    display: block;
                }
                .item-info {
                    padding-left: 10px;
                    padding-right: 10px;
                    .item-info-name {
                        font-size: 15px;
                        margin-bottom: 5px;
                    }
                    p {
                        font-size: 15px;
                        padding: 2px 5px;
                        max-width: 90%;
                        position: relative;
                        color: #555;
                        word-wrap: break-word;
                        border: 1px solid;
                        border-color: #ddd;
                        border-radius: 6px;
                        position: relative;
                    }
                }
            }
            .message-content-item-left {
                p::after {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: 7px;
                    left: -5px;
                    border: 1px solid transparent;
                    border-left: 1px solid #ddd;
                    border-top: 1px solid #ddd;
                    transform: rotate(-45deg);
                    background-color: #fff;
                }
            }
            .message-content-item-right {
                .item-info {
                    flex-direction: column;
                    align-items: flex-end;
                }
                .item-info-name {
                    text-align: right;
                }
                p::after {
                    content: "";
                    display: block;
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    top: 7px;
                    right: -5px;
                    border: 1px solid transparent;
                    border-right: 1px solid #ddd;
                    border-top: 1px solid #ddd;
                    transform: rotate(45deg);
                    background-color: #fff;
                }
            }
        }
    }
    .message-layer {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 99;
    }
}
@media screen and (max-width: 756px) {
    .message-wrapper {
        .message-layer {
            .message-input-position {
                min-width: 300px;
            }
        }
    }
}
</style>
