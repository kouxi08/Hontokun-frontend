<template>
  <div>
    <!-- true_or_falseタイプ -->
    <Explain
      type="true_or_false"
      answer="true"
      explanation="「台風15号」など台風番号で調べることでより検索しやすくなります。「関東」「接近」で関東に接近した台風の情報が検索で出てきやすくなります。"
      keyword="台風15号　関東　接近"
    />

    <Explain
      type="true_or_false"
      answer="false"
      explanation="「台風15号」など台風番号で調べることでより検索しやすくなります。「関東」「接近」で関東に接近した台風の情報が検索で出てきやすくなります。"
      keyword="台風15号　関東　接近"
    />

    <!-- multiple_choiceタイプ -->
    <Explain
      type="multiple_choice"
      answer="true"
      explanation="「台風15号」など台風番号で調べることでより検索しやすくなります。「関東」「接近」で関東に接近した台風の情報が検索で出てきやすくなります。"
      keyword="台風15号 関東 接近"
    />
  </div>
</template>

<script setup>
import Explain from './components/ExplainComponent.vue';
import News from "./components/NewsComponent.vue"

</script>
