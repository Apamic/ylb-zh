import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

import '@/permission' // permission control
import AMap from 'vue-amap'
import axios from '@/utils/request.js'

Vue.prototype.$axios = axios

Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '1513bd9ff523b8d0875d4a92e1a71c29',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType','AMap.Geolocation','AMap.Heatmap','AMap.PlaceSearch']
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale ,size: 'small', zIndex: 3000})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})