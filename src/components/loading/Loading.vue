<template>
    <div class="loading-wrapper">
        <ul class="flex-start">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
};
</script>

<style lang="less" scoped>
.loading-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    z-index: 100;
    ul {
        li {
            margin-right: 10px;
            width: 5px;
            height: 40px;
            background-color: #34cdf0;
            animation: load infinite 0.8s;
        }
        @keyframes load {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.5);
            }
            80% {
                transform: scale(0.7);
            }
            80% {
                transform: scale(1);
            }
        }
        li:nth-of-type(1) {
            animation-delay: 0.1s;
        }
        li:nth-of-type(2) {
            animation-delay: 0.2s;
        }
        li:nth-of-type(3) {
            animation-delay: 0.3s;
        }
        li:nth-of-type(4) {
            animation-delay: 0.4s;
        }
    }
}
</style>
