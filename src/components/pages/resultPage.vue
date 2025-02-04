<template>
  <div class="w-screen h-screen fixed">
    <div class="bg-quiz">
      <div v-show="isBattle" class="flex items-center justify-center w-screen h-screen">
        <img src="/smoke.png" alt="" class="animate-tilt">
      </div>
      <div v-show="isResultMessage" class="h-full flex flex-col gap-[40px] items-center justify-center"
        @click="showResultPage">
        <p class="text-[64px] font-zenMaru text-white font-bold" :class="gotMessage.titleStroke">
          {{ gotMessage.title }}
        </p>
        <p class="text-[24px] font-zenMaru text-white font-bold" :class="gotMessage.subTitleStroke">
          {{ gotMessage.subTitle }}
        </p>
      </div>
      <div v-show="resultPage" class="h-full xs:pt-[56px] sm:pt-[64px]">
        <Table :header="tableHeader" :content="tableContent" />
        <div class="h-[42%] flex flex-col gap-[8px] overflow-hidden overflow-y-scroll mt-[24px]">
          <div v-for="(quiz, index) in quizSet" :key="quiz" class="flex flex-col gap-[24px] py-[24px]">
            <News
              v-if="isAnswerRevealed[index]" :title="quiz.questionTitle" :img="quiz.img" :content="quiz.content"
              :show-result="true" @showExplainEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
            <Explain
              v-else :type="quiz.type" :explanation="quiz.explanation"
              :answer="quiz.answer" :keyword="quiz.keyword"
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
import Explain from '@/components/modules/ExplainComponent.vue'
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"
import axiosInstance from "@/axiosInstance";

const router = useRouter()

const props = defineProps({
  difficulty: {
    type: Number,
    default: 1,
  },
  answers: {
    type: Array,
    required: true,
  },
});

onMounted(async () => {
  // TODO: answersをbattlePageから受け取る
  const res = await axiosInstance.post('/quiz/result', {
    "quizMode": 1,
    "answers": [
        {
            "quizId": "",
            "order": 1,
            "answerTime": 10,
            "answer": "TRUE"
        },
        {
            "quizId": "",
            "order": 2,
            "answerTime": 10,
            "answer": "TRUE"
        },
        {
            "quizId": "",
            "order": 3,
            "answerTime": 10,
            "answer": "TRUE"
        }
    ]
  });

  console.log(res.data);
  quizSet.value = res.data.quizList;
  isAnswerRevealed.value = Array.from({ length: quizSet.value.length }, () => false);

})

const isBattle = ref(true);
const isResultMessage = ref(false);
const resultPage = ref(false);
const background = ref("");
const answers = ref([]);
const quizSet = ref([]);

const gotMessage = {
  titleStroke: "stroke-accent-4",
  subTitleStroke: "stroke-accent-2",
  title: "おめでとう",
  subTitle: "指名手配猫をつかまえた！",
};
const gotAwayMessage = {
  stroke: "stroke-secondary-4",
  subTitleStroke: "stroke-secondary-2",
  gotAway: "ざんねん",
  gotAwaySub: "にげられてしまった",
};
const tableHeader = [{ name: "ばんごう" }, { name: "こたえ" }, { name: "あなた" }];
const tableContent = [
  { id: 1, correction: "correct", yourAnser: "correct" },
  { id: 2, correction: "correct", yourAnser: "incorrect" },
  { id: 3, correction: "incorrect", yourAnser: "correct" },
];

const showResultPage = () => {
  isResultMessage.value = false;
  resultPage.value = true;
};

if (props.difficulty == 1) {
  background.value = "url(/backgroundImage/forest-path.png)";
} else if (props.difficulty == 2) {
  background.value = "url(/backgroundImage/evening-cityscape.png)";
} else if (props.difficulty == 3) {
  background.value = "url(/backgroundImage/busy-street-roadside.png)";
} else if (props.difficulty == 4) {
  background.value = "url(/backgroundImage/airport.png)";
} else if (props.difficulty == 5) {
  background.value = "url(/backgroundImage/red-carpet.png)";
}

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
