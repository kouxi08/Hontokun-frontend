<template>
  <div v-if="props.answer"
    class="absolute z-50 bg-white w-[160px] h-[160px] rounded-[24px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-accent shadow-button shadow-accent">
    <div class="w-full h-full flex items-center justify-center">
      <p class=" font-zenMaru font-bold text-accent text-[32px] text-center">正解</p>
    </div>
  </div>
  <div v-else
    class="absolute z-50 bg-white w-[160px] h-[160px] rounded-[24px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-secondary shadow-button shadow-secondary">
    <div class="w-full h-full flex items-center justify-center">
      <p class="font-zenMaru font-bold text-secondary text-[32px] text-center">不正解</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  answer: {
    type: Boolean,
    require: true
  },
});
</script>
