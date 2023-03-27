import { createApp } from 'vue'

import { router } from './router.js'
import { store } from './store/store.js'



import './assets/styles/main.scss'
import App from './App.vue'
import svgPlugin from './plugins.js/svgPlugin.js'

const app = createApp(App)
app.use(svgPlugin)
app.use(router)
app.use(store)

app.mount('#app')
