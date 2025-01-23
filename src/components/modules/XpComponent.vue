<template>
  <div class="grid grid-cols-5 grid-rows-2 md:grid-rows-none gap-[8px] p-[8px] rounded-[4px]">
    <img v-for="index in 10" :key="index" :src="index <= props.value ? '/icons/star-true.svg' : '/icons/star-false.svg'"
      alt="Star">
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});
</script>
