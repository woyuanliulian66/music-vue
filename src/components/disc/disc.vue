<template>
    <transition name="slide">
        <music-list :bgImage='recommendSongList.imgurl' :title='descList.nickname' :songs='songList'></music-list>
    </transition>
</template>

<script>
import MusicList from '../music-list/music-list'
import {getDisc} from 'api/songdisc.js'
import {mapGetters} from 'vuex'
import {createSongList} from '../../common/js/song'
import {getSongVkey} from '../../api/singer'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songList: [],
      descList: {}
    }
  },
  created() {
    this._getDisc()
  },
  computed: {
    ...mapGetters(['recommendSongList'])
  },
  methods: {
    _getDisc() {
      getDisc(this.recommendSongList.dissid).then((res) => {
        if (res.status === 200) {
          this.descList = res.data.cdlist[0]
          this.createSong(this.descList.songlist)
        }
      })
    },
    createSong(list) {
      if (!this.descList) {
        return
      }
      for (let i = 0; i < list.length - 1; i++) {
        getSongVkey(list[i].songmid).then((e) => {
          list[i].vkey = e.req_0.data.midurlinfo[0].purl
          let result = createSongList(list[i])
          this.songList.push(result)
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active,
.slide-leave-active {
    transition : all 0.3s
}
.slide-enter,
.slide-leave-to {
    transform : translateX(100%)
}
</style>