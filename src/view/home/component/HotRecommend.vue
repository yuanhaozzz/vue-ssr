<template>
  <div class="hot-recommend-wrapper">
    <h3>热门推荐</h3>
    <div class="hot-racomment-container">
      <ul class="hot-racomment-list flex-space-around">
        <li v-for="(item, index) of list"
            :key="index">
          <div :style="{'background': `url(${item})  no-repeat center`}"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      list: [
        'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/725677994/O1CN01jKMjfX28vIjpiSUwh_!!0-item_pic.jpg_360x360Q90.jpg_.webp',
        'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/725677994/O1CN01jKMjfX28vIjpiSUwh_!!0-item_pic.jpg_360x360Q90.jpg_.webp',
        'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/725677994/O1CN01jKMjfX28vIjpiSUwh_!!0-item_pic.jpg_360x360Q90.jpg_.webp',
        'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/725677994/O1CN01jKMjfX28vIjpiSUwh_!!0-item_pic.jpg_360x360Q90.jpg_.webp',
        'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/725677994/O1CN01jKMjfX28vIjpiSUwh_!!0-item_pic.jpg_360x360Q90.jpg_.webp',

      ]
    }
  }
}
</script>

<style lang="less" scoped>
.hot-recommend-wrapper {
  margin-top: 30px;
  h3 {
    background: #956637;
    text-align: center;
    font-size: 14px;
    padding: 5px;
    width: 60px;
    color: #fff;
  }
  .hot-racomment-container {
    border: 1px solid #ccc;
    height: 160px;
    .hot-racomment-list {
      width: 100%;
      height: 100%;
      li {
        width: 155px;
        height: 120px;
        border: 1px solid #ccc;
        overflow: hidden;
        cursor: pointer;

        div {
          height: 100%;
          transition: all 0.5s;
        }
        div:hover {
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>