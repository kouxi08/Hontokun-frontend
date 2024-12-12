<template>
  <div>
    <!-- 年月選択画面 -->
    <div v-if="step === 'year-month'">
      <div class="header">
        <button @click="prevYear">‹</button>
        <select
          v-model="selectedYear"
          @change="handleYearChange"
          class="year-selector"
        >
          <option v-for="year in yearRange" :key="year" :value="year">
            {{ year }}年
          </option>
        </select>
        <button @click="nextYear">›</button>
      </div>
      <div class="months-grid">
        <button
          v-for="(month, index) in months"
          :key="index"
          @click="selectMonth(index + 1)"
          class="month-button"
        >
          {{ month }}
        </button>
      </div>
    </div>

    <!-- カレンダー表示 -->
    <div v-if="step === 'calendar'">
      <div class="header">
        <button @click="goBack">‹</button>
        <span>{{ selectedYear }}年 {{ selectedMonth }}月</span>
      </div>
      <div class="calendar">
        <!-- 曜日のヘッダー -->
        <div class="calendar-header">
          <div v-for="(day, index) in weekdays" :key="index" class="weekday">
            {{ day }}
          </div>
        </div>

        <!-- 日付の表示 -->
        <div class="calendar-grid">
          <div v-for="(date, index) in calendarDates" :key="index">
            <button
              v-if="date"
              @click="selectDate(date)"
              class="date-button"
            >
              {{ date }}
            </button>
            <div v-else class="empty-slot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// イベントを定義
const emit = defineEmits(["dateSelected"]);

// データ
const step = ref("year-month"); // 現在のステップ
const selectedYear = ref(new Date().getFullYear()); // 選択された年
const selectedMonth = ref(null); // 選択された月
const selectedDate = ref(null); // 選択された日付
const yearRange = computed(() => {
  // 選択可能な年の範囲を動的に生成
  const startYear = 1900;
  const endYear = new Date().getFullYear() + 0; // 
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
});

const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const weekdays = ["日", "月", "火", "水", "木", "金", "土"]; // 曜日リスト

// 年月変更の処理
const prevYear = () => {
  selectedYear.value--;
};
const nextYear = () => {
  selectedYear.value++;
};
const selectMonth = (month) => {
  selectedMonth.value = month;
  step.value = "calendar"; // カレンダー表示に移行
};
const handleYearChange = () => {
  // カレンダーを更新するなどの処理をここに追加可能
  console.log("Year changed:", selectedYear.value);
};

// カレンダー作成
const calendarDates = computed(() => {
  if (!selectedYear.value || !selectedMonth.value) return [];
  const firstDay = new Date(selectedYear.value, selectedMonth.value - 1, 1);
  const lastDay = new Date(selectedYear.value, selectedMonth.value, 0);
  const dates = [];
  
  // 月初の曜日分の空白を追加
  for (let i = 0; i < firstDay.getDay(); i++) {
    dates.push(null);
  }

  // 日付を追加
  for (let date = 1; date <= lastDay.getDate(); date++) {
    dates.push(date);
  }

  // 次の月の空白を追加して行数をそろえる
  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

  return dates;
});

// 日付選択
const selectDate = (date) => {
  selectedDate.value = date;

  // イベントを発火
  emit("dateSelected", {
    year: selectedYear.value,
    month: selectedMonth.value,
    date,
  });

  step.value = "complete"; // 完了画面に移行
};

// リセット処理
const reset = () => {
  step.value = "year-month";
  selectedYear.value = new Date().getFullYear();
  selectedMonth.value = null;
  selectedDate.value = null;
};

// ステップを戻る
const goBack = () => {
  step.value = "year-month";
};
</script>

<style scoped>

.year-selector {
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  padding: 5px;
  background-color: #fff;
  cursor: pointer;
  appearance: none;
}

.year-selector:focus {
  outline: none;
  border-color: black;
}
/* 年月選択画面 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-weight: bold;
}

/* 月選択用グリッド */
.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}

.month-button {
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.month-button:hover {
  background-color: #f0f0f0;
}

/* カレンダーの曜日と日付 */

/* カレンダー全体のスタイル */
.calendar {
  width: 240px; /* 入力欄の幅と一致 */
  margin: 0 auto; /* 中央に配置 */
}

/* 曜日ヘッダー */
.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  width: 100%; /* カレンダー幅に合わせる */
}

/* カレンダーの日付グリッド */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  width: 100%; /* カレンダー幅に合わせる */
}

/* 日付ボタン */
.date-button {
  padding: 10px;
  border: none;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  width: 30px; /* 調整 */
  height: 30px; /* 調整 */
  line-height: 30px; /* ボタン中央に配置 */
}

.date-button:hover {
  background: #f0f0f0;
}

.weekday {
  padding: 5px;
}

.date-cell {
  text-align: center;
}

.date-button:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.empty-slot {
  height: 40px;
}
</style>
