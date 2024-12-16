<template>
  <div
    class="flex flex-col items-center w-[300px] border border-gray-300 rounded-lg overflow-hidden transition-all duration-300"
    :class="{ 'h-[400px]': showDetails, 'h-[112px]': !showDetails }"
    @click="toggleDetails"
  >
    <!-- アコーディオンのヘッダー -->
    <div
      class="flex justify-between items-center w-full h-full px-4 cursor-pointer"
    >
      <!-- 画像 -->
      <img 
        :src="iconImage" 
        alt="ネコ画像" 
        class="w-12 h-12 rounded-full object-cover"
      />
      <!-- 名前 -->
      <p class="text-sm leading-4 text-center">
        {{ iconName.split('ネコ')[0] }}
        <br />
        ネコ
      </p>
      <!-- Rate -->
      <div class="h-full flex items-center justify-center">
        <Rate 
          :value="accuracy" 
          size="md" 
          color="default" 
        />
      </div>
      <!-- アイコン -->
      <Icon v-if="showDetails" name="card_close" width="24" height="24" />
      <Icon v-if="!showDetails" name="card_open" width="24" height="24" />
    </div>

    <!-- アコーディオンの詳細 -->
    <div
      v-if="showDetails"
      class="w-full p-4 flex flex-col gap-4 transition-opacity duration-300"
    >
      <!-- 詳細カードを繰り返し表示 -->
      <div
        v-for="(attempt, index) in attempts"
        :key="index"
        class="flex justify-between items-center w-full h-[80px] border border-gray-300 rounded-lg px-4 py-2"
      >
        <p class="font-zenMaru text-[#808080] text-[16px] w-[80px]">{{ attempt.timeAgo }}</p>
        <Rate 
          v-if="attempt.accuracy < 50"
          :value="attempt.accuracy" 
          size="sm" 
          color="danger" 
        />
        <Rate 
          v-else
          :value="attempt.accuracy" 
          size="sm" 
          color="secondary" 
        />
        <Icon name="card-right" width="24" height="24" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Rate from "./RateComponent.vue";
import Icon from "./IconComponent.vue"

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