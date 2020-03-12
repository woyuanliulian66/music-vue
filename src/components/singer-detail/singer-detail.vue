<template>
    <transition>
      <music-list :songs='songs' :title="title" :bg-image='bgimage'></music-list>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import { getSingerDetail, getSongVkey } from '../../api/singer'
import {createSong} from '../../common/js/song'
import MusicList from '../../components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgimage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(async (res) => {
        if (res.code === 0) {
          let ret = res.singerSongList.data.songList
          for (var i = 0; i < ret.length; i++) {
            let tmp = ret[i].songInfo.mid
            let rest = await getSongVkey(tmp)
            if (rest.req_0.data.midurlinfo[0]) {
              ret[i].songInfo.vkey = rest.req_0.data.midurlinfo[0].purl
            }
          }
          this.songs = this._normalListSongs(res.singerSongList.data.songList)
        }
      })
    },
    _normalListSongs(list) {
      let ret = []
      list.forEach(ele => {
        ret.push(createSong(ele.songInfo))
      })
      console.log(ret)
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
 .v-enter-active, .v-leave-active
    transition: all .5s

  .v-enter, .v-leave-to
    transform: translate3d(100%, 0, 0)
</style>