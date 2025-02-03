import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

import topPage from '@/components/pages/topPage.vue';
import mainPage from '@/components/pages/mainPage.vue'
import modePage from '@/components/pages/modePage.vue'
import difficultyPage from '@/components/pages/difficultyPage.vue'
import battlePage from '@/components/pages/battlePage.vue';
import resultPage from '@/components/pages/resultPage.vue';
import signupPage from '@/components/pages/signupPage.vue';
import loginPage from '@/components/pages/loginPage.vue';
import profilePage from '@/components/pages/profilePage.vue';
import profileDetailPage from '@/components/pages/profileDetailPage.vue';
import profileEditPage from '@/components/pages/profileEditPage.vue';
import notFoundPage from '@/components/pages/notFoundPage.vue'

import { createWebHistory, createRouter, START_LOCATION } from 'vue-router'

const pinia = createPinia()
const app = createApp(App)

const routes = [
  { path: '/', name: "topPage", component: topPage },
  { path: '/main', name: "mainPage", component: mainPage },
  { path: '/main/mode', name: "modePage", component: modePage },
  { path: '/main/difficulty/:type', name: "difficultyPage", props: true, component: difficultyPage },
  { path: '/battle/:difficulty', name: "battlePage", props: true, component: battlePage },
  { path: '/result/:difficulty', name: "resultPage", props: true, component: resultPage },
  { path: '/signup', name: "signupPage", component: signupPage },
  { path: '/login', name: "loginPage", component: loginPage },
  { path: '/profile', name: "profilePage", component: profilePage },
  { path: '/profile/detail', name: "profileDetailPage", component: profileDetailPage },
  { path: '/profile/edit', name: "profileEditPage", component: profileEditPage },
  { path: "/notFound", name: 'error.404', component: notFoundPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const allowedDirectAccess = ['/', '/login', '/signup', '/main', '/profile', '/notFound']

router.beforeEach((to, from, next) => {
  if (allowedDirectAccess.includes(to.path)) {
    // 許可されたパスへの直接アクセスは許可
    next()
  } else if (from === START_LOCATION) {
    // 直接URLアクセスで、許可されていないパスの場合
    next('/notFound') // または適切なリダイレクト先
  } else {
    // アプリケーション内での遷移の場合は許可
    next()
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')
