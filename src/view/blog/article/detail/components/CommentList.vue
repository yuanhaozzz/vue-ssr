<template>
    <div class="common-comment-list-wrapper">
        <ul class="common-comment-list">
            <li class="flex-start common-comment-list-item" v-for="(item, index) of commentList" :key="item.id">
                <img :src="commentAvatar" alt="" class="item-avatar">
                <!-- 右边内容 -->
                <div class="item-right-box">
                    <div class="item-info">
                        <span class="item-info-name">{{item.userName}}</span>
                        <p class="item-info-content">{{item.content}}</p>
                    </div>
                    <div class="item-bottom flex-space-between">
                        <span>{{item.createTime | formatDate}}</span>
                        <div class="item-bottom flex-end">
                            <div class="item-bottom-good flex-start" @click="handleLike(item)">
                                <img :src="selectGood" alt="" v-if="showFavorite(item)">
                                <img :src="good" alt="" v-else>
                                <span v-show="item.favorite">{{item.favorite}}</span>
                            </div>
                            <div class="item-bottom-good reply-hover flex-start" @click="showComment(item, index, 1)">
                                <img :src="reply" alt="">
                                <span>回复</span>
                            </div>
                        </div>
                    </div>
                    <comment-input v-show="item.id === replyLevel1Id" @submit="submit"/>
                    <!-- 回复评论 -->
                    <div class="item-reply-list-container">
                         <ul class="common-comment-list">
                            <li class="flex-start common-comment-list-item" v-for="(subComment, subIndex) of item.subComment" :key="subComment.id">
                                <img :src="commentAvatar" alt="" class="item-avatar">
                                <!-- 右边内容 -->
                                <div class="item-right-box">
                                    <div class="item-info">
                                        <span class="item-info-name">{{subComment.userName}}</span>
                                        <p class="item-info-content">回复 {{subComment.parentName}}：{{subComment.content}}</p>
                                    </div>
                                    <div class="item-bottom flex-space-between">
                                        <span>{{subComment.createTime | formatDate}}</span>
                                        <div class="item-bottom flex-end">
                                            <div class="item-bottom-good flex-start" @click="handleLike(subComment)">
                                                <img :src="selectGood" alt="" v-if="showFavorite(subComment)">
                                                <img :src="good" alt="" v-else>
                                                <span v-show="subComment.favorite">{{subComment.favorite}}</span>
                                            </div>
                                            <div class="item-bottom-good reply-hover flex-start" @click="showComment(subComment, subIndex, 2)">
                                                <img :src="reply" alt="">
                                                <span>回复</span>
                                            </div>
                                        </div>
                                    </div>
                                     <comment-input backgroundColor="#fff" v-show="subComment.id === replyLevel2Id"  @submit="submit"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import CommentAvatar from '@/assets/images/comment-avatar.png'
import Good from '@/assets/images/good.png'
import SelectGood from '@/assets/images/select-good.png'
import Reply from '@/assets/images/reply.png'
import CommentInput from '@/components/comment/Input'
import {getLocalStorage} from '@/utils/common'
export default {
    props: {
        commentList: {
            type: Array,
            default: () => []
        },
        detail: {
            type: Object,
            default: () => {}
        }
    },
     data: () => {
        return {
            commentAvatar: CommentAvatar,
            good: Good,
            selectGood: SelectGood,
            reply: Reply,
            replyIndex: '',
            replyLevel1Id: '',
            replyLevel2Id: '',
            currentComment: {}
        }
    },
    methods: {
        /**
         * 评论
         * @param {String} content      评论内容
         */
        submit(e, value) {
             this.replyIndex = ''
            this.$emit('submit', e, Object.assign({}, this.currentComment, value), 2)
        },

        /**
         * 处理点赞
         */
        handleLike(item) {
            this.$emit('handleLike', item)
        },

        /**
         * 展示评论组件
         *  @param {Object} item       选中数据
         *  @param {Number} index      当前下标
         *  @param {Number} type       1 一级评论 2 二级评论
         */
        showComment(item, index, type) {
            this.currentComment = item
             if (item.id === this[`replyLevel${type}Id`]) {
                this[`replyLevel${type}Id`] = ''
                return
            }
            if (type === 1) {
                 this.replyLevel2Id = ''
            } else {
               this.replyLevel1Id = ''
            }
            this[`replyLevel${type}Id`] = item.id
        },

        /**
         * 点赞是否展示
         * @param {Object} level1 一级评论
         * @param {Object} level2 二级评论
         */
        showFavorite(level1, level2 = {id: 0}) {
               let articleId = this.detail.id
                let key = `article-${articleId}-level1-${level1.id}-level2-${level2.id}`
                let favorite = getLocalStorage(key)
                if (favorite) {
                    return true
                }
                return false
        }
    },
    watch: {
        commentList() {
              this.replyIndex = ''
        }
    },
    components: {
        CommentInput
    }
}
</script>
<style lang="less" scoped>
.common-comment-list-wrapper{
    .common-comment-list{
        .common-comment-list-item:last-child{
            border: none;
        }
        .common-comment-list-item{
            margin-top: 15px;
            align-items: flex-start;
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 15px;
            p{
                word-break:break-all
            }
            .item-right-box{
                width: 100%;
            }
            .item-avatar{
                width: 6%;
                margin-right: 15px;
            }
            .item-info{
                margin-bottom: 5px;
                margin-top: 5px;
                .item-info-name{
                    color: #333;
                    font-weight: 400;
                    font-size: 14;
                }
                .item-info-content{
                    color: #505050;
                    font-size: 14;
                    margin-top: 3px;

                }
            }
            .item-bottom{
                font-size: 13px;
                color: #8a93a0;
                margin-bottom: 5px;
                user-select: none;
                .item-bottom-good:hover{
                    opacity: .8;
                }
                .item-bottom-good{
                    margin-right: 20px;
                    cursor: pointer;
                    img{
                        width: 15px;
                        margin-right: 5px;
                    }
                }
                .item-bottom-good:last-child{
                    margin-right: 0;
                }
            }
            .item-reply-list-container{
                margin-top: 5px;
                background-color: #fafbfc;
                padding: 10px 15px;
            }
        }
    }
}
</style>