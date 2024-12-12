<template>
  <div>
    <Header />
    <p class="pt-[136px] pb-[24px] text-center font-zenMaru text-[16px]">ログイン</p>
    <p v-for="message in errorMessages" :key="message"
      class="bg-danger rounded-[16px] text-white text-center font-zenMaru font-bold my-[24px] mx-[48px] p-[16px]">
      {{ message }}
    </p>
    <div class="flex flex-col items-center gap-[40px]">
      <Input type="email" v-model="email" />
      <Input type="password" v-model="password" />
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
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref(true)
const errorMessages = ref([])

const toLogin = () => {
  loginCheck()
  if (error.value) {
    router.push({ name: "mainPage" });
  }
}

const loginCheck = () => {
  errorMessages.value = []
  error.value = true
  if (email.value == "") {
    errorMessages.value.push("メールアドレスを入力してください")
    error.value = false
  }

  if (password.value == "") {
    errorMessages.value.push("パスワードを入力してください")
    error.value = false
  }
}

const toGoogleWithSignin = () => {
  router.push({ name: "mainPage" });
}
</script>
