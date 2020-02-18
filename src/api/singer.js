import jsonp from 'common/js/json-singer'
// import { options } from './config'

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