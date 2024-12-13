<template>
  <!-- アコーディオンのヘッダー -->
  <div class="w-full shadow-[0_0_4px_0_rgba(171,171,171,0.25)]">
    <div class="flex justify-between items-center w-full p-[16px] cursor-pointer rounded-[6px] hover:bg-[#C5C5C5]"
      @click="toggleDetails">
      <!-- 画像 -->
      <img :src="iconImage" alt="ネコ画像" class="w-[64px] h-[64px] object-contain">
      <!-- 名前 -->
      <p class="text-[16px] text-center font-zenMaru">
        {{ iconName.slice(0, -2) }}
        <br>
        {{ iconName.slice(-2) }}
      </p>
      <!-- Rate -->
      <div class="h-full flex items-center justify-center">
        <Rate :value="accuracy" size="md" color="default" />
      </div>
      <!-- アイコン -->
      <Icon v-if="showDetails" name="card-close" width="24" height="24" />
      <Icon v-if="!showDetails" name="card-open" width="24" height="24" />
    </div>

    <!-- アコーディオンの詳細 -->
    <div v-show="showDetails" class="w-full p-4 flex flex-col gap-4 overflow-hidden transition-opacity duration-300">
      <!-- 詳細カードを繰り返し表示 -->
      <div v-for="attempt in attempts" :key="attempt"
        class="flex justify-between items-center w-full h-[80px] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] rounded-lg px-4 py-2 cursor-pointer hover:bg-[#C5C5C5]"
        @click="router.push({ name: attempt.to })">
        <p class="font-zenMaru text-[#808080] text-[16px] w-[80px]">{{ attempt.timeAgo }}</p>
        <Rate v-if="attempt.accuracy < 50" :value="attempt.accuracy" size="sm" color="danger" />
        <Rate v-else :value="attempt.accuracy" size="sm" color="secondary" />
        <Icon name="card-right" width="24" height="24" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Rate from "./RateComponent.vue";
import Icon from "./IconComponent.vue";
import { useRouter } from 'vue-router'
const router = useRouter();

// 受け取るprops
const props = defineProps({
  iconName: {
    type: String,
    required: true,
  },
  iconImage: {
    type: String,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  attempts: {
    type: Array,
    required: true,
  },
});

// アコーディオンの開閉状態
const showDetails = ref(false);

// 開閉トグル
const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>
