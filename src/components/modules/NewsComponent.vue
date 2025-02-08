<template>
  <div class="w-full h-fit font-zenMaru flex flex-col">
    <div
      class="mx-[48px] p-[16px] h-[408px] bg-white shadow-lg rounded-[6px] flex flex-col gap-[16px] z-10">
      <div class="relative">
        <img :src="props.img" alt="" class="w-full h-[104px] rounded-[6px] object-cover">
        <p
          class="absolute w-full top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 text-white xs:text-[14px] md:text-[20px] pt-[16px] text-center font-notoSans whitespace-pre-wrap break-words tracking-widest font-bold stroke-black-4">
          {{ props.title }}
        </p>
        <div v-if="props.showResult">
          <Button
            size="xs"
            color="accent"
            class="absolute top-0 left-0 m-[8px]"
            @click="showExplain"
          >解説</Button
          >
          <Button size="xs" color="danger" class="absolute top-0 right-0 m-[8px]">報告</Button>
        </div>
      </div>
      <p
        class="font-notoSans font-bold xs:text-[12px] md:text-[16px] tracking-wider leading-[32px] overflow-hidden overflow-y-auto">
        {{ props.content }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import Button from "@/components/modules/ButtonComponent.vue";
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    showResult: {
      type: Boolean,
      default: false,
      type: String,
    },
  });

  const emit = defineEmits(["showExplainEvent"]);

  const showExplain = () => {
    emit("showExplainEvent");
  };
</script>
