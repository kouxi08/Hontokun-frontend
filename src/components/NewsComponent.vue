<template>
  <div class="font-zenMaru flex flex-col">
    <div class="mx-[48px] p-[16px] h-[408px] bg-white shadow-lg rounded-[6px] flex flex-col gap-[16px] z-10">
      <div class="relative">
        <img :src="props.img" alt="" class="w-full h-[104px] rounded-[6px] object-cover">
        <p
          class="absolute w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-white pt-[24px] text-[14px] text-center font-notoSans tracking-widest font-bold stroke-black-4"
        >
          {{ props.title }}
        </p>
        <div v-if="props.showResult">
          <Button size="sm" color="accent" class="absolute top-0 left-0 m-[8px]">解説</Button>
          <Button size="sm" color="danger" class="absolute top-0 right-0 m-[8px]">報告</Button>
        </div>
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
  title: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  img: {
    type: String,
    default: ""
  },
  showResult: {
    type: Boolean,
    default: false,
    type: String,
  }
});
</script>
