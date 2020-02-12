import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  // https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
  const url = '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  // const url = '/api/getDiscList1'
  const data = Object.assign({}, commonParams, {
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log('第二个也失败')
  })
}