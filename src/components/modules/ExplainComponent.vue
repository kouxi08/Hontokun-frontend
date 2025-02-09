<template>
  <div class="font-zenMaru bg-white mx-[48px] p-[16px] shadow-lg rounded-[8px] flex flex-col">
    <!-- Header Section -->
    <div class="w-full h-[40px] grid grid-cols-3 justify-between items-center top-4">
      <Button size="xs" color="accent" class="justify-self-start" @click="showNews">問題へ</Button>
      <p class="font-bold text-[16px] text-center">解説</p>
      <Button size="xs" color="danger" class="justify-self-end">報告</Button>
    </div>

    <!-- マルバツの場合 -->
    <div v-if="type === 'TRUE_OR_FALSE'" class="w-full">
      <div class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
        <p
          class="justify-self-start bg-primary font-bold text-white text-[16px] py-[4px] px-[8px] rounded-[8px]">
          こたえ
        </p>
        <Icon
          class="justify-self-center"
          :name="answer ? 'correct' : 'incorrect'"
          width="32"
          height="32" />
        <a
          v-if="answer === 'TRUE'"
          class="justify-self-end text-blue-500 text-[12px] font-bold"
          :href="props.newsLink"
          target="_blank">
          ニュース記事へ
        </a>
      </div>
      <div class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
        <p
          class="justify-self-start font-bold text-black text-[10px] py-[4px] px-[8px] rounded-[8px]">
          あなたのこたえ
        </p>
        <Icon
          class="justify-self-center"
          :name="yourAnswer ? 'correct' : 'incorrect'"
          width="24"
          height="24" />
      </div>
    </div>
    <!-- 複数回答の場合 -->
    <div v-if="type === 'MULTIPLE_CHOICE'" class="mt-[16px]">
      <!-- 正解表示 -->
      <div
        v-if="answer === 'true'"
        class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
        <p
          class="justify-self-start bg-primary font-bold text-white text-stroke-2 text-[16px] py-[4px] px-[8px] rounded-[8px]">
          正解
        </p>
        <p class="font-bold text-[16px] text-center">正解の選択肢</p>
        <div
          v-for="(option, index) in options"
          :key="index"
          class="flex items-center justify-center w-[200px] h-[50px] border-[3px] rounded-md"
          :class="{
            'border-red-500 text-red-500': index === correctIndex && indexColor === 'red',
            'border-yellow-500 text-yellow-500': index === correctIndex && indexColor === 'yellow',
            'border-green-500 text-green-500': index === correctIndex && indexColor === 'green',
            'border-blue-500 text-blue-500': index === correctIndex && indexColor === 'blue',
          }">
          <Icon name="check-circle" width="24" height="24" class="mr-2" />
          <span class="font-bold text-[14px]">{{ option }}</span>
        </div>
      </div>
    </div>

    <div class="mt-[32px] flex items-center justify-between border rounded-full p-[8px] shadow">
      <p class="text-black font-bold text-[12px] px-[8px] flex-1">
        {{ keyword }}
      </p>
      <button
        class="bg-primary text-black font-bold text-[14px] py-[6px] px-[16px] rounded-full shadow"
        @click="searchGoogle">
        検索
      </button>
    </div>

    <p class="mt-[32px] font-bold text-[12px] tracking-wider leading-[32px]">
      {{ explanation }}
    </p>
  </div>
</template>

<script setup>
  import Button from "@/components/modules/ButtonComponent.vue";
  import Icon from "@/components/modules/IconComponent.vue";

  // Propsを定義
  const props = defineProps({
    type: {
      type: String,
      required: true,
      validator: (value) => ["TRUE_OR_FALSE", "MULTIPLE_CHOICE"].includes(value),
    },
    // 問題の答え
    answer: {
      type: Boolean,
      required: true,
    },
    // ユーザーの答え
    yourAnswer: {
      type: Boolean,
      required: true,
    },
    // 解説の文章
    explanation: {
      type: String,
      required: true,
    },
    // 検索ワード
    keyword: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    correctIndex: {
      type: Number,
      default: -1,
    },
    newsLink: {
      type: String,
      default: "",
    },
  });

  // State管理
  import { ref } from "vue";

  const isAnswered = ref(false);
  const selectedOption = ref(null);

  // Emitsの定義
  const emit = defineEmits(["showNewsEvent"]);

  // ニュースを表示する関数
  const showNews = () => {
    emit("showNewsEvent");
  };

  // Google検索用関数
  function searchGoogle() {
    const query = encodeURIComponent(props.keyword); // propsからkeywordを取得
    const googleSearchUrl = `https://www.google.com/search?q=${query}`;
    window.open(googleSearchUrl, "_blank"); // 新しいタブで検索を開く
  }
</script>
