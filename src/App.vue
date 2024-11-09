<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Topbar from "./components/Topbar.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <Sidebar />
  <Topbar />
  <RouterView />
</template>
