<template>
    <div :class="{'common-comment-wrapper flex-start': true, 'focused': showBottom}" ref="commonCommentWrapper" :style="{'background-color': backgroundColor}">
        <!-- 默认头像 -->
        <img :src="commentAvatar" alt="" class="common-comment-avatar">
        <!-- 右侧内容 -->
        <div class="common-comment-right">
            <!-- 输入框 -->
            <div class="common-comment-right-box">
                     <div contenteditable="true" placeholder="输入评论..."  :class="{'common-comment-right-input': true, 'before': !content}" @input="handleInput" @focus="handleFocus(1)" @blur="handleFocus(0)" ref="input">
                         {{content}}
                     </div>
            </div>
            <!-- 提交 -->
            <div class="flex-end">
                <div class="common-comment-right-submit">
                    <span>Enter</span>
                    <button @click="submit">评论</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommentAvatar from '@/assets/images/comment-avatar.png'
export default {
    props: {
        backgroundColor: {
            type: String,
            default: '#fafbfc'
        }
    },
    data: () => {
        return {
            commentAvatar: CommentAvatar,
            content: '',
            showBottom: false
        }
    },
    mounted() {
         this.$refs.input.innerText = ''
        // this.showBottom = this.props.showBottom
    },
    methods: {
        /**
         * 受控
         */
        handleInput(e) {
            this.content = e.target.innerText
        },

        /**
         * 获取/离开 焦点
         * @param {Number} type 0 离开焦点 1 获取焦点 
         */
        handleFocus(type) {
            this.showBottom = type
        },

        /**
         * 提交
         */
        submit(e) {
            this.$emit('submit', e, {content: this.content})
            this.content = ''
            this.$refs.input.innerText = ''
        },
        keepLastIndex(obj) {
            obj = obj || this.$refs.input
            if (window.getSelection) {
                //ie11 10 9 ff safari
                obj.focus(); //解决ff不获取焦点无法定位问题
                var range = window.getSelection(); //创建range
                range.selectAllChildren(obj); //range 选择obj下所有子内容
                range.collapseToEnd(); //光标移至最后
            } else if (document.selection) {
                //ie10 9 8 7 6 5
                var range = document.selection.createRange(); //创建选择对象
                //var range = document.body.createTextRange();
                range.moveToElementText(obj); //range定位到obj
                range.collapse(false); //光标移至最后
                range.select();
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .common-comment-wrapper{
        padding: 15px 20px;
        background-color: #fafbfc;
        border-radius: 3px;
        align-items: flex-start;
        .common-comment-avatar{
            width: 30px;
            height: 30px;
            border-radius: 30px;
            margin-right: 15px;
        }
        .common-comment-right{
            flex: 1;
            .common-comment-right-input{
                width: 100%;
                padding: 5px 8px;
                color: #17181a;
                outline: none;
                font-size: 13px;
                border: 1px solid #f1f1f1;
               word-break:break-all
            }
            .common-comment-right-submit{
                margin-top: 8px;
                span{
                    color: #c2c2c2;
                    margin-right: 8px;
                    font-size: 13px;
                }
                button{
                    width: 70px;
                    background-color: #97c9fd;
                    padding: 5px 8px;
                    font-size: 14px;
                    color: #fff;
                    border: none;
                    outline: none;
                    border-radius: 3px;
                }
            }
        }
    }
    .focused{
        .common-comment-right-input{
            border-color: #007fff !important;
        }
    }
</style>