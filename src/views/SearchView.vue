<script setup>
import search from "@/search.json";
import uniqolor from "uniqolor";
</script>

<template>
  <section class="ml-[240px] pt-[70px]">
    <div v-for="playlist in search" :key="playlist.id" class="px-5 pb-10">
      <h2 class="text-3xl mb-5 text-white font-semibold">
        {{ playlist.name }}
      </h2>

      <div
        :class="
          playlist.id === 1
            ? 'md:flex md:flex-nowrap gap-5 justify-between flex-wrap'
            : 'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'
        "
      >
        <div
          v-for="item in playlist.items"
          :key="item.id"
          :style="`background-color: ${uniqolor.random().color}`"
          :class="
            playlist.id === 1
              ? 'md:basis-1/3 lg:basis-1/3 h-40 mb-2'
              : 'aspect-square'
          "
          class="bg-[#181818] relative overflow-hidden p-4 rounded-lg cursor-pointer"
        >
          <h4 class="text-white font-semibold">{{ item.name }}</h4>

          <img
            :src="item.image"
            :alt="item.name"
            class="absolute -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
