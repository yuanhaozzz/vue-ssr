<template>
  <div class="article-list-wrapper flex-start">
    <!-- 最新文章 -->
    <div class="article-now-list">
      <TitleStyle icon="/blog/public/images/wifi.png"
                  title="最新文章">
        <ul class="article-now-list-container">
          <li v-for="(item, index) of list"
              :key="index">
            <h3>{{item.title}}</h3>
            <span>发布时间：{{item.time}} 作者：{{item.author}} </span>
            <div class="flex-start list-item-bottom">
              <img :src="item.image"
                   alt="">
              <div class="list-item-bottom-description">
                <p>{{item.description}}</p>
                <div class="flex-end">
                  <button>查看全文</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </TitleStyle>
    </div>
    <!-- 侧边栏文章 -->
    <div class="article-sidebar">
      <!-- 热门文章 -->
      <section>
        <HotArticle></HotArticle>
      </section>
    </div>
  </div>
</template>

<script>
import TitleStyle from './TitleStyle'
import HotArticle from './HotArticle'
export default {
  data: () => {
    return {
      list: [
        { title: '终于等到你(电视剧《咱们结婚吧》主题曲) - 张靓颖', time: '2020-03-14', author: '你大爷', image: 'http://www.lmlblog.com/blog/11/images/4.jpg', description: '　　到了某个年纪你就会知道 一个人的日子真的难熬 渐渐开始尝到孤单的味道 时间在敲打着你的骄傲 过了某个路口你就会感到 彻夜陪你聊天的越来越少 厌倦了被寂寞追着跑 找个爱你的人就想托付终老 能陪我走一程的人有多少 愿意走完一生的更是寥寥 是...' },
        { title: '终于等到你(电视剧《咱们结婚吧》主题曲) - 张靓颖', time: '2020-03-14', author: '你大爷', image: 'http://www.lmlblog.com/blog/11/images/4.jpg', description: '　　到了某个年纪你就会知道 一个人的日子真的难熬 渐渐开始尝到孤单的味道 时间在敲打着你的骄傲 过了某个路口你就会感到 彻夜陪你聊天的越来越少 厌倦了被寂寞追着跑 找个爱你的人就想托付终老 能陪我走一程的人有多少 愿意走完一生的更是寥寥 是...' },
        { title: '终于等到你(电视剧《咱们结婚吧》主题曲) - 张靓颖', time: '2020-03-14', author: '你大爷', image: 'http://www.lmlblog.com/blog/11/images/4.jpg', description: '　　到了某个年纪你就会知道 一个人的日子真的难熬 渐渐开始尝到孤单的味道 时间在敲打着你的骄傲 过了某个路口你就会感到 彻夜陪你聊天的越来越少 厌倦了被寂寞追着跑 找个爱你的人就想托付终老 能陪我走一程的人有多少 愿意走完一生的更是寥寥 是...' },
        { title: '终于等到你(电视剧《咱们结婚吧》主题曲) - 张靓颖', time: '2020-03-14', author: '你大爷', image: 'http://www.lmlblog.com/blog/11/images/4.jpg', description: '　　到了某个年纪你就会知道 一个人的日子真的难熬 渐渐开始尝到孤单的味道 时间在敲打着你的骄傲 过了某个路口你就会感到 彻夜陪你聊天的越来越少 厌倦了被寂寞追着跑 找个爱你的人就想托付终老 能陪我走一程的人有多少 愿意走完一生的更是寥寥 是...' },
        { title: '终于等到你(电视剧《咱们结婚吧》主题曲) - 张靓颖', time: '2020-03-14', author: '你大爷', image: 'http://www.lmlblog.com/blog/11/images/4.jpg', description: '　　到了某个年纪你就会知道 一个人的日子真的难熬 渐渐开始尝到孤单的味道 时间在敲打着你的骄傲 过了某个路口你就会感到 彻夜陪你聊天的越来越少 厌倦了被寂寞追着跑 找个爱你的人就想托付终老 能陪我走一程的人有多少 愿意走完一生的更是寥寥 是...' },
      ]
    }
  },
  components: {
    TitleStyle,
    HotArticle
  }
}
</script>

<style lang="less" scoped>
.article-list-wrapper {
  margin-top: 20px;
  align-items: flex-start;
  .article-sidebar {
    width: 35%;
  }
  .article-now-list {
    width: 65%;
    padding-right: 20px;
    border-right: 1px dashed #ccc;
    .article-now-list-container {
      li {
        padding: 18px;
        h3 {
          color: #333;
        }
        h3:hover {
          text-decoration: underline;
        }
        span {
          font-size: 12px;
          color: #aaa;
          margin: 5px 0;
        }
        .list-item-bottom {
          margin-top: 5px;
          img {
            border-radius: 3px;
            width: 200px;
            height: 138px;
            display: block;
            cursor: pointer;
            margin-right: 15px;
          }
          .list-item-bottom-description {
            p {
              font-size: 14px;
              line-height: 25px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
            }
            button {
              padding: 5px 10px;
              border-radius: 5px;
              text-align: center;
              font-size: 12px;
              float: right;
              margin-top: 10px;
              color: #fff;
              background: #998e6b;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>