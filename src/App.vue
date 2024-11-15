<template>
  <Message>
    ようこそ!<br>
    $user_name探偵事務所へ<br>
    僕は助手のホントくん<br>
    よろしくね！
  </Message>
</template>

<script setup>
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';
import Message from './components/MessageComponent.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
