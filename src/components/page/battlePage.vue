<template>
  <div class="w-screen h-screen fixed">
    <div class="bg-quiz">
      <img v-show="visibleCats" :src="catSettings.image" alt="" width="208"
        class="absolute top-[88px] left-1/2 -translate-x-1/2 z-0">
      <div v-show="!visibleQuiz" class="w-full h-full flex items-center whitespace-nowrap overflow-hidden">
        <p
          class="font-zenMaru text-[128px] lg:text-[256px] inline-block pl-[100%] animate-scroll text-white stroke-primary-4">
          {{ catSettings.name }}
        </p>
      </div>
      <div v-show="visibleQuiz" class="w-full absolute top-[88px]">
        <NewsTitle :id="currentQuiz.id" :title="currentQuiz.newsTitle" />
        <News :title="currentQuiz.questionTitle" :img="currentQuiz.img" :content="currentQuiz.content"
          class="pt-[32px]" />
        <div class="flex justify-between mx-[48px] pt-[32px]">
          <Icon name="correct" width="96" height="96" class="cursor-pointer" @click="handleAnswer(true)" />
          <Icon name="incorrect" width="96" height="96" class="cursor-pointer" @click="handleAnswer(false)" />
        </div>
      </div>
      <img v-show="visibleCats" src="/hontokun.svg" alt="" class="absolute bottom-[32px] left-1/2 -translate-x-1/2">
    </div>
  </div>
</template>

<script setup>
import NewsTitle from "@/components/modules/NewsTitleComponent.vue";
import News from "@/components/modules/NewsComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Props
const props = defineProps({
  difficulty: {
    type: Number,
    default: 1,
  },
});

// Router
const router = useRouter();

// Quiz Data
const quizSet = [
  {
    id: 1,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "台風15号接近 首都圏厳戒態勢",
    img: "/sample.jpg",
    content:
      "台風15号が関東地方に接近中。気象庁は警戒を呼びかけ、各地で厳重な備えが進む。東京都は午後から公共交通機関の計画運休を発表。スーパーには買い出しの長蛇の列。企業は在宅勤務を推奨し、学校は休校を決定。避難所も開設され始めた。強風と豪雨に備え、住民の緊張が高まる。明日未明に最接近の見込み。",
  },
  {
    id: 2,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "月面に巨大UFO出現？地球外生命体か",
    img: "/sample.jpg",
    content:
      "NASA発表によると、月面に直径1kmの巨大UFOが出現したとのこと。宇宙ステーションの観測カメラが捉えた映像には、円盤状の物体が月面に着陸する様子が映っていた。専門家は「地球外知的生命体の可能性が高い」と指摘。各国首脳が緊急会議を開き、対応を協議している。",
  },
  {
    id: 3,
    newsTitle: "これはフェイクニュース？",
    questionTitle: "実は寝ることは無駄！？",
    img: "/sample.jpg",
    content:
      "最新の研究によると、寝ることは実は時間の無駄だと判明。科学者たちは、睡眠時間を削減することで生産性が飛躍的に向上すると主張しています。この革新的な発見により、人々の生活様式が大きく変わる可能性があります。",
  },
];

// Cat Settings
const catSettingsMap = {
  1: {
    name: "ふろしきネコ",
    image: "/hurosiki.svg",
    background: "url(/backgroundImage/forest-path.png)",
  },
  2: {
    name: "ハットネコ",
    image: "/hat.svg",
    background: "url(/backgroundImage/evening-cityscape.png)",
  },
  3: {
    name: "グラサンネコ",
    image: "/grass.svg",
    background: "url(/backgroundImage/busy-street-roadside.png)",
  },
  4: {
    name: "はまきネコ",
    image: "/hamaki.svg",
    background: "url(/backgroundImage/airport.png)",
  },
  5: {
    name: "ボスネコ",
    image: "/boss.svg",
    background: "url(/backgroundImage/red-carpet.png)",
  },
};

const catSettings = catSettingsMap[props.difficulty] || catSettingsMap[1];

// Reactive States
const current = ref(0);
const visibleCats = ref(true);
const visibleQuiz = ref(false);
const answers = ref([]);

// Computed Quiz
const currentQuiz = computed(() => quizSet[current.value]);

// Events
const handleAnswer = (answer) => {
  answers.value.push(answer);

  if (current.value === quizSet.length - 1) {
    router.push({ name: "resultPage", params: { difficulty: props.difficulty } });
  } else {
    current.value++;
  }
};

const battleEvent = () => {
  visibleCats.value = false;
};

setTimeout(() => {
  visibleQuiz.value = true;
}, 3000);
</script>

<style scoped>
.bg-quiz {
  width: 100%;
  height: 100%;
  background-image: v-bind("catSettings.background");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
