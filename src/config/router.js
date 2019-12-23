import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/config/routes'

Vue.use(Router)

var router = new Router({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  document.getElementById('app').scrollTop = 0
  next()
})

export default router
