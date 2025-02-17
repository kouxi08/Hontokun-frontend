<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center">
    <img src="/hontokun.png" alt="" class="animate-rotation pb-[32px]">
    <p class="stroke-braun-4 text-white font-zenMaru text-[24px]">ろーでぃんぐ</p>
    <Button v-if="visibleLogout" color="secondary" size="md" class="mx-auto mt-[24px]" @click="Logout">
      ログアウト
    </Button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"; // Firebase Authのインポート
import Button from "@/components/modules/ButtonComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = getAuth();
const visibleLogout = ref(false)

const Logout = async () => {
  try {
    await signOut(auth); // Firebaseからログアウト
    router.push({ name: "topPage" }); // ログアウト後にトップページにリダイレクト
  } catch (error) {
    console.error("ログアウト中にエラーが発生しました: ", error);
  }
};

setTimeout(() => {
  visibleLogout.value = true
}, 10000);

</script>

<style>
@keyframes rotation {
  from {
    transform: rotateY(-360deg);
  }

  to {
    transform: rotateY(0deg);
  }
}

.animate-rotation {
  animation: rotation 1s linear infinite;
}
</style>
