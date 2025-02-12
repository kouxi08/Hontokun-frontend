<template>
  <div
    class="absolute z-50 bg-white w-[160px] h-[160px] rounded-[24px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black shadow-button">
    <div>
      <p v-if="props.answer" class="font-zenMaru font-bold text-accent text-[32px] text-center">正解</p>
      <p v-else class="font-zenMaru font-bold text-secondary text-[32px] text-center">不正解</p>

      <Icon v-if="props.answer" name="correct" width="96" height="96" class="mx-auto" />
      <Icon v-else name="incorrect" width="96" height="96" class="mx-auto" />
    </div>
  </div>
</template>
<script setup>
import Icon from '@/components/modules/IconComponent.vue'
const props = defineProps({
  answer: {
    type: Boolean,
    require: true
  },
});
</script>
