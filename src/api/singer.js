import jsonp from 'common/js/json-singer'
// import jsonpA from 'common/js/jsonp'

export function getListSinger() {
  var data = {
    'comm': { 'ct': 24, 'cv': 0 },
    'singerList': {
      'module': 'Music.SingerListServer',
      'method': 'get_singer_list',
      'param': {
        'area': -100,
        'sex': -100,
        'genre': -100,
        'index': -100,
        'sin': 0,
        'cur_page': 1
      }
    }
  }
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  var parmas = Object.assign({}, data)
  return jsonp(url, parmas)
}

export function getSingerDetail(singerId) {
  // var url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  var data = {
    'comm': { 'ct': 24, 'cv': 0 },
    'singerSongList': {
      'method': 'GetSingerSongList',
      'param': {
        'order': 1,
        'singerMid': singerId,
        'begin': 0,
        'num': 25
      },
      'module': 'musichall.song_list_server'
    }
  }
  return jsonp(url, data)
}

// 获取播放时候需要的vkey
// http://ws.stream.qqmusic.qq.com/C4000029cBk90JB3e9.m4a?guid=4009436916&vkey=DAE0F82AE5877714CDB9A6453DAEC6F532AC631CC522981EF1EFE6FECCBBFFD329C3F452F4C0C8815F3B4363BCFD593FF2B8790A2ABCB77A&uin=7064&fromtag=66
export function getSongVkey(songmid) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = {
    'req_0':
    {
      'module': 'vkey.GetVkeyServer',
      'method': 'CgiGetVkey',
      'param': {
        'guid': '4009436916',
        'songmid': [songmid],
        'songtype': [0],
        'uin': '1152921504999996312',
        'loginflag': 1,
        'platform': '20'
      }
    },
    'comm': {
      'uin': '1152921504999996312',
      'format': 'json',
      'ct': 24,
      'cv': 0
    }
  }
  // const data1 = Object.assign({}, {
  //   callback: 'musicJsonCallback',
  //   loginUin: 3051522991,
  //   format: 'jsonp',
  //   platform: 'yqq',
  //   needNewCode: 0,
  //   cid: 205361747,
  //   uin: 3051522991,
  //   guid: 5931742855,
  //   songmid: songmid,
  //   filename: `C400${songmid}.m4a`
  // })

  return jsonp(url, data)
}

// var data = Object.assign({}, {
//   hostUin: 0,
//   needNewCode: 0,
//   order: 'time',
//   begin: 0,
//   num: 100,
//   cmd: 1,
//   cid: 205360581,
//   g_tk: 5381,
//   platform: 'yqq.json',
//   singermid: singerId
// })
// console.log(jsonpA(url, data))