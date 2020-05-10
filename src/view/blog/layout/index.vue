<template>
    <div class="blog-wrapper">
        <blog-header></blog-header>
        <blog-main></blog-main>
    </div>
</template>

<script>
import BlogHeader from './components/Header';
import BlogMain from './components/BlogMain';
export default {
    components: {
        BlogHeader,
        BlogMain,
    },
};
</script>

<style lang="less" scoped>
.blog-wrapper {
    height: 100%;
    background-color: #f9f9ff;
}
</style>
