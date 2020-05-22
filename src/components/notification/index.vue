<template>
    <div :class="{'message-wrapper': true, 'active': show}">
        <h6>温馨提示！</h6>
        <p>{{this.text}}</p>
    </div>
</template>
<script>

export default {
    props: {
        text: {
            type: String,
            default: '点多了伤身体...'
        }
    },
    data: () => {
        return {
            show: false
        }
    },
    methods: {
        open() {
            this.show = true
            setTimeout(() => {
                this.show = false
            }, 2000);
        }
    }
}
</script>
<style lang="less" scoped>
.message-wrapper{
    width: 330px;
    padding: 0 26px 0 13px;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    position: fixed;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    right: 30px;
    bottom: -50px;
    overflow: hidden;
    color: #606266;
    opacity: 0;
    transition: all .8s;
    h6{
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #eee;
        padding: 6px 0;
        color: #53d1ee;
    }
    p{
        padding: 10px;
    }
    
}
.active{
    bottom: 60px;
     opacity: 1;
}
    
</style>