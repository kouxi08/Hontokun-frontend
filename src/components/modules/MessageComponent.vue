<template>
  <div
    class="mx-[32px] border-[3px] border-primary rounded-[24px] leading-[1.7rem] shadow-button flex justify-center p-[16px] items-center text-center bg-white font-zenMaru font-bold whitespace-pre-wrap animate-fadeIn">
    {{ messages[currentMessage] }}
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const props = defineProps({
    messages: {
      type: Array,
      required: true,
    },
  });

  const currentMessage = ref(0);

  setTimeout(() => {
    if (currentMessage.value !== props.messages.length - 1) {
      currentMessage.value++;
    }
  }, 3000);
</script>
