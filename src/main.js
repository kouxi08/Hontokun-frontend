import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import topPage from './components/page/topPage.vue';
import mainPage from './components/page/mainPage.vue'
import battlePage from './components/page/battlePage.vue';
import signupPage from './components/page/signupPage.vue';
import loginPage from './components/page/loginPage.vue';
import profilePage from './components/page/profilePage.vue';
import profileDetailPage from './components/page/profileDetailPage.vue';
import profileEditPage from './components/page/profileEditPage.vue';

import { createWebHistory, createRouter } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)

const routes = [
  { path: '/', name: "topPage", component: topPage },
  { path: '/main', name: "mainPage", component: mainPage },
  { path: '/battle/:difficulty', name: "battlePage", props: true, component: battlePage },
  { path: '/signup', name: "signupPage", component: signupPage },
  { path: '/login', name: "loginPage", component: loginPage },
  { path: '/profile', name: "profilePage", component: profilePage },
  { path: '/profile/detail', name: "profileDetailPage", component: profileDetailPage },
  { path: '/profile/edit', name: "profileEditPage", component: profileEditPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
