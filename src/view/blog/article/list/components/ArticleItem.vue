<template>
    <div class="article-item-container">
        <div class="article-item-info flex-start">
            <img src="https://www.wnooo.cn/content/uploadfile/201905/thum52-37521557483025.jpg" />
            <div class="article-item-info-box">
                <h4>浩哥</h4>
                <span>9天前</span>
            </div>
        </div>
        <div class="article-item-article flex-start">
            <img class="article-cover" src="https://cdn.jsdelivr.net/gh/XSJYA/TU/img/ce8f43c73f1604ceb686a9ad5f79c52989773130.png?m=170x120" />
            <div class="article-box">
                <h4>育碧喜加三 ！！！</h4>
                <p>
                    之前的免费游戏没有领到？“下次一定”来了！即日起至5月5日，《刺客信条2》《光之子》《雷曼：传奇》 三连送！刺客信条2：https://register.ubisoft.com/assassins-creed-2/zh-CN光之子：https://register.ubisoft.com/child-of-light/zh-CN雷曼：传奇：https://register....						
                </p>
            </div>
        </div>
        <div class="article-item-bottom">
            <ul class="flex-space-around">
                <li>
                    <Icon type="md-heart-outline" />
                    <span>11</span>
                </li>
                <li>
                        <Icon type="ios-text-outline" />
                    <span>11</span>
                </li>
                <li>
                    <Icon type="ios-eye-outline" />
                    <span>11</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        
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