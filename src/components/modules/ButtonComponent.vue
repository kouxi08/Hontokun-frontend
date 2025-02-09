<template>
  <button :class="buttonClasses" :disabled="props.disabled" @click="routeTo(props.to)">
    <slot></slot>
  </button>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const props = defineProps({
    color: {
      type: String,
      default: "default",
      validator: (value) => ["default", "primary", "secondary", "accent", "danger"].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["xs", "sm", "md", "lg"].includes(value),
    },
    to: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const buttonClasses = computed(() => {
    const baseClasses =
      "pt-[4px] pr-[16px] pb-[4px] pl-[16px] font-zenMaru shadow-button rounded-[8px] focus:outline-none focus:ring disabled:cursor-not-allowed";

    const colorClasses = {
      default:
        "bg-[#FDFDFD] hover:bg-[#F3F3F3] focus:bg-[#EDEDED] disabled:bg-[#C5C5C5] focus:ring-primary",
      primary:
        "bg-primary hover:bg-[#FFD000] stroke-white-2 focus:bg-[#E6C222] disabled:bg-[#FFEB8C] focus:ring-accent",
      secondary:
        "bg-secondary hover:bg-[#26A0B1] stroke-white-2 focus:bg-[#3C93A0] disabled:bg-[#A3C6CB] focus:ring-primary",
      accent:
        "bg-accent hover:bg-[#EC5D2D] stroke-white-2 focus:bg-[#D3552A] disabled:bg-[#FDB198] focus:ring-primary",
      danger:
        "bg-danger hover:bg-[#E02B2B] stroke-white-2 focus:bg-[#D11717] disabled:bg-[#E09F9F] focus:ring-primary",
    };

    const sizeClasses = {
      xs: "text-[14px] font-bold",
      sm: "text-[16px] font-bold",
      md: "text-[20px] font-bold",
      lg: "text-[24px] font-bold",
    };

    return `${baseClasses} ${colorClasses[props.color]} ${sizeClasses[props.size]}`;
  });

  const routeTo = (to) => {
    router.push({ name: to });
  };
</script>
