<template>
  <div class="w-screen h-screen">
    <div class="bg-custom">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <div class="flex gap-[8px]">
          <Level />
          <XP value="4" class="bg-white border-2 border-primary rounded-[4px]" />
        </div>
        <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
          @click="router.push({ name: 'profilePage' })">
          <Icon name="user" />
        </div>
      </div>
      <div>
        <Message position="top" class="mt-[-25%] lg:mt-[-40%]">
          ようこそ！<br>
          {{ userName }}探偵事務所へ<br>
          僕は助手のホントくん<br>
          よろしくね！
        </Message>
        <img src="/hontokun.png" alt="" class="mx-auto my-[16px]">
        <button
          class="w-[136px] h-[136px] bg-[#FF6633] rounded-full text-white text-[32px] border-4 border-white flex items-center justify-center font-black font-zenMaru shadow-[0_0_4px_0_rgba(171,171,171,0.25)] mx-auto mt-[120px] hover:translate-y-[2px] lg:mt-[40px]"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = ref('山田')
</script>

<style>
.bg-custom {
  width: 100%;
  height: 100%;
  background-image: url(../../../public/detective-offices.png);
  background-position: center;
}
</style>
