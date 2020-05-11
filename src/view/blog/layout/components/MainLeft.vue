<template>
    <aside class="main-left entry">
        <!-- 介绍 -->
        <div class="main-left-user">
            <div class="main-left-user-background"></div>
            <h2>浩哥</h2>
            <p>对未来有梦想，但不奢求，享受每一时刻即可，想太多毫无意义</p>
            <ul class="main-left-user-blog flex-space-between">
                <li>
                    <span>11</span>
                    <h3>文章</h3>
                </li>
                <li>
                    <span>11</span>
                    <h3>评论</h3>
                </li>
                <li>
                    <span>11</span>
                    <h3>访问量</h3>
                </li>
            </ul>
            <img
                class="main-left-user-avatar"
                src="https://www.wnooo.cn/content/uploadfile/201905/thum-37521557483025.jpg"
                alt=""
            />
        </div>
        <!-- 个人档 -->
        <div class="main-left-about">
            <h2 class="flex-start">
                个人档
            </h2>
            <ul>
                <li class="flex-start">
                    <img :src="qqImage" alt="" />
                    <p>526100629</p>
                </li>
                <li class="flex-start">
                    <img :src="wechatImage" alt="" />
                    <p>526100629</p>
                </li>
                <li class="flex-start">
                    <img :src="houseImage" alt="" />
                    <p>www.yuanhao-web.cn</p>
                </li>
                <li class="flex-start">
                    <img :src="emailImage" alt="" />
                    <p>yuanhao_zzz@163.com</p>
                </li>
            </ul>
        </div>
        <!-- 点赞 -->
        <div class="main-left-good flex-center">
            <h3>Do you like me?</h3>
            <div class="flex-center main-left-good-box">
                <img :src="heartImage" alt="" />
                <span>323</span>
            </div>
        </div>
    </aside>
</template>

<script>
import QqImage from '@/assets/images/QQ.png';
import WechatImage from '@/assets/images/wechat.png';
import HouseImage from '@/assets/images/house.png';
import EmailImage from '@/assets/images/email.png';
import HeartImage from '@/assets/images/heart.png';
export default {
    data: () => {
        return {
            qqImage: QqImage,
            wechatImage: WechatImage,
            houseImage: HouseImage,
            emailImage: EmailImage,
            heartImage: HeartImage,
        };
    },
};
</script>

<style lang="less" scoped>
.main-left {
    min-height: 100px;
    width: 22%;
    .main-left-user,
    .main-left-about {
        margin-bottom: 20px;
        border-radius: 5px;
        background: #fff;
        position: relative;
    }
    .main-left-user {
        .main-left-user-background {
            background-color: gainsboro;
            height: 120px;
            background: url(https://isorepublic.com/wp-content/uploads/2020/03/iso-republic-clouds-in-a-pink-sky-over-wave-soaked-beach-450x300.jpg)
                no-repeat center;
        }
        h2 {
            padding-top: 5px;
            letter-spacing: 0;
            font-weight: 600;
            font-size: 17px;
            text-align: center;
            margin: 10px 0;
        }
        p {
            font-size: 13px;
            color: #999;
            padding: 0 15px 15px;
        }
        .main-left-user-blog {
            border-top: 1px solid #efefef;
            padding: 15px 0;
            li {
                width: 33%;
                text-align: center;
                color: #a5a5a5;
                font-size: 13px;
                border-right: 1px solid #efefef;
                h3 {
                    margin-top: 2px;
                }
            }
            li:last-child {
                border: none;
            }
        }
        .main-left-user-avatar {
            position: absolute;
            top: 90px;
            left: 20px;
            overflow: hidden;
            width: 64px;
            height: 64px;
            border: 3px solid #fff;
            border-radius: 100%;
            background: #fff;
        }
    }
    .main-left-about {
        padding: 15px 20px;
        border-radius: 5px;
        h2 {
            background: url(~@/assets/images/info.png) no-repeat left center;
            background-size: 30px;
            padding-left: 35px;
            margin-bottom: 10px;
        }

        ul {
            li {
                letter-spacing: 1px;
                font-size: 15px;
                border-bottom: 1px solid #efefef;
                padding: 10px 0 8px;
                img {
                    width: 22px;
                    margin-right: 8px;
                }
            }
            li:last-child {
                border: none;
            }
        }
    }
    .main-left-good {
        color: #f4a7b9;
        text-align: center;
        cursor: pointer;
        margin-bottom: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        background: #fff;
        flex-direction: column;
        h3 {
            margin-bottom: 10px;
        }
        .main-left-good-box {
            font-size: 28px;
        }
        img {
            width: 38px;
            margin-right: 10px;
            animation: heart 2s 0.7s;
        }
        @keyframes heart {
            0% {
                transform: scale(0.7);
            }
            50% {
                transform: scale(1.5);
            }
        }
        .main-left-good-box:hover img {
            animation: heart infinite 1s;
        }
    }
}
</style>
