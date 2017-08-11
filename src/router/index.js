import Vue from 'vue'
import Router from 'vue-router'
import Applications from '@/components/Applications'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Applications',
      component: Applications
    }
  ]
})
