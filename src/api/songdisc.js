import axios from 'axios'
// import { commonParams } from './config'

export function getDisc(dissid) {
  const url = '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, {
    disstid: dissid,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    format: 'json',
    type: 1,
    json: 1,
    new_formate: 1,
    g_tk_new_20200303: 5381,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((e) => {
    console.log('请求失败')
  })
}