<template>
  <div
    class="bg-[#FFF8D6] h-[488px] mx-[24px] mt-[32px] relative p-[16px] rounded-[8px] overflow-hidden"
  >
    <Icon
      name="arrow-left-line"
      class="absolute top-[16px] cursor-pointer"
      width="24"
      height="24"
      @click="page.setPage('モード選択', modePage)"
    />
    <p class="font-zenMaru font-bold text-[15px] text-center mb-[16px]">
      {{ page.name }}
    </p>
    <div class="h-full pb-[40px] grid grid-cols-2 gap-4 overflow-hidden overflow-y-scroll">
      <img
        v-for="difficulty in difficulties"
        :key="difficulty"
        :src="`/wantedList/${difficulty}`"
        alt=""
        width="152"
      />
    </div>
  </div>
</template>

<script setup>
  import Icon from "../IconComponent.vue";
  import modePage from "./modePage.vue";
  import { useStore } from "../../stores/Page.js";
  const page = useStore();
  const difficulties = ["1.png", "2.png", "3.png", "4.png", "5.png"];
</script>
