<template>
    <div class="w-[16px] h-[16px] flex item-center justify-center">
        <img :src="src" alt="icon" :width="props.width" :height="height">
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    width: {
        type: Number,
        default: 16
    },
    height: {
        type: Number,
        default: 16
    }
});

const src = "/icons/" + props.name + ".svg";
</script>
