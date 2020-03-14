<template>
  <div class="recommend" ref="recommend">
      <scorll ref="scorll" class="recommend-content" :data='recommends'>
        <div>
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
            <slider>
                <div v-for='(item, index) in recommends' :key="index" >
                    <a :href="item.linkUrl">
                        <img @onload='loadImage' :src="item.picUrl" alt="" :key="index">
                    </a>
                </div>
            </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门榜单推荐</h1>
            <ul>
              <li v-for="(item, index) in distList" :key='index' class="item" @click="getDisc(item)">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl" alt="">
                </div>
                <div class="text">
                  <h2 class="name">{{item.creator.name}}</h2>
                  <p class="desc">{{item.dissname}}</p>
                </div>
              </li>
            </ul>
        </div>
        </div>
         <div class="loading-container" v-show="!distList.length">
          <loading></loading>
        </div>
      </scorll>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import loading from '../../base/loading/loading'
import { getRecommend, getDiscList } from '../../api/recommend'
import Slider from '../../base/slider/slider'
import Scorll from '../../base/scorll/scorll'
import { ERR_OK } from '../../api/config'
import {playlistMixin} from '../../common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      distList: []
    }
  },
  created() {
    this.$nextTick(() => {
      this._getRecommend()
    })
    setTimeout(() => {
      getDiscList().then((res) => {
        this.distList = res.data.list
      })
    }, 10)
  },
  methods: {
    ...mapMutations({
      setSongList: 'SET_SONG_LIST'
    }),
    getDisc(item) {
      // console.log(this.distList)
      console.log(item)
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setSongList(item)
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : '0px'
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scorll.refresh()
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    loadImage() {
      if (!this.checkLoad) {
        this.$refs.scorll.refresh()
        this.checkLoad = true
      }
    }
  },
  components: {
    Slider,
    Scorll,
    loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width : 100%
        text-align :center
        top: 50%
        transform: translateY(-50%)
</style>