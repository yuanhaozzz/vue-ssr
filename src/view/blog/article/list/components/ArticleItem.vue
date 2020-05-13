<template>
    <div class="article-item-container">
        <div class="article-item-info flex-start">
            <img src="https://www.wnooo.cn/content/uploadfile/201905/thum52-37521557483025.jpg" />
            <div class="article-item-info-box">
                <h4>浩哥</h4>
                <span>{{ article.releaseTime | formatDate}}</span>
            </div>
        </div>
        <div class="article-item-article flex-start">
            <img class="article-cover" :src="article.imageUrl" />
            <div class="article-box">
                <h4>{{article.title}}</h4>
                <p>
                   {{article.description}}						
                </p>
            </div>
        </div>
        <div class="article-item-bottom">
            <ul class="flex-space-around">
                <li>
                    <span>11</span>
                </li>
                <li>
                    <span>11</span>
                </li>
                <li>
                    <span>{{article.pageViews}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            article: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>

<style lang="less" scoped>
.article-item-container{
    background: #fff;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
    .article-item-info{
        margin-bottom: 18px;
        img{
            border-radius: 5px;
            width: 45px;
            height: 45px;
            margin-right: 15px;
        }
        .article-item-info-box{
            color: #464646;
            h4{
                margin-bottom: 6px;
                font-size: 17px;
            }
            span{
                font-size: 14px;
            }
        }
    }
    .article-item-article{
        margin: 10px 0;
        border-radius: 5px;
        border: 1px solid #e5e9ef;
        img{
            width: 170px;
            height: 120px;
        }
        .article-box{
            flex: 1;
            padding: 15px;
            h4{
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            p{
                font-size: 14px;
                margin-top: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 19px;
                max-height: 38px;
                color: #99a2aa;
            }
        }
    }
    .article-item-bottom{
        border-top: 1px solid #f4f4f4;
        margin-top: 15px;
        li{
            width: 33%;
            text-align:center;
             border-right: 1px solid #f4f4f4;
            font-size: 16px;
               color: #999;

        }
        li:last-child{
            border: none;
        }
    }
}
</style>