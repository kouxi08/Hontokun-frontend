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
import { ref, computed, onMounted } from "vue";
import { useQuizStore } from "@/stores/Quiz"
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosInstance";

const store = useQuizStore()

// Router
const router = useRouter();

const costume = ref('')
const enemy = ref('')

onMounted(async () => {
  // Fetch Data
  await axiosInstance.get(`/quiz/${store.difficulty}`)
    .then((res) => {
      quizData.value = res.data.quizzes;
      costume.value = res.data.costume.url
      enemy.value = res.data.enemy
      store.setQuestions(res.data.quizzes)
    })
    .catch((err) => {
      console.error(err);
    }
    );
})

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
  answers.value.push(answer);
  if (current.value === quizData.value.length - 1) {
    router.push({ name: "resultPage" });
  } else {
    current.value++;
  }
};

const getBackground = () => {
  switch (store.difficulty) {
    case 1:
      return "url(/backgroundImage/forest-path.png)"

    case 2:
      return "url(/backgroundImage/evening-cityscape.png)"

    case 3:
      return "url(/backgroundImage/busy-street-roadside.png)"

    case 4:
      return "url(/backgroundImage/airport.png)"

    case 5:
      return "url(/backgroundImage/red-carpet.png)"
  }
}

const battleEvent = () => {
  visibleCats.value = false;
};

setTimeout(() => {
  store.clearAnswers()
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
