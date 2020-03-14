<template>
  <div class="home-wrapper">
    <!-- 轮播图 推荐文章 -->
    <section>
      <Header></Header>
    </section>
    <!-- 最新推荐 -->
    <section>
      <HotRecommend></HotRecommend>
    </section>
    <!-- 最新文章 热门文章 -->
    <section>
      <ArticleList></ArticleList>
    </section>
  </div>
</template>

<script>
import Header from './component/Header'
import HotRecommend from './component/HotRecommend'
import ArticleList from './component/ArticleList'

export default {
  //   asyncData ({ store, route }) {
  //     // 触发 action 后，会返回 Promise
  //     return store.dispatch('fetchItem', route.params.id)
  //   },
  data: () => {
    return {
    }
  },
  methods: {

  },
  components: {
    Header,
    HotRecommend,
    ArticleList
  }
}
</script>

<style lang="less" scope>
.home-wrapper {
  width: 1000px;
  border-radius: 18px;
  background: #f8f6f2;
  padding: 10px 0;
}
</style>