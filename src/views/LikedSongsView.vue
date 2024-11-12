<script setup>
import Heart from "vue-material-design-icons/Heart.vue";
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import ArrowDownCircleOutline from "vue-material-design-icons/ArrowDownCircleOutline.vue";
import ArrowDownCircle from "vue-material-design-icons/ArrowDownCircle.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import Songs from "@/components/Songs.vue";

import artist from "@/artist.json";
import { usePlayerStore } from "@/stores/player";
import { useLikedStore } from "@/stores/liked";

const store = usePlayerStore();
const storeLiked = useLikedStore();

function playSong() {
  store.playSong();
}

store.currentPage = [...storeLiked.likedSongs];
store.currentPageType = "liked";
</script>

<template>
  <section
    class="text-white ml-[240px] py-[70px] shadow-[0px_250px_100px_8px_rgba(108,24,177,0.20)_inset]"
  >
    <div class="p-8">
      <div class="flex items-center w-full relative h-full mb-3">
        <div
          class="w-[160px] h-[140px] rounded-sm bg-gradient-to-br from-[#6c18b1] to-[#4a68f0] flex items-center justify-center"
        >
          <Heart :size="60" />
        </div>
        <div class="w-full ml-5">
          <div class="flex flex-col gap-2">
            <span class="text-[13px] uppercase">playlist</span>
            <span
              class="w-full text-5xl hover:underline cursor-pointer font-bold"
            >
              Liked Songs
            </span>
            <div class="flex items-center gap-2 text-sm">
              <img
                src="https://avatars.githubusercontent.com/u/100800702?v=4"
                alt="ava"
                class="w-6 rounded-full"
              />
              <span>Yana</span>
              <div class="w-1 h-1 rounded-full bg-[#b3b3b3] my-2 mx-2" />
              <span class="-ml-0.5"> songs</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <button class="p-1 rounded-full">
          <PauseCircle
            v-if="
              storeLiked.likedSongs.includes(store.currentSong) &&
              store.isPlaying
            "
            :size="40"
            @click="store.pauseSong"
          />
          <PlayCircle
            v-else
            fillColor="#1ED760"
            :size="40"
            @click="
              storeLiked.likedSongs.includes(store.currentSong)
                ? store.playSong()
                : store.setCurrentSong(storeLiked.likedSongs[0], artist)
            "
          />
        </button>
        <button type="button">
          <ArrowDownCircleOutline :size="30" />
          <!-- <ArrowDownCircle fillColor="#1ED760" :size="30" /> -->
        </button>
      </div>
      <div class="mt-6"></div>
      <div
        class="flex items-center justify-between px-5 pt-2 uppercase text-sm text-[#b3b3b3]"
      >
        <div class="basis-1/5 flex items-center gap-2">
          <div class="mr-7">#</div>
          <div class="tracking-widest">Title</div>
        </div>
        <div class="ml-5">Album</div>
        <div>Date added</div>
        <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18" /></div>
      </div>
      <div class="border-b border-b-[#2A2A2A] mt-2" />
      <ul
        class="w-full"
        v-for="(track, index) in storeLiked.likedSongs"
        :key="track"
      >
        <Songs
          :track="track"
          :artist="artist"
          :index="++index"
          @playSong="playSong"
        />
      </ul>
    </div>
  </section>
</template>
