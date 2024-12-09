<template>
  <!-- name,age,date,email,password,report -->
  <Input type="name" />
  <Input type="age" />
  <Input type="date" />
  <Input type="email" />
  <Input type="password" />
  <Input type="report" />
  <Input type="textarea" />
  <Input type="text" placeholder="説明" modelValue=""/>

  
  
</template>

<script setup>
import Input from "./components/InputComponent.vue";
</script>

<style scoped>
/* 必要に応じてスタイルをカスタマイズ */
</style>
