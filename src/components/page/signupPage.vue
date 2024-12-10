<template>
  <div>
    <Header />
    <p class="py-[80px] text-center font-zenMaru text-[16px]">新規登録</p>
    <div class="flex flex-col items-center gap-[40px]">
      <Input type="email" />
      <Input type="password" />
      <router-link to="/login" class="text-[#4F61EC]">ログインはこちら</router-link>
      <Button color="primary">登録</Button>
      <p class="font-zenMaru text-[16px]">または</p>
      <img src="/signin-with-google.svg" alt="" class="cursor-pointer" @click="toGoogleWithSignin">
    </div>
  </div>
</template>

<script setup>
import Header from '../HeaderComponent.vue'
import Input from '../InputComponent.vue'
import Button from '../ButtonComponent.vue'
import { RouterView, RouterLink } from "vue-router";
const email = ref('')
const password = ref('')
const error = ref(true)
const errorMessages = ref([])

const toSignup = () => {
  signupCheck()
}

const signupCheck = () => {
  errorMessages.value = []
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
