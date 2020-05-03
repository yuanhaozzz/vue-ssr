<template>
    <div class="hot-article-wrapper">
        <div class="hot-article-title">
            <h3>热门文章</h3>
        </div>
        <ul class="hot-article-cotainer">
            <li
                v-for="(item, index) of hotList"
                @click="jumpToDetail(item)"
                class="flex-start"
                :key="index"
            >
                <div
                    :class="{
                        first: index === 0,
                        second: index === 1,
                        third: index === 2
                    }"
                >
                    {{ index + 1 }}
                </div>
                <p>
                {{ item.title }}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        hotList: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        /**
         * 跳转详情
         * @param {Object} item 当前数据
         */
        jumpToDetail(item) {
            window.open(`/blog/article/detail?id=${item.id}`);
        }
    }
};
</script>

<style lang="less" scoped>
.hot-article-wrapper {
    padding-left: 10px;
    .hot-article-title {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
        border-bottom: #ccc 1px solid;
        color: #5d5d5d;
    }
    .hot-article-cotainer {
        li {
            font-size: 14px;
            height: 33px;
            line-height: 33px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            color: #838383;
            div {
                margin-right: 10px;
                width: 20px;
                height: 15px;
                background-color: #555;
                text-align: center;
                font-size: 12px;
                line-height: 15px;
                color: #fff;
            }
            p{
                width:90%;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;

            }
            .first {
                background-color: #ff3300;
            }
            .second {
                background-color: #f60;
            }
            .third {
                background-color: #f90;
            }
        }
        li:hover {
            color: #f26868;
        }
    }
}
</style>
