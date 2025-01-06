<template>
  <div>
    <!-- 画像表示エリア -->
    <div v-if="currentImage" class="relative inline-block">
      <img :src="currentImage" alt="Level Image" class="w-16 h-16" />
      <div
        class="text-shadow font-zenMaru text-[24px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
      >
        {{ level }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, getCurrentInstance } from "vue";

  // 現在のインスタンスからスロットを取得
  const instance = getCurrentInstance();
  const slots = instance?.slots;

  const level = computed(() => {
    const slotContent = slots?.default ? slots.default()[0]?.children : null;
    return Number(slotContent) || 0; // スロットが無い場合はデフォルトで0
  });

  const images = [
    "/icons/level_brown.svg", // 画像パス1
    "/icons/level_silver.svg", // 画像パス2
    "/icons/level_gold.svg", // 画像パス3
    "/icons/level_purple.svg", // 画像パス4
    "/icons/level_red.svg", // 画像パス5
  ];

  // レベルに応じた画像を取得
  const currentImage = computed(() => {
    const imageIndex = Math.floor(level.value / 5);
    return images[imageIndex] || 25;
  });
</script>

<style>
  .text-shadow {
    text-shadow:
      1px 1px 0 #000,
      -1px -1px 0 #000,
      -1px 1px 0 #000,
      1px -1px 0 #000,
      0px 1px 0 #000,
      0 -1px 0 #000,
      -1px 0 0 #000,
      1px 0 0 #000;
  }
</style>
