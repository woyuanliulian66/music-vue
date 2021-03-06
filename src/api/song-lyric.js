// import jsonp from 'common/js/json-singer'
import axios from 'axios'
import { commonParams } from './config'

export function getLyric(mid) {
  const url = '/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  var data = Object.assign({}, commonParams, {
    pcachetime: 1583906610362,
    songmid: mid,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
