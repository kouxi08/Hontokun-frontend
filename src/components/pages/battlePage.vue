<template>
  <div v-if="loading" class="w-screen h-screen fixed">
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
        <Message v-if="isHint" class="w-[80%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-0 z-50"
          :messages="[currentQuiz.hint]" />
        <NewsTitle :id="currentQuiz.order" :title="currentQuiz.question" />
        <News :title="currentQuiz.news.title" :img="currentQuiz.news.image" :content="currentQuiz.news.content"
          class="pt-[32px]" />
        <div v-if="currentQuiz.type == 'TRUE_OR_FALSE'" class="flex justify-between mx-[48px] pt-[32px]">
          <Icon name="correct" width="96" height="96" class="md:w-[128px] cursor-pointer" @click="handleAnswer(true)" />
          <Icon name="incorrect" width="96" height="96" class="md:w-[128px] cursor-pointer"
            @click="handleAnswer(false)" />
        </div>
        <div v-else-if="currentQuiz.type == 'SELECTION'" v-for="choice in choices" :key="choice"
          class="flex justify-between mx-[48px] pt-[32px]">
          <button class="w-full">{{ choice }}</button>
        </div>
      </div>
      <div v-show="visibleCats" class="w-full h-fit absolute bottom-[32px] flex justify-center">
        <img :src="costume" alt="" class="animate-bounce" @click="showHint">
      </div>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import NewsTitle from "@/components/modules/NewsTitleComponent.vue";
import News from "@/components/modules/NewsComponent.vue";
import Icon from "@/components/modules/IconComponent.vue";
import AnswerModal from "@/components/modules/AnswerModalComponent.vue";
import Message from "@/components/modules/MessageComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import LoadingPage from "@/components/pages/loadingPage.vue";
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
const isHint = ref(false);
const loading = ref(false);
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
      console.log(res.data.quizzes)
      quizStore.setCatName(res.data.enemy.name);
      loading.value = true;
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
  isHint.value = false;
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

const showHint = () => {
  isHint.value = !isHint.value;
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

.animate-bounce {
  animation: bounce 1s infinite forwards;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}
</style>
