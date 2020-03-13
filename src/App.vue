<template>
  <div class="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>
<script>
if (module.hot) {
  module.hot.accept();
}

</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
</style>