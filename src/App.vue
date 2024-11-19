<template>
  <Table :header="colData" :content="rowData" />
</template>

<script setup>
import Table from './components/TableComponent.vue';

const colData = [
  { name: "番号" },
  { name: "正誤" },
  { name: "問題" }
];

const rowData = [
  { id: 1, correction: "correct", question: "arrow-right-ring" },
  { id: 2, correction: "correct", question: "arrow-right-ring" },
  { id: 3, correction: "incorrect", question: "arrow-right-ring" },
  { id: 4, correction: "incorrect", question: "arrow-right-ring" },
];
</script>
