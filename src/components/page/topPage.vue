<template>
  <div class="w-screen h-full">
    <Header />
    <div class="relative w-fit h-fit my-[64px] mx-auto">
      <img src="/NewsPaper.png" alt="NewsPaper">
      <div class="rotate-container absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
        <img src="/MagnifyingGlass.svg" alt="MagnifyingGlass" class="circle-animation">
      </div>
    </div>
    <img src="/Logo.svg" alt="Logo" class="my-[56px] mx-auto">
    <Button
      color="primary" size="lg" class="flex items-center justify-center mx-auto my-[56px]"
      @click="anonymousLogin">
      今すぐ挑戦
    </Button>
    <div class="py-[104px]">
      <p
        class="text-center text-white stroke-accent-4 font-zenMaru text-[32px] font-black mx-[24px] my-[56px] leading-[48px]">
        フェイクニュースに<br>騙されていませんか？</p>
      <p class="text-[18px] font-zenMaru font-black text-center leading-[48px] mb-[72px]">
        日本での調査では
        <span class="bg-accent rounded-[8px] p-[4px] mx-[4px] text-white stroke-black-2">４人中３人</span>は、<br>
        騙されている可能性があり<br>
        その中の半分の人は偽の情報を知らぬ間に<br>
        拡散してしまっています。
      </p>

      <p class="text-[18px] font-zenMaru font-black text-center leading-[48px]">
        フェイクニュースは、
        <span class="bg-accent rounded-[8px] p-[4px] text-white stroke-black-2">世代とは関係なく</span><br>
        騙され、拡散されています。<br>
        だから<br>
        ちゃんとした知識を身に着け<br>
        フェイクニュースに
      </p>
      <p
        class="text-primary text-[20px] font-zenMaru font-black text-center stroke-black-2 my-[24px]"
      >
        騙されない、見抜く力をつけてほしい
      </p>
    </div>
    <div class="bg-primary w-fit mx-auto rounded-[12px] my-[56px]">
      <p
        class="font-zenMaru font-black  text-[20px] text-center text-white stroke-braun py-[8px] px-[16px] stroke-braun-4">
        キャラクターデザイン
      </p>
    </div>
    <div class="mb-[240px]">
      <p class="font-black font-zenMaru text-[20px] text-center my-[16px]">
        {{ cats[index].name }}
      </p>
      <div class="flex transition duration-150 ease-in-out">
        <img
          :src="cats[previousCat(index)].img" :alt="cats[previousCat(index)].name"
          class="w-[64px] object-contain animate-pulse cursor-pointer" @click="index = previousCat(index)">
        <img :src="cats[index].img" :alt="cats[index].img" class="mx-auto">
        <img
          :src="cats[nextCat(index)].img" :alt="cats[nextCat(index)].name"
          class="w-[64px] object-contain animate-pulse cursor-pointer" @click="index = nextCat(index)">
      </div>
      <p class="font-zenMaru text-[14px] font-bold text-center m-[24px] leading-[32px]">
        {{ cats[index].description }}
      </p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from '../HeaderComponent.vue'
import Footer from '../FooterComponent.vue'
import Button from '../ButtonComponent.vue'
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()

onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push({ name: "mainPage" });
  }
})

const anonymousLogin = () => {
  signInAnonymously(auth)
    .then(() => {
      router.push({ name: "mainPage" });
    })
}

  const cats = [
    {
      name: "ホントくん",
      img: "/hontokun.png",
      description:
        "我らが主人公ホントくん！今まで難解な事件を解決してきた敏腕探偵ねこ。魚を盗む元泥棒ねこ。",
    },
    {
      name: "ふろしきねこ",
      img: "/hurosiki.png",
      description: "悪いことはまだしたことのない初心者ふろしきねこ。ふろしきの中身は誰も知らない。",
    },
    {
      name: "ハットねこ",
      img: "/hat.png",
      description: "営業職で顔の広く、話しやすい気性のハットねこ。元ホントくんの相棒だったとか…",
    },
    {
      name: "はまきねこ",
      img: "/hamaki.png",
      description:
        "主に活動するのは夜のため目が光るはまきねこ。吸っているはまきは、セリバ・オリエ・Y。",
    },
    {
      name: "ボスねこ",
      img: "/boss.png",
      description: "できる悪いことは全てしてきたボスねこ。はまきを吸っているのはかっこいいから。",
    },
  ];

  const index = ref(0);

  const previousCat = (index) => {
    if (index === 0) {
      return cats.length - 1;
    } else {
      return index - 1;
    }
  };

  const nextCat = (index) => {
    if (index === cats.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  };
</script>

<style>
  @keyframes circular-motion {
    from {
      transform: translate(50%, -50%) rotate(0deg) translateX(80px) rotate(0deg);
    }

    to {
      transform: translate(50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg);
    }
  }

  .slide {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .slide.active {
    opacity: 1;
    transform: translateY(0);
  }

  .circle-animation {
    animation: circular-motion 4s linear infinite;
  }

  .rotate-container {
    transform: rotate(-30deg);
  }
</style>
