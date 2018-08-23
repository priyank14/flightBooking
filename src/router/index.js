import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import history from '@/components/history'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/history/:email',
      name: 'history',
      component: history
    }
  ]
})
