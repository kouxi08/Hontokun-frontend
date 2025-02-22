<template>
  <div v-if="loading" class="w-screen h-screen">
    <div class="bg-detective-offices">
      <Status />
      <Message class="mt-[5%] mx-[24px]" :messages="messages" />
      <img :src="costume" alt="" class="mx-auto my-[16px] xs:w-[128px] md:w-[192px]">
      <button
        class="w-[136px] h-[136px] bg-[#FF6633] rounded-full text-white text-[32px] border-4 border-white flex items-center justify-center font-black font-zenMaru shadow-[0_0_4px_0_rgba(171,171,171,0.25)] mx-auto mt-[120px] hover:translate-y-[2px] md:mt-[32px] lg:mt-[40px]"
        @click="router.push({ name: 'modePage' })">
        クイズ
      </button>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Status from "@/components/modules/StatusComponent.vue"
import Icon from "@/components/modules/IconComponent.vue";
import Message from "@/components/modules/MessageComponent.vue";
import LoadingPage from "@/components/pages/loadingPage.vue";
import AxiosInstance from "@/axiosInstance.js";
import { useUserStore } from "@/stores/User";
import { getAuth } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const auth = getAuth();
const router = useRouter();
const user = ref({});
const costume = ref("");
const loading = ref(false);
const messages = ref([]);
const userStore = useUserStore();

onMounted(async () => {
  try {
    if (auth.currentUser?.isAnonymous) {
      const gestUserData = {
        nickname: "ゲスト",
        level: 1,
        experience: 0
      }
      userStore.setUser(gestUserData);
      costume.value = "/honto.svg";
      loading.value = true;
    } else {
      const main = await AxiosInstance.get("/main");
      await userStore.setUser(main.data.user);
      costume.value = main.data.costume.url;
      loading.value = true;
    }
    messages.value = [
      `ようこそ！\n${userStore.name}探偵事務所へ\n僕は助手のホントくん\nよろしくね！`,
    ];

  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }
});
</script>

<style>
.bg-detective-offices {
  width: 100%;
  height: 100%;
  background-image: url(../../../public/detective-offices.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
