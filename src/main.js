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
  { path: '/battle/:difficulty', name: "battlePage", component: import('./components/page/battlePage.vue'), props: true },
  { path: '/signup', name: "signupPage", component: import('./components/page/signupPage.vue') },
  { path: '/login', name: "loginPage", component: import('./components/page/loginPage.vue') },
  { path: '/profile', name: "profilePage", component: import('./components/page/profilePage.vue') },
  { path: '/profile/detail', name: "profileDetailPage", component: import('./components/page/profileDatailPage.vue') },
  { path: '/profile/edit', name: "profileEditPage", component: import('./components/page/profileEditPage.vue') }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
