<template>
        <scorll class="listview" :data="data" ref='listview' :listenScroll='listenScroll'
        @scroll="scroll"
        :probeType='probeType'>
            <ul>
                <li v-for="(item, index) in data" :key="index" class="list-group" ref="listgroup">
                    <h2 class="list-group-title">{{item.title}}</h2>
                    <ul>
                        <li @click="selectItem(lis)" v-for="(lis,indexs) in item.items" :key="indexs" class="list-group-item">
                            <img class="avatar" v-lazy="lis.avatar">
                            <span class="name">{{lis.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="list-shortcut" @touchstart = 'onShortcutTouchstart'>
                <ul>
                    <li v-for="(item, index) in shortcutlist" class="item"
                    :key="index" :data-index='index'
                    :class="{'current':currentIndex===index}">
                        {{item}}
                    </li>
                </ul>
            </div>
        </scorll>
</template>

<script>
import Scorll from '../scorll/scorll'
export default {
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    shortcutlist() {
      // console.log(this.data)
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    refresh() {
      this.$refs.listview.refresh()
    },
    onShortcutTouchstart(e) {
      let index = e.target.getAttribute('data-index')
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index])
    },
    scroll(pos) {
      // console.log(pos)
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem(item) {
      console.log(item)
      this.$emit('select', item)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currentIndex = i
          return
        }
      }
      console.log(this.currentIndex)
    }
  },
  components: {
    Scorll
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable';
.listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>