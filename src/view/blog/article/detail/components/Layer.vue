<template>
    <div class="layer-detail-wrapper flex-center" v-if="isShow" @click="closeLayer">
         <div @click.stop="">
             <!-- 操作 -->
            <div class="article-detail-header flex-start">
                    <ul class="flex-start">
                        <li @click="closeLayer"></li>
                        <li @click="closeLayer"></li>
                        <li @click="closeLayer"></li>
                    </ul>
                </div>
            <!-- 详情 -->
            <layer-detail ref="layerDetail" :detail="detail"></layer-detail>
            <!-- 完成内容 -->
            <p class="article-detail-footer" @click="jumpToDetail">查看完整内容</p>
         </div>
    </div>
</template>

<script>
import LayerDetail from './Detail'
import { mapGetters } from 'vuex';

export default {
    data: () => {
        return {
            isShow:false,
            item: {}
        }
    },
    methods: {
        /**
         * 获取详情
         */
        getDetail() {
            this.$store.dispatch('article/getDetail', {id:this.item.id}).then(() => {
                this.isShow = true
                // if (!this.isLayer) {
                //      let { id, pageViews } = this.detail;
                //     let params = {
                //         id,
                //         pageViews: +pageViews + 1
                //     };
                //     this.$http.post('/blog/client/update/data', params);
                // }
               
            })
        },

        /**
         * 关闭弹窗
         */
        closeLayer() {
            this.isShow = false
        },

         /**
         * 打开弹窗
         */
        openLayer(item) {
            this.item = item
            this.getDetail()
            
        },
        
        /**
         * 跳转详情
         */
        jumpToDetail() {
            console.log(this.item.id)
            this.$router.push({
                  path: '/blog/content/detail',
                  query: {
                      id: this.item.id
                  }
              })
        }
        
    },
    computed: {
        ...mapGetters('article', ['detail']),

    },
    components: {
        LayerDetail
    },
};
</script>

<style lang="less" scoped>
.layer-detail-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: scroll;
    z-index: 99;
    padding-top: 40px;

     .article-detail-header{
        position: relative;
        background: #f3f3f3;
        border-radius: 5px;
        font-size: 10px;
        height: 24px;
        padding-left: 10px;
        ul{
            li{
                width: 9px;
                height: 9px;
                border-radius: 10px;
                margin-right: 5px;
            }
            li:nth-of-type(1){
                background-color: #f46965;
            }
            li:nth-of-type(2){
                background-color: #e9cd06;
            }
            li:nth-of-type(3){
                background-color: #81d95e;
            }
        }
    }
    .article-detail-footer{
        text-align: center;
        border-top: 1px solid #eee;
        padding: 15px 2px;
        color: #666;
        font-size: 16px;
        cursor: pointer;
        width: 800px;
        margin: 0 auto 50px;
        background-color: #fff;
           border-radius: 0 0px 5px 5px;
    }
    .article-detail-footer:hover{
        background-color: #f5f8fa;;
    }
}
</style>
