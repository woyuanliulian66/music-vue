<template>
    <div>
        <img src="./loading.gif" width="30" alt="">
        <div class="desc">{{title}}</div>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>