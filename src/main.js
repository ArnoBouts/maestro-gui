// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'font-awesome/css/font-awesome.css'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
