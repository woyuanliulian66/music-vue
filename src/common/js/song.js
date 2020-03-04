// import { singer } from "../../store/getter"

// import {getLyric} from 'api/song'
// import {ERR_OK} from 'api/config'
// import {Base64} from 'js-base64'
export default class song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(list) {
  // eslint-disable-next-line new-cap
  return new song({
    id: list.id,
    mid: list.mid,
    singer: list.singer[0].name,
    name: list.title,
    album: list.album.title,
    duration: list.interval,
    // 图片地址
    image: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${list.singer[0].mid}.jpg?max_age=2592000`,
    // url地址
    url: ''
  })
}

//   getLyric() {
//     if (this.lyric) {
//       return Promise.resolve(this.lyric)
//     }

//     return new Promise((resolve, reject) => {
//       getLyric(this.mid).then((res) => {
//         if (res.retcode === ERR_OK) {
//           this.lyric = Base64.decode(res.lyric)
//           resolve(this.lyric)
//         } else {
//           reject('no lyric')
//         }
//       })
//     })
//   }
// }

// export function createSong(musicData) {
//   return new Song({
//     id: musicData.songid,
//     mid: musicData.songmid,
//     singer: filterSinger(musicData.singer),
//     name: musicData.songname,
//     album: musicData.albumname,
//     duration: musicData.interval,
//     image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
//     url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
//   })
// }

// function filterSinger(singer) {
//   let ret = []
//   if (!singer) {
//     return ''
//   }
//   singer.forEach((s) => {
//     ret.push(s.name)
//   })
//   return ret.join('/')
