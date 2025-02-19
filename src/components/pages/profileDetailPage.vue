<template>
  <div v-if="loading" class="w-screen h-screen bg-[#FFFCF8] flex flex-col overflow-hidden">
    <!-- 固定部分 -->
    <!-- ヘッダー -->
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="arrow-left-line" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'profilePage' })" />
      <p class="font-zenMaru font-medium text-[16px] text-center">{{ profileStore.catName }}</p>
    </div>
    <Rate :value="accuracy" size="sm" class="absolute top-[40px] right-[48px]" />
    <!-- ネコとボタン -->
    <div class="relative h-44 mx-[48px] my-[24px]">
      <img :src="profileStore.catUrl" alt="" height="120" class="absolute left-1/2 -translate-x-1/2">
      <Button color="primary" size="xs" class="absolute left-1/2 bottom-0 -translate-x-1/2"
        @click="arrestCat">つかまえる</Button>
    </div>
    <!-- スクロール可能な部分 -->
    <div class="flex-1 overflow-y-auto">
      <!-- テーブル -->
      <Table :header="tableHeader" :content="tableContent" />
      <!-- ニュース -->
      <div v-for="(quiz, index) in quizSet" :key="quiz" class="flex flex-col gap-[24px] py-[24px]">
        <NewsTitle :id="index + 1" :title="quiz.question" />
        <News v-if="isAnswerRevealed[index]" :title="quiz.questionTitle" :img="quiz.img" :content="quiz.content"
          :show-result="true" @showExplainEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
        <Explain v-else :type="quiz.type" :explanation="quiz.explanation" :answer="quiz.answer === 'TRUE'"
          :your-answer="quiz.userAnswer === 'TRUE'" :keyword="quiz.keyword"
          @showNewsEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
      </div>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Icon from "@/components/modules/IconComponent.vue";
import Rate from "@/components/modules/RateComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import Table from "@/components/modules/TableComponent.vue";
import NewsTitle from "@/components/modules/NewsTitleComponent.vue";
import News from "@/components/modules/NewsComponent.vue";
import Explain from "@/components/modules/ExplainComponent.vue";
import LoadingPage from "@/components/pages/loadingPage.vue";
import AxiosInstance from "@/axiosInstance.js";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/Profile";
import { useQuizStore } from "@/stores/Quiz";

const router = useRouter();
const profileStore = useProfileStore();
const quizStore = useQuizStore();

const loading = ref(false)
const accuracy = ref();
const quizSet = ref([]);
const tableContent = ref([]);

const tableHeader = [{ name: "ばんごう" }, { name: "こたえ" }, { name: "あなた" }];

onMounted(async () => {
  const historyDetail = await AxiosInstance.get(`/history/quiz-set/${profileStore.id}`);
  quizSet.value = historyDetail.data.quizList;
  tableContent.value = quizSet.value.map((quiz, index) => ({
    id: index + 1,
    correction: quiz.answer,
    yourAnswer: quiz.userAnswer,
  }));
  accuracy.value = historyDetail.data.quizSet.accuracy;
  loading.value = true;
});

const isAnswerRevealed = ref([]);

onMounted(() => {
  isAnswerRevealed.value = Array.from({ length: quizSet.value.length }, () => false);
});

const arrestCat = () => {
  quizStore.setDifficulty(quizSet.value[0].tier);
  router.push({ name: "battlePage" });
};
</script>
