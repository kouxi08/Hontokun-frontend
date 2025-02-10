<template>
  <div class="font-zenMaru flex items-center justify-start">
    <div
      class="bg-[#FFF8D6] w-full flex items-center justify-start mx-[48px] p-[8px] rounded-[8px] gap-[16px] z-50 font-zenMaru">
      <p
        class="bg-primary xs:w-[24px] xs:h-[24px] md:w-[32px] md:h-[32px] rounded-full text-center font-bold xs:text-[14px] md:text-[20px]">
        {{ props.id }}
      </p>
      <p class="xs:text-[14px] md:text-[24px] font-[500] z-50">{{ props.title }}</p>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });
</script>
