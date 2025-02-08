<template>
  <div class="w-screen h-screen bg-[#FFFCF8] flex flex-col overflow-hidden">
    <!-- 固定部分 -->
    <!-- ヘッダー -->
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="arrow-left-line" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'profilePage' })" />
      <p class="font-zenMaru text-[16px] text-center">{{ profileStore.catName }}</p>
    </div>
    <Rate :value="profileStore.accuracy" size="sm" class="absolute top-[40px] right-[48px]" />
    <!-- ネコとボタン -->
    <div class="relative h-44 mx-[48px] my-[24px]">
      <img :src="profileStore.catUrl" alt="" height="120" class="absolute left-1/2 -translate-x-1/2">
      <Button color="primary" size="xs" class="absolute left-1/2 bottom-0 -translate-x-1/2">つかまえる</Button>
    </div>
    <!-- スクロール可能な部分 -->
    <div class="flex-1 overflow-y-auto">
      <!-- テーブル -->
      <Table :header="tableHeader" :content="tableContent" />
      <!-- ニュース -->
      <div v-for="(quiz, index) in quizSet" :key="quiz" class="flex flex-col gap-[24px] py-[24px]">
        <NewsTitle :id="quiz.id" :title="quiz.newsTitle" />
        <News v-if="isAnswerRevealed[index]" :title="quiz.questionTitle" :img="quiz.img" :content="quiz.content"
          :show-result="true" @showExplainEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
        <Explain v-else :type="explainData[index].type" :explanation="explainData[index].explanation"
          :answer="explainData[index].answer" :keyword="explainData[index].keyword"
          @showNewsEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/modules/IconComponent.vue'
import Rate from '@/components/modules/RateComponent.vue'
import Button from '@/components/modules/ButtonComponent.vue'
import Table from '@/components/modules/TableComponent.vue'
import NewsTitle from '@/components/modules/NewsTitleComponent.vue'
import News from '@/components/modules/NewsComponent.vue'
import Explain from '@/components/modules/ExplainComponent.vue'
import AxiosInstance from '@/axiosInstance.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/Profile'

const router = useRouter()
const profileStore = useProfileStore()

onMounted(async () => {
  const historyDetail = await AxiosInstance.get(`/history/quiz-set/${profileStore.id}`)
  console.log(historyDetail)
})

const tableHeader = [
  { name: "ばんごう" },
  { name: "こたえ" },
  { name: "あなた" }
]
const tableContent = [
  { id: 1, correction: true, yourAnswer: true },
  { id: 2, correction: true, yourAnswer: false },
  { id: 3, correction: false, yourAnswer: true },
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

const explainData = [
  {
    type: "true_or_false",
    answer: true,
    explanation: "「台風15号」など台風番号で調べることでより検索しやすくなります。「関東」「接近」で関東に接近した台風の情報が検索で出てきやすくなります。",
    keyword: "台風15号　関東　接近",
  },
  {
    type: "true_or_false",
    answer: false,
    explanation: "「NASA」が公式発表されている記事を検索して、フェイクニュースか判断することができます。",
    keyword: "NASA　宇宙ステーション　巨大UFO",
  },
  {
    type: "true_or_false",
    answer: false,
    explanation: "「睡眠時間」が生産性に関係している記事を検索して、フェイクニュースか判断することができます。",
    keyword: "睡眠時間　生産　無駄",
  },
]

const isAnswerRevealed = ref(Array.from({ length: quizSet.length }, () => false))

const arrestCat = () => {
  router.push({ name: "battlePage" })
}
</script>
