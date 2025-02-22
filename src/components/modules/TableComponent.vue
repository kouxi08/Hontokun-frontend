<template>
  <div class="mx-[48px]">
    <table class="w-full overflow-x-auto rounded-[6px] shadow-card bg-white font-zenMaru">
      <thead>
        <tr>
          <td
            v-for="(col, index) in props.header"
            :key="index"
            class="bg-primary font-bold text-[16px] min-w-[96px] xs:h-[40px] sm:h-[48px] px-[8px] py-[4px] hover:bg-[#FFD000] cursor-default whitespace-nowrap"
            :class="headerRound[index]"
            align="center">
            {{ col.name }}
          </td>
        </tr>
      </thead>
      <tbody class="text-[16px] font-base">
        <tr
          v-for="(row, index) in props.content"
          :key="index"
          align="center"
          class="min-w-[96px] xs:h-[40px] sm:h-[48px] px-[8px] py-[4px] border-t-[1.5px] border-black cursor-default hover:bg-gray-100"
          @click="handleRowClick(row.id)"
        >
          <td class="px-4">{{ row.id }}</td>
          <td class="px-4">
            <Icon v-if="row.correction" name="correct" class="w-6 h-6 inline-block" />
            <Icon v-else name="incorrect" class="w-6 h-6 inline-block" />
          </td>
          <td class="px-4">
            <Icon v-if="row.yourAnswer" name="correct" class="w-6 h-6 inline-block" />
            <Icon v-else name="incorrect" class="w-6 h-6 inline-block" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import Icon from "@/components/modules/IconComponent.vue";

  const props = defineProps({
    header: {
      type: Array,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  });

  const emit = defineEmits(['rowClick']);

  const headerRound = props.header.map((item, index) => {
    if (index === 0) return "rounded-tl-[6px]";
    if (index === props.header.length - 1) return "rounded-tr-[6px]";
    return "";
  });

  const handleRowClick = (id) => {
    emit('rowClick', id);
  };
</script>
