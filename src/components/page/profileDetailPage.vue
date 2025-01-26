<template>
  <div class="w-screen h-screen bg-[#FFFCF8] flex flex-col overflow-hidden">
    <!-- 固定部分 -->
    <!-- ヘッダー -->
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="arrow-left-line" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'profilePage' })" />
      <p class="font-zenMaru text-[16px] text-center">{{ catName }}</p>
    </div>
    <Rate value="32" size="sm" class="absolute top-[40px] right-[48px]" />
    <!-- ネコとボタン -->
    <div class="relative h-44 mx-[48px] my-[24px]">
      <img :src="catImage" alt="" height="120" class="absolute left-1/2 -translate-x-1/2">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const catName = "ふろしきネコ"
const catImage = "/hurosiki.svg"
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
    newsTitle: "情報の出どころ確認しないで、記事の内容を信じる",
    questionTitle: "台風15号接近 首都圏厳戒態勢",
    img: "/sample.jpg",
    content:
      "",
  },
  {
    id: 2,
    newsTitle: "一般の方が投稿した記事を友達に教える",
    questionTitle: "月面に巨大UFO出現？地球外生命体か",
    img: "/sample.jpg",
    content:
      "",
  },
  {
    id: 3,
    newsTitle: "画像があるだけで本当だと判断しない",
    questionTitle: "実は寝ることは無駄！？",
    img: "/sample.jpg",
    content: "",
  },
];


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
  // ふろしきネコのページに遷移
  router.push({ name: 'battlePage', params: { difficulty: 1 } })
}
</script>
