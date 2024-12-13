<template>
  <div class="w-screen h-screen bg-[#FFFCF8]">
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[64px] px-[48px]">
      <Icon name="close-circle" width=24 height=24 class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'mainPage' })" />
      <p class="font-zenMaru text-[16px] text-center">{{ userName }}</p>
      <Rate value="32" size="sm" class="justify-self-end" />
    </div>
    <div
      class="w-[168px] h-[168px] rounded-full shadow-lg relative mx-auto my-[64px] overflow-hidden cursor-pointer transition duration-200 hover:scale-110"
      @click="router.push({ name: 'profileEditPage' })">
      <img src="/honto.svg" alt="" height="120" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <p
        class="absolute w-full h-1/5 bottom-0 py-[8px] text-center text-[10px] stroke-white-2 font-zenMaru font-black bg-[#FFDA29] bg-opacity-[25%]">
        プロフィールの編集
      </p>
    </div>
    <div
      class="w-full h-[440px] flex flex-col items-center justify-start gap-[24px] px-[48px] overflow-hidden overflow-y-scroll">
      <Card :iconName="cat.name" :iconImage="cat.icon" :accuracy=cat.accuracy :attempts=cat.attempts v-for="cat in cats"
        :key="cat" class="" />
    </div>
  </div>
</template>

<script setup>
import Icon from '../IconComponent.vue'
import Rate from '../RateComponent.vue'
import Card from '../CardComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = "しんたろう"

const cats = [
  {
    name: "ふろしきネコ", icon: "hurosiki.svg", accuracy: 22.8,
    attempts: [
      {
        accuracy: 20, timeAgo: "2分前", to: 'profileDetailPage'
      },
      {
        accuracy: 20, timeAgo: "2分前", to: 'profileDetailPage'

      },
    ]
  },
  {
    name: "ハットネコ", icon: "hat.svg", accuracy: 22.8,
    attempts: [{
      accuracy: 20, timeAgo: "5分前", to: 'profileDetailPage'
    }]
  },
  {
    name: "グラサンネコ", icon: "sunglasses.svg", accuracy: 22.8,
    attempts: [{
      accuracy: 20, timeAgo: "5分前", to: 'profileDetailPage'
    }]
  },
  {
    name: "はまきネコ", icon: "hamaki.svg", accuracy: 22.8,
    attempts: [{
      accuracy: 20, timeAgo: "5分前", to: 'profileDetailPage'
    }]
  },
  {
    name: "ボスネコ", icon: "boss.svg", accuracy: 22.8,
    attempts: [{
      accuracy: 20, timeAgo: "5分前", to: 'profileDetailPage'
    }]
  }
]
</script>
