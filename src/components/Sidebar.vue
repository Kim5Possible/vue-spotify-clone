<script setup>
import { RouterLink, useRoute } from "vue-router";
import Home from "vue-material-design-icons/Home.vue";
import Magnify from "vue-material-design-icons/Magnify.vue";
import MusicBoxMultiple from "vue-material-design-icons/MusicBoxMultiple.vue";
import PlusBox from "vue-material-design-icons/PlusBox.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import Spotify from "vue-material-design-icons/Spotify.vue";

const isActiveLick = (path) => {
  const route = useRoute();
  return route.path === path;
};
</script>

<template>
  <div
    class="fixed z-20 flex flex-col gap-5 left-0 top-0 bottom-0 w-[240px] bg-black p-6"
  >
    <div class="w-[130px] mb-5">
      <a href="#" class="flex items-center text-[#1db954]">
        <Spotify :size="40" />

        <span class="ml-2 text-xl font-semibold">Spotify</span>
      </a>
    </div>

    <div class="mb-5">
      <ul class="flex flex-col gap-4">
        <li>
          <RouterLink
            to="/"
            :class="[
              isActiveLick('/') ? 'text-white underline' : 'hover:text-white',
            ]"
            class="flex items-center gap-2"
          >
            <Home :size="30" />

            <span>Home</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/search"
            :class="[
              isActiveLick('/search')
                ? 'text-white underline'
                : 'hover:text-white',
            ]"
            class="flex items-center gap-2"
          >
            <Magnify :size="30" />
            <span>Search</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/library"
            :class="[
              isActiveLick('/library')
                ? 'text-white underline'
                : 'hover:text-white',
            ]"
            class="flex items-center gap-2"
          >
            <MusicBoxMultiple :size="30" />
            <span>Your Library</span>
          </RouterLink>
        </li>
      </ul>
    </div>

    <div>
      <ul class="flex flex-col gap-4">
        <li>
          <a href="#" class="hover:text-white flex items-center gap-2">
            <PlusBox :size="30" />
            <span>Create Playlist</span>
          </a>
        </li>

        <li>
          <a href="#" class="hover:text-white flex items-center gap-3">
            <div
              class="ml-[2px] w-[25px] h-[25px] rounded-md bg-gradient-to-br from-[#6c18b1] to-[#4a68f0] flex items-center justify-center"
            >
              <Heart :size="18" />
            </div>
            <span>Liked Songs</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
