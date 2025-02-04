<template>
  <div class="w-screen h-screen" v-if="loading">
    <div class="bg-detective-offices">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <div class="flex gap-[8px]">
          <Level>{{ user.level }}</Level>
          <XP :value="user.experience" class="bg-white border-2 border-primary rounded-[4px]" />
        </div>
        <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
          @click="router.push({ name: 'profilePage' })">
          <Icon name="user" />
        </div>
      </div>
      <div>
        <Message class="mt-[5%]" :messages="messages" />
        <img :src="costume" alt="" class="mx-auto my-[16px] xs:w-[128px] md:w-[192px]">
        <button
          class="w-[136px] h-[136px] bg-[#FF6633] rounded-full text-white text-[32px] border-4 border-white flex items-center justify-center font-black font-zenMaru shadow-[0_0_4px_0_rgba(171,171,171,0.25)] mx-auto mt-[120px] hover:translate-y-[2px] md:mt-[32px] lg:mt-[40px]"
          @click="router.push({ name: 'modePage' })">
          クイズ
        </button>
      </div>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Level from '@/components/modules/LevelComponent.vue'
import XP from '@/components/modules/XpComponent.vue'
import Icon from '@/components/modules/IconComponent.vue'
import Message from '@/components/modules/MessageComponent.vue'
import LoadingPage from '@/components/pages/loadingPage.vue'
import AxiosInstance from '@/axiosInstance.js'
import { getAuth } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()
const user = ref({})
const costume = ref('')
const loading = ref(false)
const messages = ref([])

onMounted(async () => {
  if (auth.currentUser.isAnonymous) {
    const gestUserData = {
      nickname: "ゲスト",
      level: 1,
      experience: 0
    }
    user.value = gestUserData
    costume.value = "/honto.svg"
    loading.value = true
    messages.value = [
      `ようこそ！\n${user.value.nickname}探偵事務所へ\n僕は助手のホントくん\nよろしくね！`,
    ]
  }
  try {
    const main = await AxiosInstance.get('/main')
    user.value = main.data.user
    costume.value = main.data.costume.url
    loading.value = true
    messages.value = [
      `ようこそ！\n${user.value.nickname}探偵事務所へ\n僕は助手のホントくん\nよろしくね！`,
    ];
  } catch (error) {
    console.error('データの取得に失敗しました:', error)
  }
})
</script>

<style>
.bg-detective-offices {
  width: 100%;
  height: 100%;
  background-image: url(../../../public/detective-offices.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
