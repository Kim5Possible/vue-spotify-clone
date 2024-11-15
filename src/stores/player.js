import { defineStore } from "pinia";
import { computed, ref } from "vue";
import artist from "../artist.json";

export const usePlayerStore = defineStore("player", () => {
  const currentSong = ref({});
  const audio = ref(null);
  const isPlaying = ref(false);
  const currentArtist = ref(null);
  const currentProgress = ref(0);
  const replay = ref(false);
  const shuffle = ref(false);
  const shuffledTracksQueue = ref([]);
  const currentShuffledIndex = ref(0);
  const currentPage = ref([]);
  const currentPageType = ref("");
  function setCurrentSong(song, artist) {
    if (isPlaying.value) {
      pauseSong();
    }
    audio.value = new Audio(song);
    currentSong.value = song;
    audio.value.src = song.path;
    currentArtist.value = artist;

    setTimeout(() => {
      isPlaying.value = true;
      audio.value.play();
    });
    audio.value.addEventListener("ended", nextSong);
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
    if (shuffle.value && shuffledTracksQueue.value.length) {
      currentShuffledIndex.value =
        (currentShuffledIndex.value + 1) % shuffledTracksQueue.value.length;
      setCurrentSong(
        shuffledTracksQueue.value[currentShuffledIndex.value],
        artist
      );
    } else {
      const currentIndex = currentPage.value.findIndex(
        (track) => track.path === currentSong.value.path
      );
      const nextIndex = (currentIndex + 1) % currentPage.value.length;
      setCurrentSong(currentPage.value[nextIndex], artist);
    }
  }

  function prevSong() {
    if (shuffle.value && shuffledTracksQueue.value.length) {
      currentShuffledIndex.value =
        (currentShuffledIndex.value - 1 + shuffledTracksQueue.value.length) %
        shuffledTracksQueue.value.length;
      setCurrentSong(
        shuffledTracksQueue.value[currentShuffledIndex.value],
        artist
      );
    } else {
      const currentIndex = currentPage.value.findIndex(
        (track) => track.path === currentSong.value.path
      );
      const prevIndex =
        (currentIndex - 1 + currentPage.value.length) %
        currentPage.value.length;
      setCurrentSong(currentPage.value[prevIndex], artist);
    }
  }

  function replayEnded() {
    audio.value.currentTime = 0;
    audio.value.play();
  }

  function replaySong() {
    replay.value = !replay.value;
    if (replay.value) {
      audio.value.removeEventListener("ended", nextSong);
      audio.value.addEventListener("ended", replayEnded);
    } else {
      audio.value.removeEventListener("ended", replayEnded);
      audio.value.addEventListener("ended", nextSong);
    }
  }

  function shuffleSongs() {
    shuffle.value = !shuffle.value;
    if (shuffle.value) {
      const shuffledTracks = [...currentPage.value];
      const currentTrack = shuffledTracks.find(
        (track) => track.path === currentSong.value.path
      );
      shuffledTracks.splice(shuffledTracks.indexOf(currentTrack), 1);
      for (let i = shuffledTracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledTracks[i], shuffledTracks[j]] = [
          shuffledTracks[j],
          shuffledTracks[i],
        ];
      }
      shuffledTracksQueue.value = shuffledTracks;
      shuffledTracksQueue.value.unshift(currentTrack);
      currentShuffledIndex.value = 0;
    } else {
      shuffledTracksQueue.value = [];
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
    replay,
    shuffle,
    currentPage,
    currentPageType,
    setCurrentSong,
    pauseSong,
    playSong,
    nextSong,
    prevSong,
    replaySong,
    shuffleSongs,
    updateCurrentTime,
    progress,
  };
});
