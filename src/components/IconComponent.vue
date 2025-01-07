<template>
  <img :src="src" alt="icon" :width="props.width" :height="props.height">
</template>

<script setup>
  const props = defineProps({
    name: {
      type: String,
      default: "",
    },

    width: {
      type: Number,
      default: 16,
    },
    height: {
      type: Number,
      default: 16,
    },
  });

  const src = "/icons/" + props.name + ".svg";
</script>
