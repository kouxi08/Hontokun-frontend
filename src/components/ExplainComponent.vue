<template>
  <div class="font-zenMaru mx-[48px] p-[16px] shadow-lg rounded-[6px] flex flex-col">
    <!-- ヘッダー部分 -->
    <div class="w-full h-[40px] grid grid-cols-3 justify-between items-center top-4">
      <Icon  
        name="card-left" 
        width="24" 
        height="24" 
      />
      <p class="font-bold text-[16px] text-center">解説</p>
      <Button size="xs" color="danger" class="justify-self-end">報告</Button>
    </div>

    <!-- 正解ボックス -->
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[24px]">
      <p class="justify-self-start font-bold text-white text-[16px] bg-accent py-[4px] px-[8px] rounded-[8px]">
        正解
      </p>
      <Icon 
        class="justify-self-center"
        name="correct" 
        width="24" 
        height="24" 
      />
      <a class="justify-self-end text-blue-500 text-[12px] font-bold" href="example.com">
        ニュース記事へ
      </a>
    </div>
    

    <!-- 検索ワード表示 -->
    <div class="mt-[32px] flex items-center justify-between border rounded-full p-[8px] shadow">
      <p class="text-black font-bold text-[12px] px-[8px] flex-1">
        {{ hintword }}
      </p>
      <button 
        class="bg-primary text-black font-bold text-[14px] py-[6px] px-[16px] rounded-full shadow"
        @click="searchGoogle"
      >
        検索
      </button>
    </div>

    <!-- 説明テキスト -->
    <p class="mt-[32px] font-bold text-[12px] tracking-wider leading-[32px]">
      {{ props.content }}
    </p>
  </div>
</template>

<script setup>
import Button from './ButtonComponent.vue';
import Icon from './IconComponent.vue';

const props = defineProps({
  content: {
    type: String,
    default: ""
  },
  hintword: {
    type: String,
    default: ''
  }
});

function searchGoogle() {
  const query = encodeURIComponent(props.hintword); // URLエンコード
  const googleSearchUrl = `https://www.google.com/search?q=${query}`;
  window.open(googleSearchUrl, "_blank"); // 新しいタブで検索ページを開く
}
</script>