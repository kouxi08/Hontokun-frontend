<template>
  <div class="w-screen h-screen bg-[#FFFCF8] fixed" v-if="loading">
    <div class="w-full flex justify-between items-center pt-[32px] px-[48px]">
      <Icon name="close-circle" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'mainPage' })" />
      <p class="font-zenMaru font-bold text-[24px] text-center absolute left-1/2 transform -translate-x-1/2">
        {{ userName }}
      </p>
    </div>
    <div class="relative w-[168px] h-[168px] mx-auto mt-[56px]">
      <div
        class="w-[168px] h-[168px] rounded-full shadow-lg relative mx-auto overflow-hidden cursor-pointer transition duration-200 hover:scale-110"
        @click="router.push({ name: 'profileEditPage' })">
        <img src="/honto.svg" alt="" height="120" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p
          class="absolute w-full h-1/5 bottom-0 py-[8px] text-center text-[10px] stroke-white-2 font-zenMaru font-black bg-[#FFDA29] bg-opacity-[25%]">
          プロフィールの編集
        </p>
      </div>
      <div class="absolute top-[-15%] right-[-15%]">
        <Rate value="32" size="md" />
      </div>
    </div>
    <div
      class="w-full h-[45%] flex flex-col items-center justify-start gap-[24px] px-[48px] py-[16px] my-[16px] overflow-hidden overflow-y-scroll">
      <Card v-for="cat in cats" :key="cat" :icon-name="cat.enemy.name" :icon-image="cat.enemy.url"
        :accuracy="cat.accuracy" :attempts="cat.quizList" />
    </div>
    <div class="flex justify-center items-center pt-[32px]">
      <Button color="secondary" size="md" class="mx-auto cursor-pointer" @click="Logout">
        ログアウト
      </Button>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Icon from '@/components/modules/IconComponent.vue'
import Rate from '@/components/modules/RateComponent.vue'
import Card from '@/components/modules/CardComponent.vue'
import Button from '@/components/modules/ButtonComponent.vue'
import LoadingPage from '@/components/pages/loadingPage.vue'
import AxiosInstance from '@/axiosInstance.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut } from "firebase/auth"; // Firebase Authのインポート

const router = useRouter()
const userName = ref("")
const cats = ref([])
const loading = ref(false)

// Firebase Authのインスタンスを取得
const auth = getAuth();

onMounted(async () => {
  try {
    const profile = await AxiosInstance.get('/history')
    console.log(profile)
    cats.value = profile.data.history.tierList
    userName.value = profile.data.user.nickname
    loading.value = true
  } catch (error) {
    console.error('データの取得に失敗しました:', error)
  }
})

// ログアウト処理
const Logout = async () => {
  try {
    await signOut(auth); // Firebaseからログアウト
    router.push({ name: 'topPage' }); // ログアウト後にトップページにリダイレクト
  } catch (error) {
    console.error("ログアウト中にエラーが発生しました: ", error);
  }
};

</script>
