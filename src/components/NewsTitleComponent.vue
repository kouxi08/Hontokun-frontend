<template>
  <div class="font-zenMaru flex items-center justify-start">
    <div
      class="bg-[#FFF8D6] w-full flex items-center justify-start mx-[48px] my-[8px] p-[8px] rounded-[8px] gap-[16px] z-50 font-zenMaru">
      <p class="bg-primary w-[24px] h-[24px] rounded-full text-center font-bold">
        {{ props.id }}</p>
      <p class="text-[14px] font-[500] z-50">{{ props.title }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number
  },
  title: {
    type: String
  }
});
</script>
