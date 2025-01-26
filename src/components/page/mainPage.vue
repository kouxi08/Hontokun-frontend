<template>
  <div class="w-screen h-screen">
    <div class="bg-detective-offices">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <<<<<<< HEAD <div class="flex gap-[16px]">
          <Level />
          <XP value="4" class="bg-white border-2 border-primary rounded-[4px]" />
          =======
          <div class="flex gap-[8px]">
            <Level>{{ user.level }}</Level>
            <XP :value="user.experience" class="bg-white border-2 border-primary rounded-[4px]" />
            >>>>>>> 5d70512 ([add] refs 100 メイン画面結合)
          </div>
          <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
            @click="router.push({ name: 'profilePage' })">
            <Icon name="user.experience" />
          </div>
      </div>
      <div>
        <Message class="mt-[5%]">
          ようこそ！<br>
          {{ user.nickname }}探偵事務所へ<br>
          僕は助手のホントくん<br>
          よろしくね！
        </Message>
        <img :src="costume" alt="" class="mx-auto my-[16px] xs:w-[128px] md:w-[192px]">
        <button
          class="w-[136px] h-[136px] bg-[#FF6633] rounded-full text-white text-[32px] border-4 border-white flex items-center justify-center font-black font-zenMaru shadow-[0_0_4px_0_rgba(171,171,171,0.25)] mx-auto mt-[120px] hover:translate-y-[2px] md:mt-[32px] lg:mt-[40px]"
          @click="router.push({ name: 'modePage' })">
          クイズ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Level from '@/components/modules/LevelComponent.vue'
import XP from '@/components/modules/XpComponent.vue'
import Icon from '@/components/modules/IconComponent.vue'
import Message from '@/components/modules/MessageComponent.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = ref({})
const costume = ref('')

onMounted(async () => {
  const main = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/main`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  console.log(main.data)
  user.value = main.data.user
  costume.value = main.data.costume.url
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
