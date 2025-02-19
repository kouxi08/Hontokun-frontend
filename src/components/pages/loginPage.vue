<template>
  <div class="w-screen h-screen bg-[#FFFCF8] fixed">
    <Header />
    <div
      class="w-full grid grid-cols-3 justify-between items-center pt-[32px] xs:px-[48px] sm:px-[160px] md:px-[240px] lg:px-[320px]">
      <Icon name="arrow-left-line" class="justify-self-start cursor-pointer w-6 h-6"
        @click="router.push({ name: 'topPage' })" />
      <p class="text-center font-zenMaru text-[16px]">ログイン</p>
    </div>
    <p class="rounded-[16px] text-danger text-center font-zenMaru font-bold my-[24px] mx-[48px]">
      {{ errorMessage }}
    </p>
    <div
      class="flex flex-col justify-center items-center xs:px-[48px] sm:px-[160px] md:px-[240px] lg:px-[320px] xs:pt-[40px] md:pt-[16px] gap-[24px]">
      <div class="w-full flex flex-col items-start">
        <label for="email" class="text-[16px] pb-[8px] font-zenMaru">メールアドレス</label>
        <Input v-model="email" type="email" placeholder="example@example.com" />
      </div>
      <div class="w-full flex flex-col items-start">
        <label for="password" class="text-[16px] pb-[8px] font-zenMaru">パスワード</label>
        <Input v-model="password" type="password" placeholder="6文字以上のパスワード" />
      </div>
      <div class="flex flex-col items-start justify-center">
        <router-link to="/signup" class="text-[#4F61EC]">新規登録はこちら</router-link>
      </div>
      <Button color="primary" :disabled="isButtonDisabled" class="w-full" @click="toLogin">ログイン</Button>
      <div class="flex md: flex-col items-center justify-center gap-[24px]">
        <p class="font-zenMaru text-[16px]">または</p>
        <img src="/signin-with-google.svg" alt="" class="cursor-pointer" @click="toGoogleWithSignin">
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/modules/HeaderComponent.vue";
import Input from "@/components/modules/InputComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isButtonDisabled = ref(false);

const router = useRouter();
const auth = getAuth();

const toLogin = () => {
  errorMessage.value = "";
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      isButtonDisabled.value = true;
      router.push({ name: "mainPage" });
    })
    .catch((error) => {
      isButtonDisabled.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          // メールアドレスの形式がおかしい
          errorMessage.value = "メールアドレスを確認してください";
          break;
        case "auth/missing-password":
        case "auth/invalid-credential":
          // パスワードを入力していない
          errorMessage.value = "パスワードを確認してください";
          break;
        case "auth/too-many-requests":
          // リクエスト数が許容を超えた
          errorMessage.value = "しばらくお待ちから再度ログインしてください";
          break;
        default:
          // どれにも当てはまらない
          errorMessage.value = "システムエラーが発生しました。現在、運営チームが対応中です";
          break;
      }
    });
};

const toGoogleWithSignin = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, provider)
    .then(async (userCredential) => {
      isButtonDisabled.value = true;
      const user = await userCredential.user;
      const token = await user.getIdToken();
      await createAccount(token);
      await router.push({ name: "mainPage" });
    })
    .catch((error) => {
      isButtonDisabled.value = false;
      switch (error.code) {
        case "auth/email-already-in-use":
          // すでに登録されているメールを使用している
          errorMessage.value = "このメールアドレスはすでに使用されています";
          break;
      }
    });
};

const createAccount = async (token) => {
  const requestBody = {
    nickname: "ホントくん",
    birthday: "2000-01-01",
  };
  const signup = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/sign-up`, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
</script>
