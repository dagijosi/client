import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SongResponse } from "./songSaga";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  gener: string;
}

export const songSlice = createSlice({
  name: "song",
  initialState: {
    song: [] as Song[],
    isLoading: false,
  },
  reducers: {
    getSongFetch: (state) => {
      state.isLoading = true;
    },
    SongSuccess: (state, action) => {
      state.song = action.payload;
      state.isLoading = false;
    },
    SongsFailure: (state) => {
      state.isLoading = false;
    },
    createSong: (state, action) => {
      state.song.push(action.payload);
    },

    editSong: (state, action) => {
      const index = state.song.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.song[index] = action.payload;
      }
    },
    deleteSong: (state, action) => {
      state.song = state.song.filter(song => song._id !== action.payload);
    },
    editSongSuccess: (state, action) => {
      const index = state.song.findIndex((s) => s._id === action.payload._id);
      if (index !== -1) {
        state.song[index] = action.payload;
      }
      state.isLoading = false;
    },
    createSongSuccess: (state, action) => {
      
      state.isLoading = false;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.song = state.song.filter(song => song._id !== action.payload);
    },
  },
});

export const { getSongFetch, SongSuccess, SongsFailure, createSong, editSong,deleteSong, deleteSongSuccess,editSongSuccess, createSongSuccess } =
  songSlice.actions;
export default songSlice.reducer;
