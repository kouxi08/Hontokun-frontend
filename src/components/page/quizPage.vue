<template>
  <div class="pt-[88px]">
    <NewsTile :id="quizSet[current].id" :title="quizSet[current].newsTitle" />
    <News :title="quizSet[current].questionTitle" :img="quizSet[current].img" :content="quizSet[current].content" zclass="pt-[32px]" />
    <div class="flex justify-between mx-[48px] pt-[32px]">
      <Icon name="correct" width="96" height="96" class="cursor-pointer" @click="isCorrect" />
      <Icon name="incorrect" width="96" height="96" class="cursor-pointer" @click="isCorrect" />
    </div>
  </div>
</template>

<script setup>
import News from '../NewsComponent.vue'
import NewsTile from '../NewsTitleComponent.vue'
import Icon from '../IconComponent.vue'
import resultPage from './resultPage.vue'
import { useStore } from '../../stores/Quiz.js'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter();
const page = useStore();
const current = ref(0)
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

const isCorrect = () => {
  if (current.value == quizSet.length - 1) {
    page.setPage('結果', resultPage)
    return
  }
  current.value++
}

</script>
