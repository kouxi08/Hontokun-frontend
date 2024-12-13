<template>
  <div class="flex justify-center items-center">
    <!-- 入力フィールド (テキスト) -->
    <div v-if="isTextFieldType">
      <!-- 通常のテキスト入力 -->
      <input
        :id="type"
        v-model="inputValue"
        type="text"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholderMap[type] || placeholder || ''"
      />
    </div>

    <!-- 入力フィールド (数値) -->
    <div v-else-if="type === 'age'">
      <input
        id="age"
        v-model.number="inputValue"
        type="number"
        min="0"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || '年齢'"
      />
    </div>

    <!-- 入力フィールド (日付) -->
    <div v-else-if="type === 'date'">
      <!-- 読み取り専用のテキストボックスで日付を表示 -->
      <input
        id="date"
        v-model="formattedDate"
        type="text"
        readonly
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black cursor-pointer px-2"
        :placeholder="placeholder || '生年月日'"
        @click="toggleDatePicker"
      />
      <!-- 日付ピッカーコンポーネント -->
      <div v-if="isDatePickerVisible" class="mt-4">
        <DatePickerComponent
          @dateSelected="handleDateSelected"
          @close="toggleDatePicker"
        />
      </div> 
    </div>

    <!-- 入力フィールド (パスワード) -->
    <div v-else-if="type === 'password'">
      <input
        id="password"
        v-model="inputValue"
        type="password"
        class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || 'パスワード'"
      />
    </div>
    
    <!-- 入力フィールド (テキストエリア) -->
    <div v-else-if="type === 'textarea'">
      <!-- 大きな入力領域が必要な場合 -->
      <textarea
        id="textarea"
        v-model="inputValue"
        class="w-[240px] h-[184px] border rounded-[6px] focus:outline-none focus:border-black px-2"
        :placeholder="placeholder || '詳しい内容を教えてください'"
      ></textarea>
    </div>
    
    <!-- その他のフィールド (デフォルト) -->
    <input
      v-else
      :id="type"
      v-model="inputValue"
      :type="type"
      class="w-[240px] h-[40px] border rounded-[6px] focus:outline-none focus:border-black"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"; 
import DatePickerComponent from "./DatePickerComponent.vue"; 

// ==== プロパティの設定 ====
const props = defineProps({
  type: {
    type: String,
    required: true, // フィールドの種類を指定する必須プロパティ
  },
  placeholder: {
    type: String,
    default: "", // プレースホルダー (ヒントテキスト)
  },
  modelValue: {
    type: [String, Number, Object],
    default: "", // 親コンポーネントとのデータバインディング用値
  },
});

// 親コンポーネントへのイベントを起こすための設定
const emit = defineEmits(["update:modelValue"]);

// ==== ローカル状態管理 ====
const inputValue = ref(props.modelValue); // 入力値を保持するローカル変数
const isDatePickerVisible = ref(false); // 日付ピッカーの表示状態
const selectedDate = ref(null); // 選択された日付

// フォーマット済みの日付文字列を計算 (年/月/日形式)
const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  return `${selectedDate.value.year} / ${selectedDate.value.month} / ${selectedDate.value.date}`;
});

// テキストフィールドの種類を判定 (例: name, email, report)
const isTextFieldType = computed(() =>
  ["name", "email", "report"].includes(props.type)
);

// テキストタイプごとのデフォルトプレースホルダー
const placeholderMap = {
  name: "なまえ",
  email: "メールアドレス",
  report: "不適切な部分について",
};

// ==== 日付ピッカーの制御 ====
const toggleDatePicker = () => {
  isDatePickerVisible.value = !isDatePickerVisible.value; // 表示/非表示を切り替える
};

// 日付ピッカーで選択された値を処理する
const handleDateSelected = (newDate) => {
  selectedDate.value = newDate; // 選択された日付を保持
  inputValue.value = formattedDate.value; // フォーマット済みの文字列を入力値に設定
  isDatePickerVisible.value = false; // 日付ピッカーを閉じる
};

// ==== 親コンポーネントとの同期 ====
watch(inputValue, (newValue) => {
  // 入力値が変更されたときに親へ通知
  emit("update:modelValue", newValue);
});

// 親の値が更新された場合にローカル値を更新
watch(
  () => props.modelValue,
  (newModelValue) => {
    inputValue.value = newModelValue;
  }
);
</script>
