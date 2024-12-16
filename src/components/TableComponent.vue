<template>
  <table class="overflow-hidden font-zenMaru shadow-[0_4px_4px_rgba(0,0,0,0.25)] m-[30px] rounded-[6px]">
    <thead>
      <tr>
        <td 
          v-for="(col, index) in props.header" :key="index"
          class="bg-primary font-bold text-[16px] w-[80px] h-[40px] px-[8px] py-[4px] hover:bg-[#FFD000] cursor-default"
          :class="headerRound[index]" align="center"
        >
          {{ col.name }}
        </td>
      </tr>
    </thead>
    <tbody class="text-[16px] font-base">
      <tr 
        v-for="(row, index) in props.content" :key="index" align="center"
        class="w-[80px] h-[40px] px-[8px] py-[4px] border-t-[1.5px] border-black cursor-default hover:bg-gray-100"
      >
        <td>{{ row.id }}</td>
        <td>
          <Icon :name="row.correction" width="24" height="24" />
        </td>
        <td>
          <Icon :name="row.question" width="24" height="24" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import Icon from './IconComponent.vue';

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  header: {
    type: Array,
    required: false,
  },
  // eslint-disable-next-line vue/require-default-prop
  content: {
    type: Array,
    required: false
  }
});

const headerRound = props.header.map((item, index) => {
  if (index === 0) {
    return 'rounded-tl-[6px]';
  } else if (index === props.header.length - 1) {
    return 'rounded-tr-[6px]';
  } else {
    return;
  }
});

</script>
