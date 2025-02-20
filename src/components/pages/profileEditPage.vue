<template>
  <div v-if="loading" class="w-screen h-screen bg-[#FFFCF8]">
    <div class="w-full grid grid-cols-3 justify-between items-center pt-[32px] px-[48px]">
      <Icon name="arrow-left-line" width="32" height="32" class="justify-self-start cursor-pointer"
        @click="router.push({ name: 'profilePage' })" />
      <p class="font-zenMaru font-medium text-[16px] text-center">{{ name }}</p>
    </div>
    <div class="flex items-center justify-center gap-[48px] pt-[32px]">
      <Icon name="arrow-left" width="8" @click="previousCostume" class="cursor-pointer" />
      <Icon v-if="!costume[currentIndex].isOwned" name="lock" width="48" class="absolute z-50" />
      <img :src="costume[currentIndex].url" alt="" height="120"
        :class="costume[currentIndex].isOwned ? null : 'blur-md'">
      <Icon name="arrow-right" width="8" @click="nextCostume" class="cursor-pointer" />
    </div>
    <p class="text-center font-zenMaru font-medium text-[24px] pt-[16px]">{{ costume[currentIndex].name }}</p>
    <div class="px-[72px] pt-[32px]">
      <div class="flex flex-col items-start justify-center">
        <label for="name" class="text-[16px] font-zenMaru py-[16px]">名前の変更</label>
        <Input type="name" v-model="name" :placeholder="userStore.name" />
      </div>
      <div class="flex flex-col items-start justify-center">
        <div class="flex gap-[16px] justify-start items-center py-[16px]">
          <label for="date" class="text-[16px] font-zenMaru">生年月日</label>
          <p class="bg-[#42D325] text-white rounded-[4px] font-zenMaru text-center px-[8px]">任意</p>
        </div>
        <VueDatePicker v-model="date" locale="ja" format="yyyy/M/d" :enable-time-picker="false"
          :text-input="textInputOptions" placeholder="2000/1/1" week-start="0" auto-apply no-today
          class="rounded-[6px] border border-black font-zenMaru focus:outline-none" />
        <Button color="primary" size="sm" :disabled="isButtonDisabled" class="w-full mt-[48px]"
          @click="save">保存</Button>
      </div>
    </div>
  </div>
  <LoadingPage v-else />
</template>

<script setup>
import Icon from "@/components/modules/IconComponent.vue";
import Button from "@/components/modules/ButtonComponent.vue";
import Input from "@/components/modules/InputComponent.vue";
import LoadingPage from "@/components/pages/loadingPage.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import dayjs from 'dayjs';
import axiosInstance from "@/axiosInstance.js";
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/User";

const router = useRouter();
const userStore = useUserStore();

const name = ref("")
const date = ref("")
const loading = ref(false)
const isButtonDisabled = ref(false);

const textInputOptions = {
  format: 'yyyy/M/d'
};

const costume = ref()
const costumeId = ref()
const current = ref()
const currentIndex = ref(0)

onMounted(async () => {
  const profile = await axiosInstance.get("/profile")
  costume.value = profile.data.costumeList
  name.value = profile.data.profile.nickname
  date.value = profile.data.profile.birthday
  const costumeList = profile.data.costumeList.find(item => item.isSelected === true)
  costumeId.value = costumeList.id
  currentIndex.value = profile.data.costumeList.findIndex(item => item.isSelected === true)
  loading.value = true
});


const previousCostume = () => {
  currentIndex.value--
  if (currentIndex.value <= -1) {
    currentIndex.value = costume.value.length - 1
  }
  if (!costume.value[currentIndex.value].isOwned) {
    costumeId.value = costume.value[currentIndex.value].id
  }
}

const nextCostume = () => {
  currentIndex.value++
  if (currentIndex.value >= costume.value.length) {
    currentIndex.value = 0
  }
  if (!costume.value[currentIndex.value].isOwned) {
    costumeId.value = costume.value[currentIndex.value].id
  }
}

const save = async () => {
  isButtonDisabled.value = true;
  const res = await axiosInstance.put("/profile", {
    nickname: name.value,
    birthday: dayjs(date.value).format('YYYY-MM-DD'),
    costumeId: costumeId.value
  });
  isButtonDisabled.value = false;
  router.push({ name: "profilePage" })
}
</script>

<style>
.dp__input {
  font-family: "Zen Maru Gothic", serif;
}

.dp__instance_calendar {

  font-family: "Zen Maru Gothic", serif;
}
</style>
