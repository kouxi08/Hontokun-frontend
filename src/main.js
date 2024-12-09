import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import { createMemoryHistory, createRouter } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)

const routes = [
  { path: '/', name: "topPage", component: import('./components/page/topPage.vue') },
  { path: '/main', name: "mainPage", component: import('./components/page/mainPage.vue') },
  { page: 'loading', name: "loadingPage", component: import('./components/page/loadingPage.vue') }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
