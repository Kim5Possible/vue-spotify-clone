import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LibraryView from "@/views/LibraryView.vue";
import SearchView from "@/views/SearchView.vue";
import LikedSongsView from "@/views/LikedSongsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/library",
      name: "library",
      component: LibraryView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/liked-songs",
      name: "liked-songs",
      component: LikedSongsView,
    },
  ],
});

export default router;
