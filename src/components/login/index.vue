<template>
    <div class="common-login-wrapper flex-space-between">
        <!-- 头像 -->
        <img :src="`http://yuanhao-web.cn/server/uploads/avatar${random}.jpg`"
             @click="handleAvatar"
             alt="">
        <!-- 姓名 -->
        <input type="text"
               v-model.trim="name"
               placeholder="Name"
               @blur="handleInfo('name')">
        <!-- 邮箱 -->
        <input type="email"
               v-model.trim="email"
               placeholder="Email"
               @blur="handleInfo('email')">
        <!-- 网址 -->
        <input type="url"
               v-model.trim="url"
               placeholder="Url"
               @blur="handleInfo('url')">
        <!-- 消息弹窗 -->
        <message ref="message" />
    </div>
</template>

<script>
import Message from '@/components/message'
import { getLocalStorage, setLocalStorage } from '@/utils/common'
export default {
    data: () => {
        return {
            name: '',
            email: '',
            url: '',
            random: 1
        }
    },
    mounted () {
        this.getAvatar()
    },
    methods: {
        /**
         * 提供用户信息
         */
        getUserinfo () {
            let { name, email, url, random } = this
            if (!name) {
                this.$refs.message.open('请填写名称')
                return false
            } else if (!email) {
                this.$refs.message.open('请填写邮箱')
                return false
            } else if (!url) {
                this.$refs.message.open('请填写地址')
                return false
            }
            return {
                name,
                email,
                url,
                avatar: `http://yuanhao-web.cn/server/uploads/avatar${random}.jpg`
            }
        },

        /**
         * 获取头像
         */
        getAvatar () {
            this.random = getLocalStorage('avatar') || 1
        },

        /**
         * 切换头像
         */
        handleAvatar () {
            this.random = Math.ceil(Math.random() * 10);
            setLocalStorage('avatar', this.random)
        },

        /**
         * 获取用户信息
         * @param {String} type     输入类型
         */
        handleInfo (type) {
            let string = ''
            setLocalStorage(type, this[type])
        }
    },
    components: {
        Message
    }

}
</script>

<style lang="less" scoped>
.common-login-wrapper {
    margin-bottom: 10px;
    img {
        width: 40px;
        border-radius: 50px;
        cursor: pointer;
    }
    input {
        width: 33.3%;
        line-height: 19px;
        padding: 5px;
        margin-left: 10px;
        border: 0;
        border-bottom: 1px solid #ddd;
        border-radius: 0;
        background-color: rgb(250, 251, 252);
        outline: none;
    }
}
</style>