<template>
  <div class="w-screen h-screen">
    <div class="bg-detective-offices">
      <Status />
      <div class="bg-[#FFF8D6] h-[75%] mx-[24px] mt-[32px] relative p-[16px] rounded-[8px] overflow-hidden">
        <Icon name="arrow-left-line" class="absolute top-[16px] cursor-pointer" width="24" height="24"
          @click="router.push({ name: 'modePage' })" />
        <p class="font-zenMaru font-bold text-[15px] text-center mb-[16px]">難易度選択画面</p>
        <div class="h-full pb-[40px] grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden overflow-y-scroll">
          <img v-for="(difficulty, index) in difficulties" :key="difficulty" :src="`/wantedList/${difficulty}`"
            class="w-full h-auto object-contain cursor-pointer" alt="" @click="selectDifficulty(index + 1)">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Status from "@/components/modules/StatusComponent.vue"
import Icon from "@/components/modules/IconComponent.vue";
import { useQuizStore } from "@/stores/Quiz";
import { useUserStore } from "@/stores/User";
import { useRouter } from "vue-router";
const router = useRouter();
const difficulties = ["1.png", "2.png", "3.png", "4.png", "5.png"];
const quizStore = useQuizStore();
const userStore = useUserStore();

const selectDifficulty = (difficulty) => {
  quizStore.setDifficulty(difficulty);
  router.push({ name: "battlePage" });
};
</script>
