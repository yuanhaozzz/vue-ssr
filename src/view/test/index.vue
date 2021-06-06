<template>
  <div class="container_global">
    <div class="head">
      <div class="return">
        <span style="color: #1989fa">&lt;&ensp;返回</span>
      </div>
      <div class="title"></div>
      <div class="search">123阿萨德4</div>
    </div>
    <div class="search">1234</div>
  </div>
</template>

<style lang="less" scoped>
.container_global {
  height: 180vw;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ebedf0;
}
.head {
  height: 11vw;
  width: 100%;
  background-color: white;
  .return {
    float: left;
    width: 12vw;
    height: 6vw;
    position: absolute;
    left: 6vw;
    top: 3vw;
    font-size: 3.5vw;
    font-family: "Mircosoft Yahei";
    font-weight: bold;
  }
  .title {
    float: left;
    width: 8vw;
    height: 6vw;
    position: absolute;
    font-size: 4vw;
    left: 50%;
    top: 2.5vw;
    transform: translateX(-50%);
    font-family: "Mircosoft Yahei";
    font-weight: bold;
  }
  .search {
    height: 12vw;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 50%;
  }
}
</style>