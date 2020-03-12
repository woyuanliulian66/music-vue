// import originJsonp from 'jsonp'
// import { set } from 'shelljs'
import $ from 'jquery'

export default function jsonp(url, data) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + 'data=' +
  encodeURIComponent(JSON.stringify(data))
  var setting = {
    async: false,
    crossDomain: true,
    url: url,
    dataType: 'jsonp'
  }
  // console.log(url)
  return new Promise((resolve, reject) => {
    $.ajax(setting)
      .done(function (data) {
        resolve(data)
      })
      .fail(function (err) {
        reject(err)
      })
  }).catch((e) => {})
}
