<template>
  <div class="w-screen h-screen">
    <Header />
    <div class="h-full flex flex-col justify-center items-center">
      <img src="/hontokun.png" alt="" class="animate-rotation pb-[32px]">
      <p class="stroke-braun-4 text-white font-zenMaru text-[24px]">
        ろーでぃんぐ
      </p>
    </div>
  </div>
</template>

<script setup>
import Header from '../HeaderComponent.vue'
import Footer from '../FooterComponent.vue'
</script>

<style>
@keyframes rotation {
  from {
    transform: rotateY(-360deg);
  }

  to {
    transform: rotateY(0deg);
  }
}

.animate-rotation {
  animation: rotation 1s linear infinite;
}
</style>
