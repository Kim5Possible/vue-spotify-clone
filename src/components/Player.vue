<script setup>
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import Heart from "vue-material-design-icons/Heart.vue";
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
import { ref, watch } from "vue";
import { useLikedStore } from "@/stores/liked";
import { useVolumeStore } from "@/stores/volume";

const store = usePlayerStore();
const storeLiked = useLikedStore();
const storeVolume = useVolumeStore();

const songTimeCurrent = ref(0);
const songTimeTotal = ref(0);

let intervalId = null;

watch(
  () => store.audio,
  (newAudio) => {
    if (newAudio) {
      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        if (newAudio) {
          const minutes = Math.floor(newAudio.currentTime / 60);
          const seconds = Math.floor(newAudio.currentTime % 60);
          songTimeCurrent.value = `${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`;

          const minutesTotal = Math.floor(newAudio.duration / 60);
          const secondsTotal = Math.floor(newAudio.duration % 60);
          songTimeTotal.value = `${minutesTotal}:${
            secondsTotal < 10 ? "0" : ""
          }${secondsTotal}`;
        }
      }, 100);
    }
  }
);
</script>

<template>
  <section class="relative" v-if="store.currentSong.path">
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
          <span class="font-semibold text-white">{{
            store.currentSong.name
          }}</span>
          <span>{{ store.currentArtist.artist }}</span>
        </div>
        <button
          type="button"
          @click="
            storeLiked.likedSongs.includes(store.currentSong)
              ? storeLiked.removeSong(store.currentSong)
              : storeLiked.addSong(store.currentSong)
          "
        >
          <HeartOutline
            :size="20"
            v-if="!storeLiked.likedSongs.includes(store.currentSong)"
          />
          <Heart class="text-red-500" :size="20" v-else />
        </button>
        <button><PictureInPictureBottomRight :size="20" /></button>
      </div>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="flex gap-4 mb-1 justify-center">
          <button type="button" @click="store.shuffleSongs">
            <Shuffle
              :size="25"
              :fillColor="store.shuffle ? '#1db954' : '#b3b3b3'"
            />
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
          <button type="button" @click="store.replaySong">
            <Replay
              :size="25"
              :fillColor="store.replay ? '#1db954' : '#b3b3b3'"
            />
          </button>
        </div>
        <div class="flex items-center justify-between gap-2">
          <span class="text-xs">{{ songTimeCurrent }}</span>
          <input
            @input="store.updateCurrentTime"
            :min="0"
            :max="100"
            v-model="store.currentProgress"
            type="range"
            class="w-[400px] h-1 thumb-small rounded-full focus:outline-none cursor-pointer"
          />
          <span class="text-xs">{{ songTimeTotal }}</span>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <button
          type="button"
          @click="
            storeVolume.volume === 0
              ? storeVolume.setVolume(50)
              : storeVolume.setVolume(0)
          "
        >
          <div v-if="storeVolume.volume > 0 && storeVolume.volume < 30">
            <VolumeLow :size="20" />
          </div>
          <div v-else-if="storeVolume.volume >= 30 && storeVolume.volume < 70">
            <VolumeMedium :size="20" />
          </div>
          <div v-else-if="storeVolume.volume >= 70">
            <VolumeHigh :size="20" />
          </div>
          <div v-else>
            <VolumeMute :size="20" />
          </div>
        </button>

        <input
          type="range"
          v-model="storeVolume.volume"
          @input="storeVolume.setVolume($event.target.value)"
          :min="0"
          :max="100"
          class="w-full h-1 thumb-hidden accent-white rounded-full focus:outline-none cursor-pointer"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    -webkit-appearance: none;
    background-color: #5a5a5a;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 0;
    -webkit-appearance: none;
    height: 0;

    background: #383838;
    box-shadow: -200px 0 0 200px #bebebe;
  }
}
</style>
