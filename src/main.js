import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './common/stylus/index.styl'
import vueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */

Vue.use(vueLazyLoad)
Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
