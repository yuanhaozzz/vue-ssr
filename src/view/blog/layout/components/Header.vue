<template>

    <header class="header-container">
        <!-- pc -->
        <div class="pc-header-menu">
            <div class="header-menu flex-start">
                <h1>
                    浩哥的个人博客
                </h1>
                <nav>
                    <ul class="flex-start">
                        <router-link to="/">
                            <li class="flex-start">
                                <span>首页</span>
                            </li>
                        </router-link>
                        <router-link to="/blog/content/message">
                            <li class="flex-start">
                                <span>留言板</span>
                            </li>
                        </router-link>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- 移动端 -->
        <div :class="{'mobile-header-menu': true, 'action':sidebar }">
            <div class="mobile-header-menu-box flex-space-between">
                <img :src="menu"
                     @click="showSidebar">
                <h1>浩哥的个人博客</h1>
                <img :src="search"
                     @click="showSearch">
            </div>
            <!-- 搜索 -->
            <div class="main-right-input"
                 v-if="isShowSearch">
                <input type="text"
                       v-model.trim="keyword"
                       placeholder="月亮不睡你不睡"
                       @keydown.13="searchKeyWord" />
            </div>
        </div>

    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Search from '@/assets/images/search.png'
import Menu from '@/assets/images/menu.png'
export default {
    data: () => {
        return {
            search: Search,
            menu: Menu,
            isShowSearch: false,
            keyword: ''
        };
    },
    methods: {
        /**
         * 展示侧边栏
         */
        showSidebar () {
            this.$store.commit('article/showSidebar', !this.sidebar)
        },
        /**
         * 展示搜索框
         */
        showSearch () {
            this.isShowSearch = !this.isShowSearch
        },

        /**
         * 搜索关键词
         */
        searchKeyWord () {
            let params = {
                type: 5,
                keyword: this.keyword
            }
            this.getHomeList(params)
        },
        ...mapActions('article', ['getHomeList'])
    },
    computed: {
        ...mapGetters('article', ['sidebar']),
    },
};
</script>

<style lang="less" scoped>
.header-container {
    background-color: #fff;
    .header-menu {
        max-width: 1200px;
        margin: 0 auto;
        height: 50px;
        h1 {
            height: 100%;
            line-height: 50px;
            font-size: 22px;
            color: #464646;
            margin-right: 20px;
            a {
                font-size: 25px;
                color: #464646;
            }
        }
        nav {
            ul {
                li {
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 16px;
                    margin-right: 10px;
                    span {
                        margin-left: 5px;
                    }
                }
                li:hover {
                    color: #a1a1a1;
                }
            }
        }
    }
    .mobile-header-menu {
        display: none;
    }
}

@media screen and (max-width: 756px) {
    .header-container {
        .pc-header-menu {
            display: none;
        }
        .mobile-header-menu {
            display: block;
            padding: 10px 0;
            transition: all 0.4s;
            .mobile-header-menu-box {
                padding: 0 10px;
                img {
                    width: 8%;
                }
                h1 {
                    font-size: 18px;
                }
            }
            .main-right-input {
                padding: 10px 15px 0;
                background-color: #fff;
                border-radius: 5px;
                input {
                    border: none;
                    outline: none;
                    background: url(~@/assets/images/search.png) no-repeat 5px
                        center;
                    background-size: 20px;
                    font-size: 14px;
                    padding: 5px 15px 5px 40px;
                    width: 100%;
                    outline: 0;
                    border: 0;
                    border-radius: 50px;
                    padding-left: 25px;
                    background-color: #efefef !important;
                    color: #383838;
                    font-size: 14px;
                }
            }
        }
        .action {
            transform: translate(260px, 0);
            opacity: 0.8;
            filter: blur(5px);
        }
    }
}
</style>
