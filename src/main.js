/**
 * @author: Storm
 * @date: 2019-07-08
 * @email: wenyejie@foxmail.com
 */

import './styles'
import Vue from 'vue'
import router from './router'
import App from './App.vue'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
