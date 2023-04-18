import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkZlbGlwZSBBemV2ZWRvIiwiZW1haWwiOiJmZWxpcGVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4MTc2NTcyMiwiZXhwIjoxNjgyMDI0OTIyfQ.D7YF-8FsDFy7nbk0ORMG9N-ULevORhe_BZ_p-K1DyBI'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')