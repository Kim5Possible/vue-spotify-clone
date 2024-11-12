<script setup>
import { usePlayerStore } from "@/stores/player";
import { defineProps, onMounted, ref, toRefs } from "vue";
import Play from "vue-material-design-icons/Play.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import { useLikedStore } from "@/stores/liked";

const props = defineProps({
  track: Object,
  index: Number,
  artist: Object,
});

const store = usePlayerStore();
const storeLiked = useLikedStore();
const { track, index, artist } = props;

const setCurrentSong = () => {
  store.setCurrentSong(track, artist);
};

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
  <div
    @click="setCurrentSong"
    class="cursor-pointer flex flex-col justify-between text-white group hover:bg-[#222222] duration-300 rounded-lg"
  >
    <div class="flex items-center justify-between px-5 h-10">
      <div class="flex items-center">
        <Play
          v-if="store.currentSong?.path === track.path"
          class="mr-7 w-4 text-[#1db954]"
          :size="18"
        />
        <div v-else>
          <div class="mr-7 w-4 text-[#b3b3b3] group-hover:hidden block">
            {{ index }}
          </div>
          <Play class="mr-7 w-4 group-hover:block hidden" :size="18" />
        </div>

        <div class="text-sm">
          {{ track.name }}
        </div>
      </div>

      <div class="text-[#b3b3b3] text-sm">
        <div class="flex items-center gap-3">
          <button
            v-if="
              storeLiked.likedSongs.some((song) => song.path === track.path)
            "
            type="button"
            @click="storeLiked.removeSong(track)"
          >
            <Heart class="text-red-500" :size="20" />
          </button>
          {{ formattedDuration }}
        </div>
      </div>
    </div>
    <div class="border-b border-b-[#2A2A2A]" />
  </div>
</template>
