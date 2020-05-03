<template>
    <div class="recommend-list-wrapper">
        <h4 class="recommend-list-title">图文推荐</h4>
        <ul>
            <li
                class="recommend-list-item flex-start"
                v-for="item of list"
                :key="item.id"
                @click="jumpToDetail(item)"
            >
                <img
                    :src="item.imageUrl"
                    alt=""
                    class="recommend-list-item-cover"
                />
                <div class="recommend-list-item-description">
                    <h4>{{ item.title }}</h4>
                    <div class="recommend-list-item-description-time">
                        {{ item.releaseTime | format('yyyy-MM-dd') }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        /**
         * 跳转详情
         * @param {Object} item 当前数据
         */
        jumpToDetail(item) {
            window.open(`/blog/article/detail?id=${item.id}`);
        },
    },
};
</script>

<style lang="less" scoped>
.recommend-list-wrapper {
    padding-top: 15px;
    .recommend-list-title {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
        border-bottom: #ccc 1px solid;
    }
    ul {
        .recommend-list-item {
            padding: 10px 0;
            font-size: 14px;
            .recommend-list-item-cover {
                width: 70px;
                height: 55px;
            }
            .recommend-list-item-description {
                margin-left: 10px;
                flex: 1;
                h4 {
                    color: #838383;
                    margin-bottom: 10px;
                }
                .recommend-list-item-description-time {
                    padding-left: 30px;
                    background: url('~@/assets/images/calendar.png') no-repeat
                        left center;
                    background-size: 20px 20px;
                }
            }
        }
    }
}
</style>
