<template>
  <div class="px-6 flex flex-col">
    <div :class="positionClasses">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  const props = defineProps({
    position: {
      type: String,
      default: "bottom", // 'top', 'middle', or 'bottom'
      validator: (value) => ["top", "middle", "bottom"].includes(value),
    },
  });

  const positionClasses = computed(() => {
    const baseClasses =
      "w-full h-32 px-8 border-[3px] border-primary rounded-[24px] shadow-[4px_4px_2px_0_rgba(0,0,0,0.4)] flex justify-start items-center text-left bg-white font-zenMaru font-bold";

    const positionStyles = {
      top: "mt-[50%]",
      middle: "mt-[100%]",
      bottom: "mt-auto mb-[50%]",
    };

    return `${baseClasses} ${positionStyles[props.position] || ""}`;
  });
</script>
