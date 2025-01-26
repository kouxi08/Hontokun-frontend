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
            <News v-if="isAnswerRevealed[index]" :title="quiz.questionTitle" :img="quiz.img" :content="quiz.content"
              :show-result="true" @showExplainEvent="isAnswerRevealed[index] = !isAnswerRevealed[index]" />
            <Explain v-else :type="explainData[index].type" :explanation="explainData[index].explanation"
              :answer="explainData[index].answer" :keyword="explainData[index].keyword"
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
import { ref } from "vue";
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  difficulty: {
    type: Number,
    default: 1,
  },
});


const isBattle = ref(true);
const isResultMessage = ref(false);
const resultPage = ref(false);
const background = ref("");

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
const tableHeader = [{ name: "番号" }, { name: "正誤" }, { name: "問題" }];
const tableContent = [
  { id: 1, correction: "incorrect", question: "arrow-right-ring" },
  { id: 2, correction: "incorrect", question: "arrow-right-ring" },
  { id: 3, correction: "correct", question: "arrow-right-ring" },
];
const quizSet = [
  {
    id: 1,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "台風15号接近 首都圏厳戒態勢",
    img: "/sample.jpg",
    content:
      "",
  },
  {
    id: 2,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "月面に巨大UFO出現？\n地球外生命体か",
    img: "/sample.jpg",
    content:
      "",
  },
  {
    id: 3,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "実は寝ることは無駄！？",
    img: "/sample.jpg",
    content:
      "",
  },
];
const explainData = [
  {
    type: "true_or_false",
    answer: false,
    explanation: "情報源がどこから、いつ発信されたものか、信用できるものかわからないものは信頼性が低いのでうのみにしないようにしましょう。",
    keyword: "ニュース　情報　出どころ",
  },
  {
    type: "true_or_false",
    answer: false,
    explanation: "専門家または必要な資格を持った人が、責任をもって発信しているものかわからないです。それを友達に教える「拡散」を行わないようにしましょう。",
    keyword: "一般　記事　拡散　危険",
  },
  {
    type: "true_or_false",
    answer: true,
    explanation: "画像だけでは判断する情報が少なく、他の記事の画像であったり、過去に撮影された無関係のものである可能性があります。",
    keyword: "画像検索",
  },
]

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

const isAnswerRevealed = ref(Array.from({ length: quizSet.length }, () => false))
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
