// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import router from 'router'
import store from 'store'
import ElementUI from 'element-ui'
import 'mytheme/index.css'//自定义主题
import VCharts from 'v-charts' //基于百度ECharts
import Cookies from 'js-cookie'
import App from './App'

Vue.use(ElementUI)
Vue.use(VCharts)

if(Cookies.get('asideFolded') === undefined){
	Cookies.set('asideFolded',false)
}


import 'font/font-awesome-4.7/css/font-awesome.min.css'
import 'assets/styles/index.less'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
