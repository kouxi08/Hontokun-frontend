<template>
  <div>
    <Header />
    <p class="pt-[136px] pb-[24px] text-center font-zenMaru text-[16px]">新規登録</p>
    <p class="rounded-[16px] text-danger text-center font-zenMaru font-bold my-[24px] mx-[48px]">
      {{ errorMessage }}
    </p>
    <div class="flex flex-col items-center gap-[40px]">
      <Input v-model="email" type="email" />
      <Input v-model="password" type="password" />
      <router-link to="/login" class="text-[#4F61EC]">ログインはこちら</router-link>
      <Button color="primary" @click="toSignup">登録</Button>
      <p class="font-zenMaru text-[16px]">または</p>
      <img src="/signin-with-google.svg" alt="" class="cursor-pointer" @click="toGoogleWithSignin" />
    </div>
  </div>
</template>

<script setup>
import Header from '../HeaderComponent.vue'
import Input from '../InputComponent.vue'
import Button from '../ButtonComponent.vue'
import { ref } from 'vue'
import { RouterView, RouterLink, useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const auth = getAuth()

const toSignup = () => {
  errorMessage.value = ''
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // 作成成功
      router.push({ name: "mainPage" });
    })
    .catch((error) => {
      console.log(error)
      switch (error.code) {
        case 'auth/invalid-email':
          // メールアドレスの形式がおかしい
          errorMessage.value = "メールアドレスを確認してください"
          break;

        case 'auth/email-already-in-use':
          // すでに登録されているメールを使用している
          errorMessage.value = "このメールアドレスはすでに使用されています"
          break;

        case 'auth/missing-password':
          // パスワードを入力していない
          errorMessage.value = "パスワードを確認してください"
          break;

        case 'auth/weak-password':
          // 弱いパスワード
          errorMessage.value = "パスワードを6文字以上で設定してください"
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
