<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScorll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: function () {
        return []
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScorll()
    }, 20)
    // this.$nextTick(() => {
    //   this._initScorll()
    // })
  },
  methods: {
    _initScorll() {
      if (!this.$refs.wrapper) {
        return false
      }
      this.scorll = new BScorll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable() {
      this.scorll && this.scorll.enable()
    },
    disable() {
      this.scorll && this.scorll.disable()
    },
    refresh() {
      this.scorll && this.scorll.refresh()
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.refresh()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>