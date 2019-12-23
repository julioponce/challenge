import '@babel/polyfill'
import Vue from 'vue'

import '@/assets/scss/reset.scss'
import '@/assets/scss/typography.scss'

import router from '@/config/router'
import store from '@/store'
import VueCompositionApi from '@vue/composition-api'
import App from '@/components/App/App.vue'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

export default app
