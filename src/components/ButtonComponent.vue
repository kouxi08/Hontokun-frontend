<template>
  <button
    class="flex justify-center items-center bg-primary rounded-[8px] px-[16px] py-[8px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] font-zenMaru text-[20px] font-normal">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Color = "primary"

const props = defineProps<Color>({
  color: String,
})
</script>

<!-- <style> -->
<!-- .button { -->
<!--   background: #000; -->
<!-- } -->
<!-- </style> -->
