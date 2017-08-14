import Vue from 'vue'
import Router from 'vue-router'
import Applications from '@/components/Applications'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/applications',
      name: 'Applications',
      component: Applications
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})
