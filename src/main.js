import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/iview.js'
import router from './router'
/* eslint-disable */
Vue.config.productionTip = false
Vue.config.devtools = true;
Vue.prototype.host = 'http://localhost:8080'

let loginUrl = '/login'

axios.defaults.timeout = 20000
//请求过滤器
axios.interceptors.request.use(config => {
  if (router.history.current.path !== loginUrl && router.history.current.path !== '/ping') {
    let expired_at = localStorage.getItem('expired_at')
    let token = localStorage.getItem('token')
    if (expired_at == null || expired_at < Math.floor(Date.now()/1000) || token == null) {
      localStorage.clear()
      router.replace({path: loginUrl})
    } else {
      config.headers['Authorization'] = 'Bearer ' + token
    }
  }
  return Promise.resolve(config)
}, error => {
  return Promise.resolve(error)
})
//响应过滤器
axios.interceptors.response.use(
  response => {
    if (response.data.code == 401) {
      localStorage.clear()
      router.replace({path: loginUrl})
    }
    return response

  }, error => {
    return Promise.resolve(error)
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
