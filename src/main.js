/**
 * @author: Storm
 * @date: 2019-07-08
 * @email: wenyejie@foxmail.com
 */

import './styles'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import { b } from './utils'

console.log(b)

new Vue({
  router,
  data () {
    return {
      b
    }
  },
  render: h => h(App)
}).$mount('#app')
