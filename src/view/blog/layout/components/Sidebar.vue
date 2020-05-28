<template>
    <div :class="{'sidebar-wrapper': true, 'sidebar': sidebar}">
        <!-- 日期 -->
        <div class="sidebar-date flex-start">
            <img :src="calendar" />
            <span>{{totleDays}}</span>
        </div>
        <!-- 信息 -->
        <div class="sidebar-info flex-start">
            <img src="https://www.iqei.cn/content/templates/NULL/images/tx.jpg">
            <h1>浩哥</h1>
        </div>
        <!-- 信息 -->
        <div class="sidebar-info flex-start">
            对未来有梦想，但不奢求，享受每一时刻即可，想太多毫无意义
        </div>
        <!-- 菜单 -->
        <ul class="sidebar-menu">
            <router-link to="/">
                <li class="flex-start">
                    <img :src="sidebarHome">
                    首页
                </li>
            </router-link>
            <router-link to="/blog/content/message">
                <li class="flex-start">
                    <img :src="sidebarMessage">
                    留言板
                </li>
            </router-link>

        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Calendar from '@/assets/images/sidebar-calendar.png'
import SidebarHome from '@/assets/images/sidebar-home.png'
import SidebarMessage from '@/assets/images/sidebar-message.png'
export default {
    data: () => {
        return {
            calendar: Calendar,
            sidebarHome: SidebarHome,
            sidebarMessage: SidebarMessage,
        }
    },
    computed: {
        ...mapGetters('article', ['sidebar']),
        totleDays () {
            let date = +new Date('2020/05/28')
            let nowDate = +new Date()

            return Math.round((nowDate - date) / 1000 / 60 / 60 / 24) + '天'
        }
    }
}
</script>
<style lang="less" scoped>
.sidebar-wrapper {
    height: 100%;
    width: 260px;
    position: fixed;
    top: 0;
    left: -260px;
    transition: all 0.4s;
    background-color: #fff;
    overflow: hidden;
    background: url(https://images.pexels.com/photos/1497148/pexels-photo-1497148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)
        no-repeat top center;
    padding: 20px;
    letter-spacing: 4px;
    color: #fff;

    .sidebar-date {
        margin-bottom: 20px;
        img {
            width: 25px;
            margin-right: 15px;
        }
        span {
            font-weight: 900;
            font-size: 15px;
        }
    }
    .sidebar-info {
        margin-bottom: 15px;
        img {
            width: 35px;
            height: 35px;
            border: 2px solid #fff;
            border-radius: 100%;
            margin-right: 15px;
        }
        h1 {
            font-weight: 600;
            font-size: 24px;
        }
    }
    .sidebar-menu {
        a {
            color: #fff !important;
        }
        li {
            padding: 10px 0;
            background: url(~@/assets/images/rightarrow.png) no-repeat center
                right;
            background-size: 30px;

            img {
                width: 25px;
                margin-right: 20px;
            }
        }
    }
}
.sidebar {
    left: 0;
}
</style>