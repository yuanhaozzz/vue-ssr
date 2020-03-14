<template>
  <div class="hot-article-wrapper">
    <TitleStyle icon="/blog/public/images/hot.png"
                title="热门文章">
      <ul class="hot-article-cotainer">
        <li v-for="(item, index) of list"
            class="flex-start"
            :key="index">
          <i></i>
          {{item.title}}
        </li>
      </ul>
    </TitleStyle>
  </div>
</template>

<script>
import TitleStyle from './TitleStyle'
export default {
  data: () => {
    return {
      list: [
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
        { title: '我很想打扰你 可是没有话题也没有勇气' },
      ]
    }
  },
  components: {
    TitleStyle
  }
}
</script>

<style lang="less" scoped>
.hot-article-wrapper {
  padding-left: 10px;
  .hot-article-cotainer {
    li {
      font-size: 14px;
      height: 33px;
      line-height: 33px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      i {
        width: 5px;
        height: 5px;
        background-color: #996c39;
        border-radius: 30px;
        margin-right: 15px;
      }
    }
    li:hover {
      color: #f26868;
    }
  }
}
</style>