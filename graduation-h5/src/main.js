import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import infiniteScroll from "vue-infinite-scroll";

Vue.use(ElementUI)
Vue.use(infiniteScroll)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
