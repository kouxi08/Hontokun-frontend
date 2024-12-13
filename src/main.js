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
<<<<<<< HEAD
  { path: '/signup', name: "signupPage", component: import('./components/page/signupPage.vue') },
  { path: '/login', name: "loginPage", component: import('./components/page/loginPage.vue') },
=======
  { path: '/profile', name: "profilePage", component: import('./components/page/profilePage.vue') },
  { path: '/profile/detail', name: "profileDetailPage", component: import('./components/page/profileDatailPage.vue') },
  { path: '/profile/edit', name: "profileEditPage", component: import('./components/page/profileEditPage.vue') }
>>>>>>> 3ecde91 ([add] refs 38 プロフィール画面とプロフィール編集画面作成)
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
