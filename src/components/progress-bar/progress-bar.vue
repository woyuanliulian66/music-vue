<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
            @touchstart.prevent = 'progressTouchStart'
            @touchmove.prevent = 'progressMove'
            @touchend = 'progressEnd'>
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
const BtnWidth = 16
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressMove(e) {
      if (!this.touch.init) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - BtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    progressEnd(e) {
      this.touch.init = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - BtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('precentChange', percent)
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    }
  },
  watch: {
    percent(newval) {
      if (newval >= 0 && !this.touch.init) {
        const barWidth = this.$refs.progressBar.clientWidth - BtnWidth
        const offsetWidth = newval * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
 @import "../../common/stylus/variable"

  .progress-bar
    height: 30px
    padding : 0 5px 0 5px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>