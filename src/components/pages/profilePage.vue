<template>
  <div v-if="loading" class="w-screen h-screen bg-[#FFFCF8] fixed">
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="close-circle" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'mainPage' })" />
      <p class="font-zenMaru font-medium text-[16px] text-center absolute left-1/2 transform -translate-x-1/2">
        {{ userStore.name }}
      </p>
      <div class="flex justify-center items-center pt-[32px]">
        <Button color="secondary" size="md" @click="Logout" class="xs:hidden sm:hidden md:hidden">
          ログアウト
        </Button>
      </div>
    </div>
    <div v-if="anonymous">
      <div
        class="w-[168px] h-[168px] rounded-full shadow-lg relative mx-auto overflow-hidden cursor-pointer transition duration-200 hover:scale-110">
        <img src="/honto.svg" alt="" height="120" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p
          class="absolute w-full h-1/5 bottom-0 py-[8px] text-center text-[10px] stroke-white-2 font-zenMaru font-black bg-[#FFDA29] bg-opacity-[25%]">
          プロフィールの編集
        </p>
      </div>
      <div
        class="flex flex-col gap-[24px] xs:text-[24px] md:text-[16px] shadow-lg rounded-[16px] font-zenMaru text-center p-[16px] pt-[24px] mt-[16px] mx-[48px]">
        <p class="font-bold text-white stroke-black-2 bg-primary rounded-[8px] p-[8px]">ログインすると</p>
        <p class="font-medium text-accent">クイズの正解率</p>
        <p class="font-medium text-accent">クイズの履歴</p>
        <p class="font-medium text-accent">レベル</p>
        <p class="font-medium text-accent">着せ替え</p>
        <p class="font-medium">などが利用できます</p>
      </div>
      <div class="flex justify-between items-center pt-[32px] px-[48px]">
        <Button color="primary" size="md" @click="toSignup">
          新規登録
        </Button>
        <Button color="primary" size="md" @click="toLogin">
          ログイン
        </Button>
      </div>
    </div>
    <div v-else class="w-full h-full mx-auto mt-[56px]">
      <div
        class="w-[168px] h-[168px] rounded-full shadow-lg relative mx-auto overflow-hidden cursor-pointer transition duration-200 hover:scale-110"
        @click="router.push({ name: 'profileEditPage' })">
        <img :src="user.costume.url" alt="" height="120"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p
          class="absolute w-full h-1/5 bottom-0 py-[8px] text-center text-[10px] stroke-white-2 font-zenMaru font-black bg-[#FFDA29] bg-opacity-[25%]">
          プロフィールの編集
        </p>
      </div>
      <div class="absolute top-[-15%] right-[-15%]">
        <Rate value="32" size="md" />
      </div>
      <div
        class="w-full h-[45%] flex flex-col items-center justify-start gap-[24px] px-[48px] py-[16px] my-[16px] overflow-hidden overflow-y-scroll">
        <Card v-for="cat in cats" :key="cat" :icon-name="cat.enemy.name" :icon-image="cat.enemy.url"
          :accuracy="cat.accuracy" :attempts="cat.quizSetList" @detail-selected="handleDetailSelected" />
      </div>
      <div class="flex justify-center items-center pt-[32px]">
        <Button color="secondary" size="md" @click="Logout" class="lg:hidden">
          ログアウト
        </Button>
      </div>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Icon from "@/components/modules/IconComponent.vue";
import Rate from "@/components/modules/RateComponent.vue";
import Card from "@/components/modules/CardComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import LoadingPage from "@/components/pages/loadingPage.vue";
import AxiosInstance from "@/axiosInstance.js";
import { useProfileStore } from "@/stores/Profile";
import { useUserStore } from "@/stores/User";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth"; // Firebase Authのインポート

const router = useRouter();
const user = ref({});
const cats = ref([]);
const loading = ref(false);
const anonymous = ref(false)
const profileStore = useProfileStore();
const userStore = useUserStore();

// Firebase Authのインスタンスを取得
const auth = getAuth();

onMounted(async () => {
  try {
    if (!auth.currentUser?.isAnonymous) {
      const profile = await AxiosInstance.get("/history");
      cats.value = profile.data.history.tierList;
      user.value = profile.data.user;
      profileStore.clearCat();
      loading.value = true;
    } else {
      anonymous.value = true;
      loading.value = true;
    }
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }
});

const handleDetailSelected = (data) => {
  profileStore.setCat(data.id, data.iconName, data.iconImage, data.attempt.accuracy);
};

const toSignup = () => {
  Logout()
  router.push({ name: "signupPage" })
}

const toLogin = () => {
  Logout()
  router.push({ name: "loginPage" })
}

// ログアウト処理
const Logout = async () => {
  try {
    await signOut(auth); // Firebaseからログアウト
  } catch (error) {
    console.error("ログアウト中にエラーが発生しました: ", error);
  }
};
</script>
