<template>
  <div class="w-screen h-screen bg-[#FFFCF8]">
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon
        name="arrow-left-line" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'profilePage' })"
      />
      <p class="font-zenMaru text-[16px] text-center">{{ userName }}</p>
      <Button color="primary" size="sm" class="justify-self-end">保存</Button>
    </div>
    <div class="flex items-center justify-center gap-[48px] pt-[32px]">
      <Icon name="arrow-left" width="8" />
      <img src="/honto.svg" alt="" height="120">
      <Icon name="arrow-right" width="8" />
    </div>
    <div class="flex flex-col items-start justify-center px-[72px] pt-[78px]">
      <label for="name" class="text-[16px] font-zenMaru">名前の変更</label>
      <Input name="name" type="name" :placeholder="userName" class="pt-[16px]" />
    </div>
    <div class="flex flex-col items-start justify-center px-[72px] pt-[40px]">
      <div class="flex gap-[16px] justify-start items-center">
        <label for="date" class="text-[16px] font-zenMaru">生年月日</label>
        <p class="bg-[#42D325] text-white rounded-[4px] font-zenMaru text-center px-[8px]">任意</p>
      </div>
      <Input name="date" type="date" class="pt-[16px]" />
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/modules/IconComponent.vue'
import Button from '@/components/modules/ButtonComponent.vue'
import Input from '@/components/modules/InputComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = "しんたろう"
</script>
