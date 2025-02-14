<template>
  <div class="w-screen h-screen bg-[#FFFCF8] fixed">
    <Header />
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="arrow-left-line" class="justify-self-start cursor-pointer w-6 h-6"
        @click="router.push({ name: 'topPage' })" />
      <p class="text-center font-zenMaru text-[16px]">新規登録</p>
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
        <Button color="primary" :disabled="isButtonDisabled" @click="toSignup">登録</Button>
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
import Header from "@/components/modules/HeaderComponent.vue";
import Input from "@/components/modules/InputComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import axios from "axios";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const isButtonDisabled = ref(false);

const auth = getAuth();

const toSignup = () => {
  errorMessage.value = "";
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      isButtonDisabled.value = true;
      const user = await userCredential.user;
      return user.getIdToken();
    })
    .then((token) => {
      createAccount(token);
      router.push({ name: "mainPage" });
    })
    .catch((error) => {
      isButtonDisabled.value = false;
      switch (error.code) {
        case "auth/invalid-email":
          // メールアドレスの形式がおかしい
          errorMessage.value = "メールアドレスを確認してください";
          break;

        case "auth/email-already-in-use":
          // すでに登録されているメールを使用している
          errorMessage.value = "このメールアドレスはすでに使用されています";
          break;

        case "auth/missing-password":
          // パスワードを入力していない
          errorMessage.value = "パスワードを確認してください";
          break;

        case "auth/weak-password":
          // 弱いパスワード
          errorMessage.value = "パスワードを6文字以上で設定してください";
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
