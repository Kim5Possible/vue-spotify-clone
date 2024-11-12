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
    console.log(shuffledTracksQueue.value);
    if (shuffle.value && shuffledTracksQueue.value.length) {
      setCurrentSong(shuffledTracksQueue.value.shift(), artist);
    } else {
      const index = artist.tracks.findIndex(
        (track) => track.path === currentSong.value.path
      );
      if (index === artist.tracks.length - 1) {
        setCurrentSong(artist.tracks[0], artist);
      } else {
        setCurrentSong(artist.tracks[index + 1], artist);
      }
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
      const shuffledTracks = [...artist.tracks];
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
