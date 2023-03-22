import { createSlice, current } from "@reduxjs/toolkit";

const state = {
  music: [],
  songPlaying: { link: "" },
};

const musicSlice = createSlice({
  name: "music",
  initialState: state,
  reducers: {
    addSong: (state, action) => ({
      ...state,
      music: [...state.music, { ...action.payload }],
    }),
    loadMusic: (state, action) => ({
      ...state,
      music: [...action.payload],
    }),
    playTrack: (state, action) => ({ ...state, songPlaying: action.payload }),
    playNextTrack: (state, payload) => {
      const currentSongIndex = current(state).music.indexOf(
        current(state).songPlaying
      );
      if (currentSongIndex + 1 >= state.music.length) {
        return { ...state, songPlaying: state.music[0] };
      }
      return { ...state, songPlaying: state.music[currentSongIndex + 1] };
    },
    playPrevTrack: (state, action) => {
      const currentSongIndex = current(state).music.indexOf(
        current(state).songPlaying
      );
      if (currentSongIndex - 1 < 0) {
        return { ...state, songPlaying: state.music[state.music.length - 1] };
      }
      return { ...state, songPlaying: state.music[currentSongIndex - 1] };
    },
  },
});

export const { loadMusic, addSong, playTrack, playNextTrack, playPrevTrack } =
  musicSlice.actions;

export default musicSlice.reducer;
