<script setup>
import { defineProps, onMounted, ref } from "vue";

const props = defineProps({
  track: Object,
  index: Number,
});

const { track, index } = props;

const formattedDuration = ref("");

onMounted(() => {
  const audio = new Audio(track.path);
  audio.onloadeddata = () => {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    formattedDuration.value = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
});
</script>

<template>
  <div class="cursor-pointer flex flex-col justify-between text-white">
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center">
        <div class="mr-7 text-[#b3b3b3]">{{ index }}</div>
        <div class="text-sm">{{ track.name }}</div>
      </div>

      <div class="text-[#b3b3b3]">{{ formattedDuration }}</div>
    </div>
    <div class="border-b border-b-[#2A2A2A] mt-2" />
  </div>
</template>
