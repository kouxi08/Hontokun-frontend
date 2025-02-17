<template>
  <input :type="props.type" :placeholder="props.placeholder" v-model="model"
    class="w-full xs:h-[40px] md:h-[56px] border border-black font-zenMaru font-medium text-[16px] rounded-[6px] px-[8px] focus:outline-none"
    @click="handleClick" value="selectedDate">
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const model = defineModel()

</script>
