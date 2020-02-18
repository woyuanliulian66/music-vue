<template>
    <div>
        歌手
    </div>
</template>
<script src="./src/common/js/pinyin_dict_firstletter.js"></script>
<script src="./src/common/js/pinyinUtil.js"></script>
<script>
// import  pinyinUtil from '../../common/js/pinyinUtil'
import { getListSinger } from '../../api/singer'
import  pinyin  from '../../common/js/covert'
import Singer from '../../common/js/singer'
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
    _getListSinger() {
      getListSinger().then((data) => {
        this.singers = data.singerList.data.singerlist
        console.log(this._normalizeSinger(this.singers))
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
            id: item.singer_id,
            avatar: item.singer_pic,
            name: item.singer_name
          })
        }
        // 添加名字首字母
        const key = pinyin().getFullChars(item.singer_name.substr(0,1)).toUpperCase().substr(0,1)
        if(!map[key]){
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
            id: item.singer_id,
            avatar: item.singer_pic,
            name: item.singer_name
          })
      })
      let hot = []
      let res = []
      for(let key in map) {
        if(map[key].title.match(/[a-zA-Z]/)){
          res.push(map[key])
        } else if(map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      res.sort((a, b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    },
  }
}
</script>

<style lang="stylus" scoped>

</style>