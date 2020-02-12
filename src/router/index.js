import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer
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
