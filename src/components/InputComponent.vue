<template>
  <div class="flex justify-center items-center">
    <!-- 共通の text フィールド -->
    <div v-if="isTextType">
      <input
        :id="type"
        v-model="value"
        type="text"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholderMap[type] || placeholder || ''"
      >
    </div>

    <!-- 数値入力フィールド -->
    <div v-else-if="type === 'age'">
      <input
        id="age"
        v-model.number="value"
        type="number"
        min="0"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || '年齢'"
      >
    </div>

    <!-- 生年月日入力フィールド -->
    <div v-else-if="type === 'date'">
      <input
        id="date"
        v-model="formattedDate"
        type="text"
        readonly
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black cursor-pointer px-2"
        :placeholder="placeholder || '生年月日'"
        @click="toggleDatePicker"
      >
      <div v-if="showDatePicker" class="mt-4">
        <DatePickerComponent
          @dateSelected="handleDateSelected"
          @close="toggleDatePicker"
        />
      </div>
    </div>

    <!-- パスワード入力フィールド -->
    <div v-else-if="type === 'password'">
      <input
        id="password"
        v-model="value"
        type="password"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || 'パスワード'"
      >
    </div>
    
    <!-- レポート内容入力フィールド -->
    <div v-else-if="type === 'textarea'">
      <textarea
        id="reporttext"
        v-model="value"
        type="reporttext"
        class="w-[240px] h-[184px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || '詳しい内容を教えてください'"
      />
    </div>
    <!-- その他のフィールド -->
    <input
      v-else
      :id="type"
      v-model="value"
      :type="type"
      class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black"
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

// テキストタイプの判定
const isTextType = computed(() =>
  ["name", "email", "report"].includes(props.type)
);

// テキストタイプに応じたプレースホルダー
const placeholderMap = {
  name: "なまえ",
  email: "メールアドレス",
  report: "不適切な部分について"
};

// 日付ピッカーの表示を切り替え
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
};

// カスタム日付選択コンポーネントからデータを受け取る
const handleDateSelected = (selectedDate) => {
  date.value = selectedDate;
  value.value = formattedDate.value;
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