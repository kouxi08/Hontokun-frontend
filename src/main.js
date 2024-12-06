import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaUndo } from 'pinia-undo'
import App from './App.vue'
import './index.css'
import { createMemoryHistory, createRouter } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)

const routes = [
  { path: '/', name: "topPage", component: import('./components/page/topPage.vue') },
  { path: '/main', name: "mainPage", component: import('./components/page/mainPage.vue') },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

app.use(pinia)
app.use(router)
pinia.use(PiniaUndo)
app.mount('#app')
