<script setup>
import { ref } from "vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import AccountCircle from "vue-material-design-icons/AccountCircle.vue";

let openMenu = ref(false);
</script>

<template>
  <div
    class="fixed z-10 right-0 w-[calc(100%-240px)] h-[60px] flex justify-between items-center bg-[#101010] px-14 py-30"
  >
    <div class="flex gap-4">
      <button
        type="button"
        class="cursor-pointer rounded-full bg-black flex items-center justify-center"
      >
        <ChevronLeft :size="30" />
      </button>
      <button
        type="button"
        class="cursor-pointer rounded-full bg-black flex items-center justify-center"
      >
        <ChevronRight :size="30" />
      </button>
    </div>

    <button
      @click="openMenu = !openMenu"
      :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
      class="cursor-pointer bg-black text-sm p-1 rounded-full flex gap-2 items-center"
    >
      <img
        src="https://avatars.githubusercontent.com/u/100800702?v=4"
        alt="ava"
        class="w-8 h-8 rounded-full"
      />
      <span>Yana</span>
      <ChevronDown v-if="!openMenu" />
      <ChevronUp v-else />
    </button>

    <div
      v-if="openMenu"
      class="fixed top-[52px] right-[35px] w-[200px] bg-[#282828] rounded-sm"
    >
      <ul>
        <li>
          <a
            href="#"
            class="flex gap-2 p-3 hover:text-white border-b border-gray-500"
            >Profile</a
          >
        </li>

        <li><a href="#" class="flex gap-2 p-3 hover:text-white">Log Out</a></li>
      </ul>
    </div>
  </div>
</template>
