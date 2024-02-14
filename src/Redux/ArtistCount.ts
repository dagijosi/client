// Import necessary functions from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state managed by this slice
interface ArtistCountState {
  albumCounts: Record<string, number>;
  songCounts: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

// Initialize the state with default values
const initialState: ArtistCountState = {
  albumCounts: {},
  songCounts: {},
  isLoading: false,
  error: null,
};

// Create a slice of the Redux store to manage the state related to artist counts
const artistCountSlice = createSlice({
  name: "artistCount",
  initialState,
  reducers: {
    // Action creator for when a request to fetch album counts starts
    fetchAlbumCountRequest: (
      state,
      action: PayloadAction<{ artist: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action creator for when a request to fetch album counts succeeds
    fetchAlbumCountSuccess: (
      state,
      action: PayloadAction<{ artist: string; count: number }>
    ) => {
      state.isLoading = false;
      state.albumCounts[action.payload.artist] = action.payload.count;
    },
    // Action creator for when a request to fetch album counts fails
    fetchAlbumCountFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Action creator for when a request to fetch song counts starts
    fetchSongCountRequest: (
      state,
      action: PayloadAction<{ artist: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action creator for when a request to fetch song counts succeeds
    fetchSongCountSuccess: (
      state,
      action: PayloadAction<{ artist: string; count: number }>
    ) => {
      state.isLoading = false;
      state.songCounts[action.payload.artist] = action.payload.count;
    },
    // Action creator for when a request to fetch song counts fails
    fetchSongCountFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated action creators for use elsewhere in the application
export const {
  fetchAlbumCountRequest,
  fetchAlbumCountSuccess,
  fetchAlbumCountFailure,
  fetchSongCountRequest,
  fetchSongCountSuccess,
  fetchSongCountFailure,
} = artistCountSlice.actions;

// Export the reducer function for use in the Redux store configuration
export default artistCountSlice.reducer;
