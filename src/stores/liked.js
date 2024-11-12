import { defineStore } from "pinia";
import { ref } from "vue";

export const useLikedStore = defineStore("liked", () => {
  const likedSongs = ref([]);
  const likedPlaylists = ref([]);
  const dateAdded = new Date().toLocaleDateString();

  function addSong(song) {
    likedSongs.value = [...likedSongs.value, song];
    song.dateAdded = dateAdded;
  }

  function removeSong(song) {
    likedSongs.value = likedSongs.value.filter(
      (likedSong) => likedSong.path !== song.path
    );
  }

  function addPlaylist(playlist) {
    likedPlaylists.value = [...likedPlaylists.value, playlist];
  }

  function removePlaylist(playlist) {
    likedPlaylists.value = likedPlaylists.value.filter(
      (likedPlaylist) => likedPlaylist.id !== playlist.id
    );
  }

  return {
    likedSongs,
    likedPlaylists,
    dateAdded,
    addSong,
    removeSong,
    addPlaylist,
    removePlaylist,
  };
});
