<template>
  <footer class="bg-white  flex flex-col  items-center">
    <div class="flex items-center justify-center mb-6 p-[4px] rounded-[8px] hover:bg-gray-200 cursor-pointer">
      <span class="text-black font-zenMaru" @click="pageTop">ページのトップに戻る</span>
      <Icon name="arrow-up" width=8 height=8 />
    </div>
    <span class="text-[#999999] text-[10px] pb-[24px]">Copyright© 1000yen All Rights Reserved.</span>
  </footer>
</template>

<script setup>
import Icon from './IconComponent.vue';

const pageTop = () => {

  window.scrollTo({

    top: 0,

    behavior: 'smooth'

  })
}
</script>
