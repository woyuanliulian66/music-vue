<template>
    <div class="singer">
        <list-view @select="selectSinger" :data="singers"></list-view>
        <router-view></router-view>
    </div>
</template>
<script>
import { getListSinger } from '../../api/singer'
import pinyin from '../../common/js/covert'
import ListView from '../../base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const MAX_NUM = 10
export default {
  data() {
    return {
      singers: [],
      tag: []
    }
  },
  created() {
    this._getListSinger()
  },
  methods: {
    selectSinger(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    _getListSinger() {
      getListSinger().then((data) => {
        // console.log(data)
        this.singers = this._normalizeSinger(data.singerList.data.singerlist)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < MAX_NUM) {
          map.hot.items.push({
            id: item.singer_mid,
            avatar: item.singer_pic,
            name: item.singer_name
          })
        }
        // 添加名字首字母
        const key = pinyin().getFullChars(item.singer_name.substr(0, 1)).toUpperCase().substr(0, 1)
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.singer_mid,
          avatar: item.singer_pic,
          name: item.singer_name
        })
      })
      let hot = []
      let res = []
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          res.push(map[key])
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>