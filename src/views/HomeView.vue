<script setup>
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import playlists from "@/playlist.json";
</script>

<template>
  <section class="ml-[240px] pt-[70px]">
    <div v-for="playlist in playlists" :key="playlist.id" class="px-5 pb-10">
      <h2 class="text-3xl mb-5 text-white font-semibold">
        {{ playlist.name }}
      </h2>

      <div class="flex gap-5">
        <div
          v-for="item in playlist.items"
          :key="item.id"
          class="relative min-w-[140px] w-[200px] p-4 bg-[#181818] group hover:bg-[#252525] duration-300 rounded-lg cursor-pointer"
        >
          <div class="w-[100%] h-[184px] mb-4">
            <img
              :src="item.image"
              :alt="item.name"
              class="object-cover w-[100%] h-[100%] rounded-lg"
            />
          </div>
          <PlayCircle
            class="opacity-0 group-hover:opacity-100 group-hover:translate-y-[-20px] duration-300 absolute top-32 right-7 text-[#1ED760]"
            size="70"
          />
          <h4 class="text-white font-semibold mb-2">{{ item.name }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
