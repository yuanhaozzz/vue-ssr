<template>
    <aside class="main-right">
        <!-- 搜索 -->
        <div class="main-right-input">
            <input type="text" placeholder="时间真是个坏蛋" />
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
                <li>
                    <h4>【GTA5online】100个无能狂怒手办全收集图片位置攻略</h4>
                    <span>8746次围观</span>
                </li>
                <li>
                    <h4>【GTA5online】100个无能狂怒手办全收集图片位置攻略</h4>
                    <span>8746次围观</span>
                </li>
                <li>
                    <h4>【GTA5online】100个无能狂怒手办全收集图片位置攻略</h4>
                    <span>8746次围观</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main-right {
    min-height: 100px;
    width: 22%;
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
