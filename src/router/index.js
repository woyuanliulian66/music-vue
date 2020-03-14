import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: () => import('components/disc/disc')
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      alias: '/aling'
    },
    {
      path: '/singer',
      component: () => import('components/singer/singer'),
      // beforeEnter: (to, from, next) => {
      //   console.log('路由钩子函数')
      //   console.log(to)
      //   console.log(from)
      //   next()
      // },
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '*',
      redirect: '/recommend'
    }
  ]
})
