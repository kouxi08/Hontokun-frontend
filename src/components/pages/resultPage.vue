<template>
  <div class="w-screen h-screen fixed">
    <div class="bg-quiz">
      <div v-show="isBattle" class="flex items-center justify-center w-screen h-screen">
        <img src="/smoke.png" alt="" class="animate-tilt">
      </div>
      <div
        v-show="isResultMessage" class="h-full flex flex-col gap-[40px] items-center justify-center"
        @click="showResultPage">
        <div v-if="accuracy >= 0.5">
          <p class="text-[64px] font-zenMaru text-white text-center font-bold stroke-accent-4">
            おめでとう
          </p>
          <p class="text-[24px] font-zenMaru text-white text-center font-bold stroke-accent-2">
            {{ quizStore.catName }}をつかまえた！
          </p>
        </div>
        <div v-else>
          <p class="text-[64px] font-zenMaru text-white text-center font-bold stroke-secondary-4">
            ざんねん
          </p>
          <p class="text-[24px] font-zenMaru text-white text-center font-bold stroke-secondary-2">
            にげられてしまった…
          </p>
        </div>
      </div>
      <div v-show="resultPage" class="h-full xs:py-[56px] sm:py-[64px] flex flex-col justify-between">
        <Table :header="tableHeader" :content="tableContent" />
        <div class="h-2/3 flex flex-col gap-[8px] overflow-hidden overflow-y-scroll mt-[24px]">
          <div v-for="(quiz, index) in quizSet" :key="quiz" class="flex flex-col gap-[24px] py-[24px]">
            <News
              v-if="isAnswerRevealed[index]" :title="quiz.questionTitle" :img="quiz.img" :content="quiz.content"
              :show-result="true" @showExplainEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
            <Explain
              v-else :type="quiz.type" :explanation="quiz.explanation" :answer="quiz.answer"
              :your-answer="quizStore.answers[index]" :keyword="quiz.keyword" :news-link="quiz.newsUrl"
              @showNewsEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
          </div>
        </div>
        <div class="flex flex-col justify-center items-center gap-[24px] mx-[48px] pt-[5%]">
          <Button color="accent" class="w-full" @click="router.push({ name: 'difficultyPage' })">難易度へ戻る</Button>
          <Button color="primary" class="w-full" @click="router.push({ name: 'modePage' })">モード選択へ戻る</Button>
          <Button color="secondary" class="w-full" @click="router.push({ name: 'mainPage' })">事務所へ戻る</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Table from "@/components/modules/TableComponent.vue";
import News from "@/components/modules/NewsComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import Explain from "@/components/modules/ExplainComponent.vue";
import { useQuizStore } from "@/stores/Quiz";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosInstance";

const router = useRouter();
const quizStore = useQuizStore();

onMounted(async () => {
  // TODO: answersをbattlePageから受け取る
  const res = await axiosInstance.post("/quiz/result", {
    quizMode: 1,
    answers: quizStore.questions.map((item, index) => ({
      quizId: item.id,
      order: item.order, // または item.order を使用
      answerTime: 10, // これは固定値か、別の方法で計算する必要があるかもしれません
      answer: quizStore.answers[index] ? "TRUE" : "FALSE",
    })),
  });
  quizSet.value = res.data.quizList;
  accuracy.value = res.data.accuracy;
  isAnswerRevealed.value = Array.from({ length: quizSet.value.length }, () => false);
});

const isBattle = ref(true);
const isResultMessage = ref(false);
const resultPage = ref(false);
const background = ref("");
const answers = ref([]);
const quizSet = ref([]);
const accuracy = ref();

const yourAnswer = quizStore.answers;

const tableHeader = [{ name: "ばんごう" }, { name: "こたえ" }, { name: "あなた" }];
const tableContent = quizStore.tableContent;

const showResultPage = () => {
  isResultMessage.value = false;
  resultPage.value = true;
};

const getBackground = (difficulty) => {
  switch (difficulty) {
    case 1:
      return "url(/backgroundImage/forest-path.png)";

    case 2:
      return "url(/backgroundImage/evening-cityscape.png)";

    case 3:
      return "url(/backgroundImage/busy-street-roadside.png)";

    case 4:
      return "url(/backgroundImage/airport.png)";

    case 5:
      return "url(/backgroundImage/red-carpet.png)";
  }
};

background.value = getBackground(quizStore.difficulty)

setTimeout(() => {
  isBattle.value = false;
  isResultMessage.value = true;
  setTimeout(() => {
    showResultPage();
  }, 3000);
}, 3000);

const isAnswerRevealed = ref([]);
</script>

<style>
.bg-quiz {
  width: 100%;
  height: 100%;
  background-image: v-bind(background);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

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
