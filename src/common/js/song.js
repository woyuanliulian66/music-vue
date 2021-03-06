import { Base64 } from 'js-base64'
import { getLyric } from '../../api/song-lyric'
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
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.data.retcode === 0) {
          this.lyric = Base64.decode(res.data.lyric)
          resolve(this.lyric)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(list) {
  // eslint-disable-next-line new-cap
  return new song({
    id: list.id,
    mid: list.mid,
    singer: list.singer[0].name,
    media_mid: list.file.media_mid,
    name: list.title,
    album: list.album.title,
    duration: list.interval,
    // 图片地址
    image: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${list.singer[0].mid}.jpg?max_age=2592000`,
    // url地址
    url: `http://ws.stream.qqmusic.qq.com/${list.vkey}`
  })
}

export function createSongList(list) {
  // eslint-disable-next-line new-cap
  return new song({
    id: list.albummid,
    mid: list.songmid,
    singer: list.singer[0].name,
    songmid: list.songmid,
    duration: list.interval,
    name: list.songname,
    media_mid: list.strMediaMid,
    album: list.albummid,
    vkey: list.vkey,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${list.albummid}_1.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/${list.vkey}`
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
