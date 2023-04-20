import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSBBemV2ZWRvIiwiZW1haWwiOiJmZWxpcGVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4MjAyODEzMCwiZXhwIjoxNjgyMjg3MzMwfQ.XICaiTWTipbH82UI9XbXC6xEebiGr0CgN7oPFkbZY1E'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')