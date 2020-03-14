<template>
  <div class="title-style-wrapper">
    <div class="title-style-top flex-start">
      <img :src="icon">
      <h4>{{title}}</h4>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String
  }
}
</script>

<style lang="less" scoped>
.title-style-wrapper {
  width: 100%;
  .title-style-top {
    height: 40px;
    border-bottom: 2px solid #936636;
    img {
      width: 17px;
      height: 17px;
      margin-right: 5px;
    }
  }
}
</style>