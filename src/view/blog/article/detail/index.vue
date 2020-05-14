<template>
    <div class="article-detail-container">
        <detail ref="detail" :isLayer="false"/>
    </div>
</template>

<script>
import Detail from './components/Detail'
export default {
    mounted() {

        this.$refs.detail.openLayer({id:this.$route.query.id})
    },
    components: {
        Detail
    }
};
</script>

<style lang="less" scoped>
.article-detail-container {
    padding-bottom: 40px;
}
</style>
