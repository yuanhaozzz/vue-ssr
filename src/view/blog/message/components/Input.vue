<template>
    <div :class="{'message-input-wrapper': true, 'message-input-position': isPosition}"
         @click.stop="">
        <div class="message-input-top flex-start"
             v-if="isShowLogin">
            <!-- 姓名 -->
            <input type="text"
                   v-model="name"
                   @blur="handleInfo('name')"
                   placeholder="昵称(必填)">
            <!-- 邮箱 -->
            <input type="email"
                   v-model="email"
                   @blur="handleInfo('email')"
                   placeholder="邮箱地址">
            <!-- 网址 -->
            <input type="url"
                   v-model="url"
                   @blur="handleInfo('url')"
                   placeholder="个人主页">
        </div>
        <div class="message-input-center flex-start">
            <img :src="`http://yuanhao-web.cn/server/uploads/avatar${random}.jpg`"
                 @click="handleAvatar"
                 title="注册时可切换头像呦！">
            <textarea v-model="content"
                      @focus="handleFocus(1)"
                      @blur="handleFocus(0)"
                      :placeholder="replyUserData.userName ? '回复：' + replyUserData.userName : '既然来了，写点什么吧'"></textarea>
        </div>
        <div class="message-input-bottom flex-end">
            <button @click="handleSubmit">提交留言</button>
        </div>
    </div>
</template>
<script>
import { getLocalStorage, setLocalStorage, showLoading, hideLoading } from '@/utils/common'
export default {
    props: {
        isPosition: {
            type: Boolean,
            default: false
        },
        replyUserData: {
            type: Object,
            default: () => { }
        }
    },
    data: () => {
        return {
            name: '',
            email: '',
            url: '',
            content: '',
            isShowLogin: false,
            random: ''
        }
    },
    mounted () {
        this.initPage()
    },
    methods: {
        /**
         * 初始化页面
         */
        initPage () {
            this.random = getLocalStorage('avatar') || 8
        },

        /**
         * 切换头像
         */
        handleAvatar () {
            if (getLocalStorage('avatar')) {
                return
            }
            this.random = Math.ceil(Math.random() * 10);
        },
        /**
         * 展示登录
         */
        showLogin () {
            if (!getLocalStorage('name')) {
                this.isShowLogin = true;
            }
        },

        /**
         * 处理提交
         */
        handleSubmit () {
            showLoading()
            // 存头像
            setLocalStorage('avatar', this.random)
            // 隐藏头像
            this.isShowLogin = false
            if (!this.content) {
                return
            }

            let params = {
                userName: getLocalStorage('name'),
                avatar: `http://yuanhao-web.cn/server/uploads/avatar${this.random}.jpg`,
                content: this.content
            }
            if (this.replyUserData.userName) {
                params.parentName = this.replyUserData.userName
                params.parentId = this.replyUserData.parentId || this.replyUserData.id
                params.type = 2
            }
            this.$http.post('/blog/client/message/add', params).then(res => {
                this.content = ''
                this.$emit('hideLayer')
                this.$emit('getList')
                hideLoading()
            })
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
         * 获取/离开 焦点
         * @param {Number} type 0 离开焦点 1 获取焦点
         */
        handleFocus (type) {
            if (type === 1) {
                this.showLogin();
            }
        },
    }
}
</script>
<style lang="less" scoped>
.message-input-wrapper {
    .message-input-top {
        margin-bottom: 10px;
        input {
            width: 33.333%;
            border: 0;
            border-bottom: 1px dashed #ddd;
            border-radius: 0;
            padding: 10px;
            font-size: 13px;
        }
        input:focus {
            border-bottom: 1px dashed #9c51ff;
        }
    }
    .message-input-center {
        margin-bottom: 25px;
        img {
            width: 100px;
            height: 100px;
            margin-right: 10px;
            border-radius: 6px;
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }
        textarea {
            width: 100%;
            height: 100px;
            max-width: 100%;
            border: 0.05rem solid #caced7;
            border-radius: 6px;
            background: url(http://yuanhao-web.cn/server/uploads/pl.png)
                no-repeat bottom right;
            padding: 10px;
        }
        textarea:focus {
            box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.3);
        }
    }
    .message-input-bottom {
        button {
            background: #fff;
            border: 1px solid #9c51ff;
            border-radius: 5px;
            color: #9c51ff;
            cursor: pointer;
            padding: 3px 8px;
        }
    }
}
.message-input-position {
    min-width: 550px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    // display: none;
}
</style>