<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-50">
    <CardComponent
      icon-name="風呂敷ネコ"
      icon-image="/furoshiki.png"
      :accuracy="40"
      :attempts="attemptData"
    />
  </div>
</template>

<script setup>
import CardComponent from './components/CardComponent.vue';

// 渡すデータ
const attemptData = [
  { timeAgo: "3分前", accuracy: 85 },
  { timeAgo: "2時間前", accuracy: 42 },
  { timeAgo: "3時間前", accuracy: 50 },
];
</script>
