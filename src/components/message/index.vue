<template>
    <div :class="{'common-message-wrapper flex-start': true, 'action': action}">
        <img :src="warning"
             alt="">
        {{text}}
    </div>
</template>

<script>
import Warning from '@/assets/images/warning.png'
export default {
    data: () => {
        return {
            action: false,
            warning: Warning,
            text: ''
        }
    },
    mounted () {
    },
    methods: {
        open (text) {
            this.text = text
            this.action = true
            setTimeout(() => {
                this.action = false
            }, 2000);
        }
    }

}
</script>

<style lang="less" scoped>
.common-message-wrapper {
    position: fixed;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #edf2fc;
    transition: all 1s;
    padding: 15px 15px 15px 20px;
    opacity: 0;
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
    font-size: 14px;
    img {
        width: 26px;
        margin-right: 10px;
    }
}
.action {
    opacity: 1;
    top: 40px;
}
</style>