<template>
  <div class="w-screen h-screen fixed">
    <Header />
    <Message class="xs:mt-[160px] sm:mt-[64px]">
      このページが見つからない！<br>
      どこに行ったんだろう？
    </Message>
    <img src="/butkun.svg" alt="" height="120" class="animate-tilt mt-[10%] mx-auto">
    <img src="/kirakira.svg" alt="" height="120" class="animate-bounce absolute -bottom-[64px] -right-[64px]"
      @click="router.push({ name: 'topPage' })">
  </div>
</template>

<script setup>
import Header from '@/components/modules/HeaderComponent.vue'
import Button from '@/components/modules/ButtonComponent.vue'
import Message from '@/components/modules/MessageComponent.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style>
@keyframes tilt {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(20deg);
  }

  75% {
    transform: rotate(-20deg);
  }
}

.animate-tilt {
  animation: tilt 600ms ease-in infinite;
  animation-delay: 1s;
}
</style>
