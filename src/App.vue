<template>
  <div v-if="isPageLoaded">
    <router-view />
  </div>
  <div v-else>
    <LoadingPage />
  </div>
</template>

<script setup>
import { firebase } from "./firebase.js"
import LoadingPage from "@/components/page/loadingPage.vue"
import { ref, onMounted } from "vue"

const isPageLoaded = ref(false)

onMounted(() => {
  window.onload = () => {
    isPageLoaded.value = true
  }
})
</script>
