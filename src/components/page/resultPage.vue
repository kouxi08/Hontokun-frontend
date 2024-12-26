<template>
  <img v-show="isBattle" src="/smoke.png" alt="" class="animate-tilt absolute mx-auto top-1/3" />
  <div v-show="isResultMessage" class="h-full flex flex-col gap-[40px] items-center justify-center" @click="showResultPage">
    <p class="text-[64px] font-zenMaru text-white font-bold" :class="gotMessage.titleStroke">
      {{ gotMessage.title }}
    </p>
    <p class="text-[24px] font-zenMaru text-white font-bold" :class="gotMessage.subTitleStroke">
      {{ gotMessage.subTitle }}
    </p>
  </div>
  <div v-show="resultPage" class="h-full pt-[5%]">
    <Table :header="tableHeader" :content="tableContent" />
    <div class="h-[42%] flex flex-col gap-[8px] overflow-hidden overflow-y-scroll mt-[24px]">
      <News
        v-for="quiz in quizSet" :key="quiz" :title="quiz.questionTitle" :content="quiz.content" :img="quiz.img"
        show-result="true"
      />
    </div>
    <div class="flex flex-col justify-center items-center gap-[24px] mx-[48px] pt-[5%]">
      <Button color="accent" class="w-full" @click="page.$reset()">難易度へ戻る</Button>
      <Button color="primary" class="w-full" @click="page.$reset()">モード選択へ戻る</Button>
      <Button color="secondary" class="w-full" to="mainPage" @click="page.$reset()">事務所へ戻る</Button>
    </div>
  </div>
</template>

<script setup>
import Table from '../TableComponent.vue'
import News from '../NewsComponent.vue'
import Button from '../ButtonComponent.vue'
import { useStore } from '../../stores/Quiz.js'
import { ref } from 'vue'

const emit = defineEmits(['battleEvent']);
const page = useStore()
const isBattle = ref(true)
const isResultMessage = ref(false)
const resultPage = ref(false)
const gotMessage = {
  titleStroke: "stroke-accent-4",
  subTitleStroke: "stroke-accent-2",
  title: "おめでとう",
  subTitle: "指名手配猫をつかまえた！",
}
const gotAwayMessage = {
  stroke: "stroke-secondary-4",
  subTitleStroke: "stroke-secondary-2",
  gotAway: "ざんねん",
  gotAwaySub: "にげられてしまった"
}
const tableHeader = [
  { name: "番号" },
  { name: "正誤" },
  { name: "問題" }
]
const tableContent = [
  { id: 1, correction: "correct", question: "arrow-right-ring" },
  { id: 2, correction: "correct", question: "arrow-right-ring" },
  { id: 3, correction: "incorrect", question: "arrow-right-ring" },
];
const quizSet = [
  {
    id: 1,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "台風15号接近 首都圏厳戒態勢",
    img: "/sample.jpg",
    content: "台風15号が関東地方に接近中。気象庁は警戒を呼びかけ、各地で厳重な備えが進む。東京都は午後から公共交通機関の計画運休を発表。スーパーには買い出しの長蛇の列。企業は在宅勤務を推奨し、学校は休校を決定。避難所も開設され始めた。強風と豪雨に備え、住民の緊張が高まる。明日未明に最接近の見込み。",
  },
  {
    id: 2,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "月面に巨大UFO出現？地球外生命体か",
    img: "/sample.jpg",
    content: "NASA発表によると、月面に直径1kmの巨大UFOが出現したとのこと。宇宙ステーションの観測カメラが捉えた映像には、円盤状の物体が月面に着陸する様子が映っていた。専門家は「地球外知的生命体の可能性が高い」と指摘。各国首脳が緊急会議を開き、対応を協議している。",
  },
  {
    id: 3,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "実は寝ることは無駄！？",
    img: "/sample.jpg",
    content: "最新の研究によると、寝ることは実は時間の無駄だと判明。科学者たちは、睡眠時間を削減することで生産性が飛躍的に向上すると主張しています。この革新的な発見により、人々の生活様式が大きく変わる可能性があります。",
  }
]

const showResultPage = () => {
  isResultMessage.value = false
  resultPage.value = true
}
const battleEvent = () => {
  emit('battleEvent')
}

setTimeout(() => {
  isBattle.value = false
  battleEvent()
  isResultMessage.value = true
  setTimeout(() => {
    showResultPage()
  }, 3000);
}, 3000);
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
  animation: tilt 600ms ease-in forwards;
  animation-delay: 1s;
}
</style>
