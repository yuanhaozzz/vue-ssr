<template>
    <header class="header-container">
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
                    <router-link to="/blog/content/detail">
                        <li class="flex-start">
                            <span>留言板</span>
                        </li>
                    </router-link>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    data: () => {
        return {
        };
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
                    span{
                        margin-left: 5px;
                    }
                }
                li:hover {
                    color: #a1a1a1;
                }
            }
        }
    }
}
</style>
