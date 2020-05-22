<template>
    <aside class="main-right entry">
        <!-- 搜索 -->
        <div class="main-right-input">
            <input type="text" v-model.trim="keyword" placeholder="月亮不睡你不睡" @keydown.13="searchKeyWord"/>
        </div>
        <!-- 公告 -->
        <div class="main-right-message">
            <h3>公告</h3>
            <p>
                博客正式上线啦，没有用任何脚手架，都是从零搭建，文章正在准备中，迅速来围观呀！！
            </p>
        </div>
        <!-- 热门文章 -->
        <div class="main-right-hot">
            <h3>热门文章</h3>
            <ul>
                <li v-for="item of homeList.hotList" :key="item.id" @click="jumpToDetail(item)">
                    <h4>{{item.title}}</h4>
                    <span>{{item.pageViews}}次围观</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
     asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('article/getHomeList');
    },
    data: () => {
        return {
            keyword: ''
        }
    },
    methods: {
        /**
         * 搜索
         */
        searchKeyWord() {
            let params = {
                type: 5,
                keyword: this.keyword
            }
            this.getHomeList(params)
        },
        /**
         * 跳转详情
         */
        jumpToDetail(item) {
            this.$router.push({
                  path: '/blog/content/detail',
                  query: {
                      id: item.id
                  }
              })
        },
        ...mapActions('article', ['getHomeList'])
    },
       computed: {
        ...mapGetters('article', ['homeList']),
    },
};
</script>

<style lang="less" scoped>
.main-right {
    min-height: 100px;
    width: 22%;
    position: sticky;
    top: 0;
    h3 {
        padding-left: 25px;
        background-size: 18px;
        font-size: 15px;
        margin-bottom: 10px;
    }
    .main-right-input,
    .main-right-message,
    .main-right-hot {
        padding: 10px 15px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 5px;
    }
    .main-right-input {
        padding: 10px 15px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 5px;
        input {
            border: none;
            outline: none;
            padding-left: 25px;
            background: url(~@/assets/images/search.png) no-repeat left center;
            background-size: 20px;
            font-size: 14px;
        }
    }
    .main-right-hot {
        h3 {
            background: url(~@/assets/images/hot.png) no-repeat left center;
            background-size: 18px;
        }
        ul {
            li {
                margin-bottom: 10px;
                font-size: 14px;
                h4 {
                    margin-bottom: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    transition: all 0.4s;
                    cursor: pointer;
                }
                h4:hover {
                    padding-left: 7px;
                    color: #a1a1a1;
                }
                span {
                    color: #657786;
                    font-size: 13px;
                }
            }
        }
    }
    .main-right-message {
        h3 {
            background: url(~@/assets/images/message.png) no-repeat left center;
            background-size: 18px;
        }
        p {
            font-size: 13px;
            line-height: 20px;
            color: #555;
        }
    }
}
</style>
