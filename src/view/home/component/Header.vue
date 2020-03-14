<template>
  <div class="home-header flex-start">
    <!-- 轮播图 -->
    <div class="header-slide">
      <img src="http://www.lmlblog.com/blog/11/images/2.jpg">
    </div>
    <!-- 推荐文章 -->
    <div class="header-article">
      <TitleStyle icon="/blog/public/images/good.png"
                  title="推荐文章">
        <ul class="header-article-cotainer">
          <li v-for="(item, index) of list"
              class="flex-start"
              :key="index">
            <i></i>
            {{item.title}}
          </li>
        </ul>
      </TitleStyle>
    </div>
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
.home-header {
  align-items: flex-start;
  height: 320px;
  overflow: hidden;
  .header-slide {
    width: 65%;
    padding-left: 10px;
    img {
      width: 100%;
    }
  }
  .header-article {
    width: 35%;
    padding-left: 30px;
    .header-article-cotainer {
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
}
</style>