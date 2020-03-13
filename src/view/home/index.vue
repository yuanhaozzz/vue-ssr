<template>
  <div>
    么么哒，亲爱的
  </div>
</template>

<script>

export default {
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  data: () => {
    return {
      a: '卧室asd啊'
    }
  },
  methods: {
    handle: function () {
      alert(1)
    }
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items
    }
  }
}
</script>

<style lang="less">
h1 {
  color: pink;
}
</style>