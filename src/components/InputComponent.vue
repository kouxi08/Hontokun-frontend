<template>
  <div class="flex justify-center items-center">
    <!-- <label :for="type" class="block text-sm font-medium text-gray-700">{{ label }}</label> -->
    
    <div v-if="type === 'name'">
      <!-- 名前 -->
      <input
        id="name"
        v-model="value"
        type="text"
        class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black"
        :placeholder="placeholder || 'なまえ'"
      >
    </div>

    <div v-else-if="type === 'age'">
      <!-- 年齢 -->
      <input
        id="age"
        v-model.number="value"
        type="number"
        min="0"
        class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black"
        :placeholder="placeholder || '年齢'"
      >
    </div>
    <!-- 生年月日 -->
    <div v-else-if="type === 'date'">
      <input
        id="date"
        v-model="formattedDate"
        type="text"
        readonly
        class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black cursor-pointer"
        :placeholder="placeholder || '生年月日'"
        @click="toggleDatePicker"
      >
      <div v-if="showDatePicker" class="mt-4">
        <DatePickerComponent @dateSelected="handleDateSelected" @close="toggleDatePicker" />
      </div>
    </div>

    <!-- メールアドレス -->
    <div v-else-if="type === 'email'">
      <input
        id="email"
        v-model="value"
        type="text"
        class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black cursor-pointer"
        :placeholder="placeholder || 'メールアドレス'"
      >
    </div>

    <!-- パスワード入力 -->
    <div v-else-if="type === 'password'">
      <input
        id="password"
        v-model="valuePassword"
        type="password"
        class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black"
        :placeholder="placeholderPassword || 'パスワード'"
      >
    </div>

    <div v-else-if="type === 'report'">
      <div class="flex flex-col items-center space-y-8">
        <input
          id="report"
          v-model="value"
          type="text"
          class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black cursor-pointer"
          :placeholder="placeholder || '不適切な部分について'"
        >
        <!-- <input
          id="report"
          v-model="value"
          type="text"
          class="w-[240px] h-[184px] border  rounded-[6px] focus:outline-none focus:border-black cursor-pointer"
          :placeholder="placeholder || '詳しい内容を教えてください'"
        > -->
        <!-- 2つ目の入力 -->
        <textarea
          id="report-detailed"
          v-model="valueDetailed"
          class="w-[240px] h-[184px] border rounded-[6px] focus:outline-none focus:border-black resize-none"
          :placeholder="placeholderDetailed || '詳しい内容を教えてください'"
        />
      </div>
    </div>

    <!-- その他 -->
    <input
      v-else
      :id="type"
      v-model="value"
      :type="type"
      class="w-[240px] h-[40px] border  rounded-[6px] focus:outline-none focus:border-black"
      :placeholder="placeholder"
    >


  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import DatePickerComponent from "./DatePickerComponent.vue";

// プロパティを定義
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Object],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue); // バインディング値
const showDatePicker = ref(false); // 日付ピッカーの表示制御
const date = ref(null); // 日付データ

// フォーマット済みの日付文字列
const formattedDate = computed(() => {
  if (!date.value) return "";
  return `${date.value.year} / ${date.value.month} / ${date.value.date}`;
});

// 日付ピッカーの表示を切り替え
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

// カスタム日付選択コンポーネントからデータを受け取る
const handleDateSelected = (selectedDate) => {
  date.value = selectedDate;
  value.value = formattedDate.value; // モデルに反映
  showDatePicker.value = false;
};

// `value` が変更されたときに親に通知
watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});

// `modelValue` が更新された場合に `value` を更新
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);
</script>

<style scoped>
/* 必要に応じてスタイルをカスタマイズ */
</style>
