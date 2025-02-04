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
      <div v-if="visibleQuiz" class="w-full absolute top-[88px]">
        <NewsTitle :id="currentQuiz.order" :title="currentQuiz.question" />
        <News :title="currentQuiz.news.title" :img="currentQuiz.news.image" :content="currentQuiz.news.content"
          class="pt-[32px]" />
        <div class="flex justify-between mx-[48px] pt-[32px]">
          <Icon name="correct" width="96" height="96" class="md:w-[128px] cursor-pointer" @click="handleAnswer(true)" />
          <Icon name="incorrect" width="96" height="96" class="md:w-[128px] cursor-pointer"
            @click="handleAnswer(false)" />
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosInstance";

// Props
const props = defineProps({
  difficulty: {
    type: Number,
    default: 1,
  },
});

// Router
const router = useRouter();

onMounted(async () => {
  // Fetch Data
  const fetchData = async () => {
    await axiosInstance.get(`/quiz/${props.difficulty}`)
      .then((res) => {
        quizData.value = res.data.quizzes;
      })
      .catch((err) => {
        console.error(err);
      }
    );
  }
  // Animation
  const animation = new Promise((resolve) => setTimeout(resolve, 3000));

  Promise.allSettled([fetchData(), animation]).then(() => {
    visibleQuiz.value = true;
  })
})

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
const quizData = ref([]);

// Computed Quiz
const currentQuiz = computed(() => quizData.value[current.value]);

// Events
const handleAnswer = (answer) => {
  answers.value.push({
    quizId: currentQuiz.value.id,
    order: current.value,
    answer: answer,
    answerTime: null,
  });
  
  if (current.value === quizData.value.length - 1) {
    router.push(
      {
        name: "resultPage",
        params: {
          difficulty: props.difficulty,
          answers: answers.value
        }
      }
    );
  } else {
    current.value++;
  }
};

const battleEvent = () => {
  visibleCats.value = false;
};

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
