<template>
  <div class="relative">
    <Header />
    <div class="flex items-center justify-between mt-12">
      <Icon name="arrow-left-line" class="cursor-pointer w-6 h-6 ml-9 absolute" @click="router.push({ name: 'topPage' })" />
      <p class="font-zenMaru text-[16px] text-center w-full">新規登録</p>
    </div>
    <p class="rounded-[16px] text-danger text-center font-zenMaru font-bold my-[24px] mx-[48px]">
      {{ errorMessage }}
    </p>
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-start justify-center px-[72px] pt-[40px]">
        <label for="email" class="text-[16px] pb-[8px] font-zenMaru">メールアドレス</label>
        <Input v-model="email" name="email" type="email" />
      </div>
      <div class="flex flex-col items-start justify-center px-[72px] pt-[40px]">
        <label for="password" class="text-[16px] pb-[8px] font-zenMaru">パスワード</label>
        <Input v-model="password" name="password" type="password" />
      </div>
      <div class="flex flex-col items-start justify-center px-[72px] pt-[24px]">
        <router-link to="/login" class="text-[#4F61EC]">ログインはこちら</router-link>
      </div>
      <div class="flex flex-col items-start justify-center px-[72px] pt-[24px]">
        <Button color="primary" @click="toSignup">登録</Button>
      </div>
      <div class="flex flex-col items-start justify-center px-[72px] pt-[32px]">
        <p class="font-zenMaru text-[16px]">または</p>
      </div>
      <div class="flex flex-col items-start justify-center px-[72px] pt-[104px]">
        <img src="/signin-with-google.svg" alt="" class="cursor-pointer" @click="toGoogleWithSignin">
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/modules/HeaderComponent.vue'
import Input from '@/components/modules/InputComponent.vue'
import Button from '@/components/modules/ButtonComponent.vue'
import Icon from '@/components/modules/IconComponent.vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from "vue-router";
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
