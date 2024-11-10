<script setup>
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import SkipNext from "vue-material-design-icons/SkipNext.vue";
import SkipPrevious from "vue-material-design-icons/SkipPrevious.vue";
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Replay from "vue-material-design-icons/Replay.vue";
import Shuffle from "vue-material-design-icons/Shuffle.vue";

import VolumeLow from "vue-material-design-icons/VolumeLow.vue";
import VolumeMedium from "vue-material-design-icons/VolumeMedium.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";

import { usePlayerStore } from "@/stores/player";

const store = usePlayerStore();
</script>

<template>
  <section>
    <div
      class="fixed z-20 right-0 bottom-0 left-0 h-[70px] flex justify-between items-center bg-[#101010] px-5 py-30"
    >
      <div class="flex gap-3 text-sm items-center">
        <img
          src="@/assets/img/album-cover.jpg"
          alt="cover"
          class="w-14 rounded-sm"
        />
        <div class="flex flex-col justify-around">
          <span class="font-semibold text-white">Song Name</span>
          <span>Artist</span>
        </div>
        <button>
          <HeartOutline :size="20" />
        </button>
        <button><PictureInPictureBottomRight :size="20" /></button>
      </div>

      <div class="basis-1/3">
        <div class="flex gap-4 mb-1 justify-center">
          <button type="button">
            <Shuffle :size="25" />
          </button>
          <button type="button" @click="store.prevSong()">
            <SkipPrevious :size="30" />
          </button>
          <button
            type="button"
            @click="store.isPlaying ? store.pauseSong() : store.playSong()"
          >
            <PauseCircle v-if="store.isPlaying" :size="30" />
            <PlayCircle v-else :size="30" fillColor="#1db954" />
          </button>
          <button type="button" @click="store.nextSong()">
            <SkipNext :size="30" />
          </button>
          <button type="button">
            <Replay :size="25" />
          </button>
        </div>
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs">0:00</span>
          <input
            type="range"
            class="w-full h-1 accent-[#1db954] rounded-full focus:outline-none cursor-pointer"
          />
          <span class="text-xs">3:00</span>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <!-- <button type="button">
            <VolumeLow :size="20" />
          </button> -->
        <button type="button">
          <VolumeMedium :size="20" />
        </button>
        <!-- <button type="button">
          <VolumeHigh :size="20" />
        </button>
        <button type="button">
          <VolumeMute :size="20" />
        </button> -->
        <input
          type="range"
          class="w-full h-1 thumb-hidden accent-white rounded-full focus:outline-none cursor-pointer"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.thumb-hidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}

.thumb-hidden[type="range"]::-moz-range-thumb {
  width: 0;
  height: 0;
}
</style>
