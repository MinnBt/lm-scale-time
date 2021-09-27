import Vue from 'vue'
import App from './App.vue'
import lmScaleTime from './lib/index'
Vue.use(lmScaleTime)
new Vue({
  el: '#app',
  render: h => h(App)
})
