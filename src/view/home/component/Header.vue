<template>
    <div class="home-header flex-start">
        <!-- 轮播图 -->
        <div class="header-slide">
            <img src="http://www.lmlblog.com/blog/7/images/a4.jpg" />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.home-header {
    align-items: flex-start;
    overflow: hidden;
    .header-slide {
        width: 100%;
        img {
            width: 100%;
        }
    }
}
</style>
