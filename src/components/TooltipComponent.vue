<template>
  <div class="absolute z-50">
    <div v-show="visibleTooltip" @click="visibleTooltip = false">
      <Icon name="tooltip" width=24 height=24 />
    </div>
    <div
      v-show="!visibleTooltip"
      class="w-[320px] h-[180px] bg-[#FFFCF8] shadow-[0_0_4px_0_rgba(171,171,171,0.25)] rounded-[12px] relative"
    >
      <Icon 
        name="close-circle" width="24" height="24" 
        class="absolute top-0 left-0 m-[8px]" 
        @click="visibleTooltip = true"
      />
      <p class="font-zenMaru text-[20px] flex items-start justify-center mx-[16px] pt-[48px]">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script setup>
import Icon from './IconComponent.vue'
import { ref } from 'vue'
const visibleTooltip = ref(true)
</script>
