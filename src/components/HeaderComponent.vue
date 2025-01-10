<template>
  <header
    class="bg-primary text-black shadow-md font-zenMaru rounded-b-lg h-[88px] w-full px-[24px] py-[8px]"
  >
    <div class="w-full h-full flex items-end justify-between">
      <div class="flex items-center gap-[8px]">
        <p class="text-[10px] font-bold">ニュース探偵</p>
        <p class="text-[24px] font-bold">ホントくん</p>
      </div>
      <Button size="xs" to="loginPage">ログイン</Button>
    </div>
  </header>
</template>

<script setup>
  import Button from "../components/ButtonComponent.vue";
</script>
