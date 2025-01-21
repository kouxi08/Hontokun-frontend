<template>
  <div class="w-screen h-screen">
    <div class="bg-detective-offices">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <div class="flex gap-[16px]">
          <Level />
          <XP value="4" class="bg-white border-2 border-primary rounded-[4px]" />
        </div>
        <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
          @click="router.push({ name: 'profilePage' })">
          <Icon name="user" />
        </div>
      </div>
      <div class="bg-[#FFF8D6] h-[75%] mx-[24px] mt-[32px] relative p-[16px] rounded-[8px] overflow-hidden">
        <Icon name="arrow-left-line" class="absolute top-[16px] cursor-pointer" width="24" height="24"
          @click="router.push({ name: 'mainPage' })" />
        <p class="font-zenMaru font-bold text-[15px] text-center mb-[16px]">
          モード選択画面
        </p>
        <div class="flex flex-col gap-[8px]">
          <div v-for="mode in modes" :key="mode"
            class="bg-white p-[16px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] flex justify-between items-center rounded-[8px] cursor-pointer"
            @click="router.push({ name: mode.page })">
            <p class="px-[8px] py-[2px] rounded-[6px] font-bold font-zenMaru text-white bg-gradient-to-r text-[24px] text-center"
              :class="mode.gradient">
              {{ mode.name }}
            </p>
            <p class="font-zenMaru text-[14px]">
              {{ mode.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Level from '@/components/modules/LevelComponent.vue'
import XP from '@/components/modules/XpComponent.vue'
import Icon from "@/components/modules/IconComponent.vue";
import { useRouter } from "vue-router"
const router = useRouter()
const modes = [
  {
    name: "バトル",
    page: "difficultyPage",
    pageName: "難易度選択",
    description: "指名手配猫を捕まえよう！",
    gradient: "from-[#FF1A1A] to-[#F19E29]",
  },
  {
    name: "スピード",
    page: null,
    pageName: null,
    description: "3分で何問解ける？",
    gradient: "from-[#65B2BD] to-[#90FFE1]",
  },
  {
    name: "ランク",
    page: null,
    pageName: null,
    description: "最強の探偵に！",
    gradient: "from-[#8A42E2] to-[#59BAFE]",
  },
  {
    name: "ムゲン",
    page: null,
    pageName: null,
    description: "練習に最適！",
    gradient: "from-[#E24242] to-[#6441CC]",
  },
];
</script>
