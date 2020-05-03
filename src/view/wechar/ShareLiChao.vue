<template>
    <div class="share-wrapper">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>
                <div class="share-swiper-item">1</div>
            </swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.share-wrapper',
                },
                // Some Swiper option/callback...
            },
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.$swiper;
        },
    },
    mounted() {
        console.log('Current Swiper instance object', this.swiper);
        this.swiper.slideTo(3, 1000, false);
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    directives: {
        swiper: directive,
    },
};
</script>

<style lang="less">
.share-wrapper {
    .share-swiper-item {
        height: 300px;
        background-color: red;
    }
}
</style>
