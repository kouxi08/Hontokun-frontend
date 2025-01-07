<template>
  <div
    class="flex w-[152px] h-[64px] flex-wrap justify-center gap-[8px] rounded-[4px] items-center gap-[8px]"
  >
    <img
      v-for="index in 10"
      :key="index"
      :src="index <= props.value ? '/icons/star-true.svg' : '/icons/star-false.svg'"
      alt="Star"
    />
</template>

<script setup>
  const props = defineProps({
    value: {
      type: Number,
      default: 0,
    },
  });
</script>
