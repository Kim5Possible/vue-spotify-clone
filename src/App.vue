<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Player from "./components/Player.vue";
</script>

<template>
  <Sidebar />
  <Topbar />
  <RouterView />
  <Player />
</template>
