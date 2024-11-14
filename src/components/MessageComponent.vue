<template>
  <div class="mx-6">
    <div :class="positionClasses">
      <slot />
    </div>
  </div>
</template>
  
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    position: {
      type: String,
      default: 'bottom', // 'top', 'middle', or 'bottom'
      validator: (value) => ['top', 'middle', 'bottom'].includes(value)
    }
  });
  
  const positionClasses = computed(() => {
    const baseClasses = "w-full h-32 border-[3px] border-primary rounded-[24px] shadow-[4px_4px_2px_0_rgba(0,0,0,0.4)] flex justify-center items-center";
  
    const positionStyles = {
      top: 'absolute top-[172px]',
      middle: 'absolute top-[calc(50%-64px)]', // Half of 852px minus half the height (32px)
      bottom: 'absolute bottom-[172px]'
    };
  
    return `${baseClasses} ${positionStyles[props.position] || ''}`;
  });
  </script>
  
  <style scoped>
  .mx-6 {
    position: relative;
    height: 852px; /* Container height to enable proper positioning */
  }
  </style>
  