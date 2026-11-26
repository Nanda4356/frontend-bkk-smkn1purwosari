
import { createApp } from 'vue'
import App from './app.vue'
import router from './router'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/main.css'

createApp(App)
  .use(router)
  .mount('#app')
