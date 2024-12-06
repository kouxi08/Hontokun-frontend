<template>
  <div class="bg-[#FFF8D6] h-[488px] mx-[24px] mt-[32px] relative p-[16px] rounded-[8px] overflow-hidden">
    <Icon name="arrow-left-line" class="absolute top-[16px] cursor-pointer" width=24 height=24
      @click="page.setPage('メイン', null)" />
    <p class="font-zenMaru font-bold text-[15px] text-center mb-[16px]">{{ page.name }}</p>
    <div class="flex flex-col gap-[8px]">
      <div
        class="bg-white p-[16px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] flex justify-between items-center rounded-[8px] cursor-pointer"
        v-for="mode in modes" :key="mode" @click="page.setPage(mode.pageName, difficultyPage)">
        <p class="px-[8px] py-[2px] rounded-[6px] font-bold font-zenMaru text-white bg-gradient-to-r from-[#FF1A1A] to-[#F19E29] text-[24px] text-center"
          :class="mode.gradient">
          {{ mode.name }}
        </p>
        <p class="font-zenMaru text-[14px]">
          {{ mode.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '../../stores/Page.js';
import Icon from '../IconComponent.vue'
import difficultyPage from '../page/difficultyPage.vue'
const page = useStore();
const modes = [
  {
    name: "バトル",
    page: difficultyPage,
    pageName: "難易度選択",
    description: "指名手配猫を捕まえよう！",
    gradient: 'from-[#FF1A1A] to-[#F19E29]',
  },
  {
    name: "スピード",
    page: null,
    pageName: null,
    description: "3分で何問解ける？",
    gradient: 'from-[#65B2BD] to-[#90FFE1]',
  },
]
</script>
