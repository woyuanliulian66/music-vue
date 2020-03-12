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
// router.beforeEach((to, from, next) => {
//   if (to.fullPath === '/singer/0025NhlN2yWrP4') {
//     return next('/recommend').catch((e) => {
//       console.log(e)
//     })
//   }
//   console.log('全局导航守卫')
//   console.log(to)
//   console.log(from)
//   next()
// })

// router.beforeResolve((to, from, next) => {
//   console.log('resovel')
//   next()
// })

// router.afterEach((to, from) => {
//   console.log(to)
//   console.log(from)
//   console.log('after')
// })

// eslint-disable-next-line no-unused-vars
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
