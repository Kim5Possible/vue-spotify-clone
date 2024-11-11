import { defineStore } from "pinia";
import { computed, ref } from "vue";
import artist from "../artist.json";

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref({});
  const audio = ref(null);
  const isPlaying = ref(false);
  const currentArtist = ref(null);
  const currentProgress = ref(0);

  function setCurrentSong(song, artist) {
    if (isPlaying.value) {
      pauseSong();
    }
    audio.value = new Audio(song);
    currentSong.value = song;
    audio.value.src = song.path;
    currentArtist.value = artist;

    audio.value.play();
    audio.value.addEventListener("ended", nextSong);
    isPlaying.value = true;
  }

  function pauseSong() {
    audio.value.pause();
    isPlaying.value = false;
  }

  function playSong() {
    audio.value.play();
    isPlaying.value = true;
  }

  function nextSong() {
    const index = artist.tracks.findIndex(
      (track) => track.path === currentSong.value.path
    );
    if (index === artist.tracks.length - 1) {
      setCurrentSong(artist.tracks[0], artist);
    } else {
      setCurrentSong(artist.tracks[index + 1], artist);
    }
  }

  function prevSong() {
    const index = artist.tracks.findIndex(
      (track) => track.path === currentSong.value.path
    );

    if (index === 0) {
      setCurrentSong(artist.tracks[artist.tracks.length - 1], artist);
    } else {
      setCurrentSong(artist.tracks[index - 1], artist);
    }
  }

  const progress = computed(() => {
    return currentProgress.value;
  });

  const updateCurrentTime = (event) => {
    const progressValue = event.target.value / 100;
    audio.value.currentTime = progressValue * audio.value.duration;
  };

  setInterval(() => {
    if (audio.value) {
      currentProgress.value =
        (audio.value.currentTime / audio.value.duration) * 100;
    }
  }, 1000);

  return {
    currentSong,
    audio,
    isPlaying,
    currentArtist,
    currentProgress,
    setCurrentSong,
    pauseSong,
    playSong,
    nextSong,
    prevSong,
    updateCurrentTime,
    progress,
  };
});
