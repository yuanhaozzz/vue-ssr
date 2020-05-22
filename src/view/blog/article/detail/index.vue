<template>
    <div>
        <div class="article-detail-wrapper" v-if="!isLoad">
            <detail ref="detail" :isLayer="false" :detail="detail.detail"/>
            <!-- 评论 -->
            <div class="article-detail-comment">
                <h4>评论</h4>
                <comment-input @submit="submit"/>
            </div>
            <!-- 评论列表 -->
            <div class="article-detail-comment-list">
                <comment-list :commentList="detail.commentList" :detail="detail.detail" @handleLike="handleLike" @submit="submit"/>
            </div>
        </div>
        <Loading v-else />
    </div>
    
</template>

<script>
import Detail from './components/Detail'
import CommentInput from '@/components/comment/Input'
import CommentList from './components/CommentList'
import Loading from '@/components/loading/Loading'
import {getLocalStorage, setLocalStorage} from '@/utils/common'
export default {
    data: () => {
        return {
            isLoad:true,
            detail: null,
        }
    },
    mounted() {
            this.getDetail()
           
    },
    methods: {
        /**
         * 点赞
         */
        handleLike(level1, level2 = {id: 0}) {
            let articleId = this.detail.detail.id
            let key = `article-${articleId}-level1-${level1.id}-level2-${level2.id}`
            let favorite = getLocalStorage(key)
            if (!favorite) {
                level1.favorite =  ++level1.favorite
                setLocalStorage(key, 1)
                level1.showFavorite = true
            } else {
                 level1.favorite =  --level1.favorite
                  setLocalStorage(key, 0)
                  level1.showFavorite = false
            }
        },

        /**
         * 获取详情
         */
        getDetail() {
             this.$http.post('/blog/client/article/detail', {articleId: this.$route.query.id})
                .then(res => {
                    this.detail =  res
                    this.isLoad = false
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 获取评论列表
         */
        getCommentList() {
            console.log(this.$route.query.id)
            this.$http.post('/blog/client/comment/list', {articleId: this.$route.query.id})
                .then(res => {
                    this.detail.commentList =  res.list
                    debugger
                })
                .catch(err => {
                    console.log(err);
                });
        },

        /**
         * 提交
         * @param {Number} e            事件
         * @param {Number} type         评论类型  1 一级评论  2 二级评论
         * @param {String} value        评论内容
         */
        submit(e, value, type=1) {
            let {content, id, userName, parentId} = value
            let params = {
                type,
                articleId: this.$route.query.id,
                content,
                userId: 12,
                userName: '浩哥',
                comment: ++this.detail.detail.comment
            }
            if (type === 2) {
                params.parentId = parentId || id
                params.parentName = userName
                params.userName = 'cici'
                params.userId = 14
            }

            this.$http.post('/blog/client/comment/add', params).then(res => {
                this.getDetail()
            })
        }
    },
    components: {
        Detail,
        CommentInput,
        CommentList,
        Loading
    }
};
</script>

<style lang="less" scoped>
.article-detail-wrapper {
    padding-bottom: 40px;
    .article-detail-comment{
        background: #fff;
        padding: 20px 30px 0;
        h4{
             color: #8a9aa9;
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            padding: 5px 10px;
        }
   
    }
    .article-detail-comment-list{
        padding: 8px 0;
        padding-left: 80px;
        padding-right: 30px;
          background-color: #fff;
    }
}
</style>
