<template>
  <div class="flex justify-between items-center px-[24px] pt-[56px]">
    <div class="flex gap-[16px]">
      <Level>{{ userStore.level }}</Level>
      <XP :value="userStore.experience" class="bg-white border-2 border-primary rounded-[4px]" />
    </div>
    <div class="bg-[#FDFDFD] rounded-full p-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] cursor-pointer"
      @click="router.push({ name: 'profilePage' })">
      <Icon name="user" />
    </div>
  </div>
</template>

<script setup>
import Level from "@/components/modules/LevelComponent.vue";
import XP from "@/components/modules/XpComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import { useUserStore } from "@/stores/User";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
</script>
