<template>
  <div class="w-screen h-screen">
    <div class="bg-quiz">
      <img :src="catImage" alt="" width="208" class="absolute top-[88px] left-1/2 -translate-x-1/2 z-0"
        v-show="visibleCats">
      <div class="w-full h-full whitespace-nowrap overflow-hidden" v-if="!page.component">
        <p
          class="h-full absolute top-1/2 -translate-y-1/2 font-zenMaru text-[128px] inline-block pl-[100%] animate-scroll text-white stroke-primary-4">
          {{ catName }}
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

const props = defineProps({
  difficulty: {
    type: Number,
    default: 1
  }
});
const page = useStore();
const visibleCats = ref(true)
const catName = ref('')
const catImage = ref('')
const background = ref('')

if (props.difficulty == 1) {
  catName.value = "ふろしきネコ"
  catImage.value = "hurosiki.svg"
  background.value = "url(/backgroundImage/forest-path.png)"
} else if (props.difficulty == 2) {
  catName.value = "ハットネコ"
  catImage.value = "hat.svg"
  background.value = "url(/backgroundImage/evening-cityscape.png)"
} else if (props.difficulty == 3) {
  catName.value = "グラサンネコ"
  catImage.value = "grass.svg"
  background.value = "url(/backgroundImage/busy-street-roadside.png)"
} else if (props.difficulty == 4) {
  catName.value = "はまきネコ"
  catImage.value = "hamaki.svg"
  background.value = "url(/backgroundImage/airport.png)"
} else if (props.difficulty == 5) {
  catName.value = "ボスネコ"
  catImage.value = "boss.svg"
  background.value = "url(/backgroundImage/red-carpet.png)"
}

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
  background-image: v-bind(background);
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
