<template>
  <div class="w-screen h-screen">
    <div class="bg-custom">
      <div class="flex justify-between items-center px-[24px] pt-[56px]">
        <div class="flex gap-[8px]">
          <Level />
          <XP value="4" class="bg-white border-2 border-primary rounded-[4px]" />
        </div>
        <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)]">
          <Icon name="user" />
        </div>
      </div>
      <div v-if="!page.component">
        <Message position="top" class="mt-[-25%]">
          ようこそ！<br>
          $user_name探偵事務所へ<br>
          僕は助手のホントくん<br>
          よろしくね！
        </Message>
        <img src="/hontokun.png" alt="" class="mx-auto my-[16px]" />
        <button
          class="w-[136px] h-[136px] bg-[#FF6633] rounded-full text-white text-[32px] border-4 border-white flex items-center justify-center font-black font-zenMaru shadow-[0_0_4px_0_rgba(171,171,171,0.25)] mx-auto mt-[120px] hover:translate-y-[2px]"
          クイズ
        </button>
      </div>
      <component :is="page.component" />
    </div>
  </div>
</template>

<script setup>
  import Level from "../LevelComponent.vue";
  import XP from "../XpComponent.vue";
  import Icon from "../IconComponent.vue";
  import Message from "../MessageComponent.vue";
  import { useRouter } from "vue-router";
  const router = useRouter();
  import modePage from "../page/modePage.vue";
  import { useStore } from "../../stores/Page.js";
  import { ref } from "vue";
  const page = useStore();
</script>

<style>
  .bg-custom {
    width: 100%;
    height: 100%;
    background-image: url(../../../public/detective-offices.png);
    background-position: center;
  }
</style>
