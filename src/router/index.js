import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import appraise from '@/page/appraise'
import luckydraw from '@/page/luckydraw'
import luckydrawt from '@/page/luckydrawT'
import record from '@/page/record'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
      path: '/appraise',
      name: 'appraise',
      component: appraise
    }, {
      path: '/luckydraw',
      name: 'luckydraw',
      component: luckydraw
    }, {
      path: '/luckydrawt',
      name: 'luckydrawt',
      component: luckydrawt
    }, {
      path: '/record',
      name: 'record',
      component: record
    }
  ]
})
