<template>
  <div class="loadin-postion" v-show="show">
    <div class="loading">
      <img class="img-pos" src="./loading.gif" width="30" alt />
      <div class="desc">{{title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    },
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.loadin-postion {
  width: 100%;
  height :100%
  display: flex;
  flex-direction :column
  justify-content :center
  align-items :center
  .loading{
    display :flex
    flex-direction column-reverse
    .desc {
      width :100%
    justify-content :center
  }
    .img-pos {
    justify-content :center
  }
  }
}
</style>