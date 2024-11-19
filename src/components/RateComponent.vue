<template>
  <svg :width="sizeInPixels" :height="sizeInPixels" viewBox="0 0 100 100">
    <!-- プログレスバー -->
    <circle class="progress-ring-circle" cx="50" cy="50" :r="radius" :stroke-width="strokeWidth"
      :stroke-dasharray="circumference" :stroke-dashoffset="strokeDashoffset" stroke="#FFDA29" />
    <!-- 中央の円 -->
    <circle class="center-circle" cx="50" cy="50" :r="centerCircleRadius" :fill="currentColor" />
    <!-- 数値表示 -->
    <text x="50" y="50" text-anchor="middle" dominant-baseline="central" :class="textClass">
      {{ value }}
    </text>
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  color: {
    type: String,
    default: 'default'
  }
});

const sizeMap = {
  sm: 64,
  md: 80,
  lg: 96
};

const sizeInPixels = computed(() => sizeMap[props.size]);

const strokeWidth = computed(() => sizeInPixels.value * 0.14); // 14% of size
const radius = computed(() => 50 - strokeWidth.value / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const strokeDashoffset = computed(() =>
  circumference.value - (props.value / 100) * circumference.value
);
const centerCircleRadius = 32; // 80% of size, divided by 2 for radius

const colorMap = {
  default: '#4D4D4D',
  secondary: '#33B1C2',
  danger: '#F53030'
};

const currentColor = computed(() => colorMap[props.color] || colorMap.default);

const textClass = computed(() => {
  return {
    'progress-text': true,
    'font-zenMaru': true,
    'font-[1200]': true,
    'text-sm': props.size === 'sm',
    'text-md': props.size === 'md',
    'text-lg': props.size === 'lg'
  };
});
</script>

<style scoped>
.progress-ring-circle {
  fill: none;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.35s;
}

.progress-text {
  font-weight: 900;
  fill: white;
}

.text-sm {
  font-size: 20px;
}

.text-md {
  font-size: 24px;
}

.text-lg {
  font-size: 28px;
}
</style>
