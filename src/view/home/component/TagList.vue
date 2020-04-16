<template>
  <div class="tag-list-wrapper">
      <div class="tag-list-title">热门标签</div>
      <ul class="tag-list-box flex-start">
          <li class="tag-list-item bg1">
              javascript
          </li>
          <li class="tag-list-item bg2">
              css
          </li>
          <li class="tag-list-item bg3">
              html
          </li>
          <li class="tag-list-item bg1">
              vue
          </li>
          <li class="tag-list-item bg4">
              react
          </li>
          <li class="tag-list-item bg4">
              服务端渲染
          </li>
            <li class="tag-list-item bg1">
              从零搭建webpack
          </li>
      </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.tag-list-wrapper{
    margin-top: 30px;
    .tag-list-title{
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
        border-bottom: #CCC 1px solid;
    }
    .tag-list-box{
        flex-wrap: wrap;
        margin: 0 auto;
        padding-top: 20px;
        padding-bottom: 20px;
        .tag-list-item{
            font-size: 14px;
            color: #fff;
            margin: 5px;
            padding: 5px;
            border-radius: 5px;
        }
        .bg1{
            background: #CCCC00;
        }
        .bg2{
            background: #518ab2;
        }
        .bg3{
            background: #FFCC99;
        }
        .bg4{
            background: #FF6600;
        }

    }
}

</style>