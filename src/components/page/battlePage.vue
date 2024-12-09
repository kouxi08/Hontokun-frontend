<template>
  <div class="w-screen h-screen">
    <div class="bg-quiz">
      <img src="/hurosiki.svg" alt="" width="208" class="absolute top-[88px] left-1/2 -translate-x-1/2 z-0"
        v-show="visibleCats">
      <div class="whitespace-nowrap overflow-hidden w-full" v-if="!page.component">
        <p
          class="absolute top-1/3 font-zenMaru text-[128px] inline-block pl-[100%] animate-scroll text-white stroke-primary-4">
          ふろしきねこ
        </p>
      </div>
      <component :is="page.component" @battleEvent="battleEvent" />
      <img src="/hontokun.svg" alt="" class="absolute bottom-[32px] left-1/2 -translate-x-1/2" v-show="visibleCats">
    </div>
  </div>
</template>

<script setup>
// todo: 難易度によって背景画像を変更
import quizPage from './quizPage.vue'
import { useStore } from '../../stores/Quiz.js'
import { ref } from 'vue'
const page = useStore();
const visibleCats = ref(true)

const battleEvent = () => {
  visibleCats.value = false
}

setTimeout(function () {
  page.setPage('クイズ', quizPage)
}, 4000);

page.$subscribe((mutation, state) => {
  if (state.name == '結果') {
    visibleCats.value = false
  }
})

</script>

<style>
.bg-quiz {
  width: 100%;
  height: 100%;
  background-image: url(../../../public/backgroundImage/forest-path.png);
  background-position: center;
}

.animate-scroll {
  animation: scroll-left 3s linear;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}
</style>
