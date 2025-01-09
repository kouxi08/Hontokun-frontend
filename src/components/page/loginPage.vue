<template>
  <div class="relative">
    <Header />
    <Icon name="arrow-left-line" class="cursor-pointer w-6 h-6 absolute top-32 left-8" @click="toTopPage" />
    <p class="pt-[136px] pb-[24px] text-center font-zenMaru text-[16px]">ログイン</p>
    <p class="rounded-[16px] text-danger text-center font-zenMaru font-bold my-[24px] mx-[48px]">
      {{ errorMessage }}
    </p>
    <div class="flex flex-col items-center gap-[40px]">
      <Input v-model="email" type="email" />
      <Input v-model="password" type="password" />
      <router-link to="/signup" class="text-[#4F61EC]">新規登録はこちら</router-link>
      <Button color="primary" @click="toLogin">ログイン</Button>
      <p class="font-zenMaru text-[16px]">または</p>
      <img src="/signin-with-google.svg" alt="" class="cursor-pointer" @click="toGoogleWithSignin">
    </div>
  </div>
</template>

<script setup>
import Header from '../HeaderComponent.vue'
import Input from '../InputComponent.vue'
import Button from '../ButtonComponent.vue'
import { RouterView, RouterLink, useRouter } from "vue-router";
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()
const auth = getAuth()

const toLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      router.push({ name: "mainPage" });
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          // メールアドレスの形式がおかしい
          errorMessage.value = "メールアドレスを確認してください"
          break;

        case 'auth/missing-password':
        case 'auth/invalid-credential':
          // パスワードを入力していない
          errorMessage.value = "パスワードを確認してください"
          break;

        case 'auth/too-many-requests':
          // リスエスト数が許容を超えた
          errorMessage.value = "しばらくお待ちから再度ログインしてください"
          break;

        default:
          // どれにも当てはまらない
          errorMessage.value = "システムエラーが発生しました。現在、運営チームが対応中です"
          break;
      }
    })

}


const toGoogleWithSignin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push({ name: "mainPage" });
    })
    .catch((error) => {
      switch (error.code) {

        case 'auth/email-already-in-use':
          // すでに登録されているメールを使用している
          errorMessage.value = "このメールアドレスはすでに使用されています"
          break;

        default:
          // どれにも当てはまらない
          errorMessage.value = "システムエラーが発生しました。現在、運営チームが対応中です"
          break;
      }
    })
}
</script>
