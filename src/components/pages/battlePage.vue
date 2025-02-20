<template>
  <div class="w-screen h-screen fixed">
    <div class="bg-quiz">
      <img v-show="visibleCats" :src="enemy.url" alt="" width="208"
        class="absolute top-[88px] left-1/2 -translate-x-1/2 z-0">
      <div v-show="!visibleQuiz" class="w-full h-full flex items-center whitespace-nowrap overflow-hidden">
        <p
          class="font-zenMaru text-[128px] lg:text-[256px] inline-block pl-[100%] animate-scroll text-white stroke-primary-4">
          {{ enemy.name }}
        </p>
      </div>
      <div v-if="visibleQuiz" class="w-full absolute top-[88px]">
        <Transition name="fade">
          <AnswerModal v-show="isButton" :answer="correctness" />
        </Transition>
        <NewsTitle :id="currentQuiz.order" :title="currentQuiz.question" />
        <News :title="currentQuiz.news.title" :img="currentQuiz.news.image" :content="currentQuiz.news.content"
          class="pt-[32px]" />
        <div class="flex justify-between mx-[48px] pt-[32px]">
          <Icon name="correct" width="96" height="96" class="md:w-[128px] cursor-pointer" @click="handleAnswer(true)" />
          <Icon name="incorrect" width="96" height="96" class="md:w-[128px] cursor-pointer"
            @click="handleAnswer(false)" />
        </div>
      </div>
      <img v-show="visibleCats" :src="costume" alt="" class="absolute bottom-[32px] left-1/2 -translate-x-1/2">
    </div>
  </div>
</template>

<script setup>
import NewsTitle from "@/components/modules/NewsTitleComponent.vue";
import News from "@/components/modules/NewsComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import AnswerModal from "@/components/modules/AnswerModalComponent.vue";
import { ref, computed, onMounted } from "vue";
import { useQuizStore } from "@/stores/Quiz";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosInstance";

const quizStore = useQuizStore();

// Router
const router = useRouter();

const costume = ref("");
const enemy = ref("");

// Reactive States
const current = ref(0);
const visibleCats = ref(true);
const visibleQuiz = ref(false);
const correctness = ref(null)
const isButton = ref(false)
const quizData = ref([]);

onMounted(async () => {
  // Fetch Data
  await axiosInstance
    .get(`/quiz/${quizStore.difficulty}`)
    .then((res) => {
      quizData.value = res.data.quizzes;
      costume.value = res.data.costume.url;
      enemy.value = res.data.enemy;
      quizStore.setQuestions(res.data.quizzes);
      quizStore.setCatName(res.data.enemy.name);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Computed Quiz
const currentQuiz = computed(() => quizData.value[current.value]);

// マルバツを押したときの処理
const handleAnswer = (answer) => {
  isButton.value = true;
  quizStore.addAnswer(answer);
  correctness.value = answer === quizData.value[current.value].correctAnswer;
  setTimeout(() => {
    isButton.value = false;
    if (current.value === quizData.value.length - 1) {
      router.push({ name: "resultPage" });
    } else {
      current.value++;
    }
  }, 1000);
};

const getBackground = () => {
  switch (quizStore.difficulty) {
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

const battleEvent = () => {
  visibleCats.value = false;
};

setTimeout(() => {
  quizStore.clearAnswers();
  visibleQuiz.value = true;
}, 3000);
</script>

<style scoped>
.bg-quiz {
  width: 100%;
  height: 100%;
  background-image: v-bind("getBackground()");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
