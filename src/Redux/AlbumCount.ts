import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state
interface AlbumCountState {
  songCounts: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

// Initial state for the slice
const initialState: AlbumCountState = {
  songCounts: {},
  isLoading: false,
  error: null,
};

// Create the slice with reducers
const albumCountSlice = createSlice({
  name: "albumCount",
  initialState,
  reducers: {
    // Action to request song counts by album
    fetchSongCountByAlbumRequest: (
      state,
      action: PayloadAction<{ album: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of song counts by album
    fetchSongCountByAlbumSuccess: (
      state,
      action: PayloadAction<{ album: string; count: number }>
    ) => {
      state.isLoading = false;
      state.songCounts[action.payload.album] = action.payload.count;
    },
    // Action to handle failure in retrieving song counts by album
    fetchSongCountByAlbumFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated actions
export const {
  fetchSongCountByAlbumRequest,
  fetchSongCountByAlbumSuccess,
  fetchSongCountByAlbumFailure,
} = albumCountSlice.actions;

// Export the reducer
export default albumCountSlice.reducer;
