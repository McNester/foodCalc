import './assets/base.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'

import components from '@/components'

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

app.use(store).mount('#app')
