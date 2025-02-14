<template>
  <component :is="inputComponent" :id="type" v-model="inputValue" :type="inputType" :class="inputClass"
    :placeholder="computedPlaceholder" v-bind="$attrs" @click="handleClick" />
  <DatePickerComponent v-if="isDatePickerVisible" class="mt-4" @date-selected="handleDateSelected"
    @close="toggleDatePicker" />
</template>

<script setup>
import { ref, computed, watch } from "vue";
import DatePickerComponent from "@/components/modules/DatePickerComponent.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
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

const inputValue = ref(props.modelValue);
const isDatePickerVisible = ref(false);
const selectedDate = ref(null);

const inputComponent = computed(() => {
  const componentMap = {
    textarea: 'textarea',
    default: 'input'
  };
  return componentMap[props.type] || componentMap.default;
});

const inputType = computed(() => {
  const typeMap = {
    age: 'number',
    password: 'password',
    date: 'text',
    default: 'text'
  };
  return typeMap[props.type] || typeMap.default;
});

const inputClass = computed(() => {
  const baseClass = "border rounded-[6px] focus:outline-none focus:border-black px-2 m-0";
  const sizeClass = props.type === 'textarea' ? "w-[240px] h-[184px]" : "w-full h-[40px]";
  return `${baseClass} ${sizeClass}`;
});

const placeholderMap = {
  name: "なまえ",
  email: "example@gmail.com",
  report: "不適切な部分について",
  age: "年齢",
  date: "生年月日",
  password: "6文字以上のパスワード",
  textarea: "詳しい内容を教えてください",
};

const computedPlaceholder = computed(() => props.placeholder || placeholderMap[props.type] || "");

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const { year, month, date } = selectedDate.value;
  return `${year} / ${month} / ${date}`;
});

const handleClick = () => {
  if (props.type === 'date') {
    toggleDatePicker();
  }
};

const toggleDatePicker = () => {
  isDatePickerVisible.value = !isDatePickerVisible.value;
};

const handleDateSelected = (newDate) => {
  selectedDate.value = newDate;
  inputValue.value = formattedDate.value;
  isDatePickerVisible.value = false;
};

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(() => props.modelValue, (newModelValue) => {
  inputValue.value = newModelValue;
});
</script>
