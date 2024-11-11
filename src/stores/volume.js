import { defineStore } from "pinia";
import { ref } from "vue";
import { usePlayerStore } from "./player";

export const useVolumeStore = defineStore("volume", () => {
  const volume = ref(50);
  const store = usePlayerStore();

  function setVolume(value) {
    store.audio.volume = value / 100;

    volume.value = value;
  }
  return { volume, setVolume };
});
