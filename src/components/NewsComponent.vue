<template>
  <div class="font-zenMaru flex flex-col">
    <div class="bg-[#FFF8D6] mx-[48px] my-[8px] p-[8px] rounded-[8px] flex items-center justify-start gap-[16px]">
      <p class="bg-primary w-[24px] h-[24px] rounded-full text-center font-bold">1</p>
      <p class="text-[14px] font-[500]">{{ props.question }}</p>
    </div>
    <div class="mx-[48px] p-[16px] shadow-lg rounded-[6px] flex flex-col gap-[16px]">
      <div class="relative">
        <img src="/sample.jpg" alt="" class="w-full h-[104px] rounded-[6px] object-cover">
        <p
          class="absolute w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-white text-[14px] text-center font-notoSans tracking-widest font-bold text-stroke">
          {{ props.title }}
        </p>
        <Button size="sm" color="accent" class="absolute top-0 left-0 m-[8px]">解説</Button>
        <Button size="sm" color="danger" class="absolute top-0 right-0 m-[8px]">報告</Button>
      </div>
      <p class="font-notoSans font-bold text-[12px] tracking-wider leading-[32px]">
        {{ props.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Button from './ButtonComponent.vue'
const props = defineProps({
  question: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
});
</script>

<style>
.text-stroke {
  text-shadow:
    -1px -1px 1px #000,
    1px -1px 1px #000,
    -1px 1px 1px #000,
    1px 1px 1px #000,
    0 0 3px #000,
    0 0 3px #000;
}
</style>
