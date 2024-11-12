<script setup>
import artist from "@/artist.json";
import { onMounted, ref } from "vue";
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import HeartOutline from "vue-material-design-icons/HeartOutline.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import Songs from "@/components/Songs.vue";
import { usePlayerStore } from "@/stores/player";

const duration = ref(0);
const likedPlaylist = ref(false);

const store = usePlayerStore();

function playSong() {
  store.playSong();
}

onMounted(() => {
  artist.tracks.forEach((track, index) => {
    const audio = new Audio(track.path);
    audio.onloadeddata = () => {
      duration.value += audio.duration;
    };
  });
});
</script>

<template>
  <section
    class="text-white ml-[240px] py-[70px] shadow-[0px_250px_100px_8px_rgba(199,118,255,0.15)_inset]"
  >
    <div class="p-8">
      <div class="flex items-center w-full relative h-full mb-3">
        <img
          :src="artist.albumCover"
          class="w-[140px] shadow-[0px_0px_20px_10px_rgba(0,0,0,0.4)] rounded-sm"
        />
        <div class="w-full ml-5">
          <div class="flex flex-col gap-2">
            <span class="text-[13px] uppercase">album</span>
            <span
              class="w-full text-5xl hover:underline cursor-pointer font-semibold"
            >
              {{ artist.album }}
            </span>
            <div>
              <span class="text-[#b3b3b3]">By </span
              ><span class="hover:underline cursor-pointer">{{
                artist.artist
              }}</span>
            </div>
            <div class="text-xs text-[#b3b3b3] flex">
              <span>{{ artist.releaseYear }}</span>
              <div class="w-1 h-1 rounded-full bg-[#b3b3b3] my-2 mx-2" />
              <span class="-ml-0.5">{{ artist.tracks.length }} songs,</span>
              <span class="ml-1.5">{{ parseInt(duration / 60) }} min</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <button class="p-1 rounded-full">
          <PauseCircle
            v-if="store.isPlaying"
            :size="40"
            @click="store.pauseSong"
          />
          <PlayCircle
            v-else
            fillColor="#1ED760"
            :size="40"
            @click="
              store.currentSong.path
                ? store.playSong()
                : store.setCurrentSong(artist.tracks[0], artist)
            "
          />
        </button>
        <button type="button" @click="likedPlaylist = !likedPlaylist">
          <HeartOutline :size="30" v-if="!likedPlaylist" />
          <Heart class="text-red-500" :size="30" v-else />
        </button>
        <button type="button">
          <DotsHorizontal fillColor="#FFFFFF" :size="25" />
        </button>
      </div>
      <div class="mt-6"></div>
      <div class="flex items-center justify-between px-5 pt-2">
        <div class="flex items-center justify-between text-[#b3b3b3]">
          <div class="mr-7">#</div>
          <div class="text-sm uppercase tracking-widest">Title</div>
        </div>
        <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18" /></div>
      </div>
      <div class="border-b border-b-[#2A2A2A] mt-2" />
      <ul class="w-full" v-for="(track, index) in artist.tracks" :key="track">
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
