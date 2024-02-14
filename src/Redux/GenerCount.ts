import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state for the genre counts feature
interface GenerCountState {
  artistCounts: Record<string, number>;
  albumCounts: Record<string, number>;
  songCounts: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}
// Initial state for the genre counts feature
const initialState: GenerCountState = {
  artistCounts: {},
  albumCounts: {},
  songCounts: {},
  isLoading: false,
  error: null,
};
// Create a slice of the Redux store for managing genre counts
const generCountSlice = createSlice({
  name: "generCount",
  initialState,
  reducers: {
    // Action to request artist count by genre
    fetchArtistCountByGenerRequest: (
      state,
      action: PayloadAction<{ gener: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of artist count by genre
    fetchArtistCountByGenerSuccess: (
      state,
      action: PayloadAction<{ gener: string; count: number }>
    ) => {
      state.isLoading = false;
      state.artistCounts[action.payload.gener] = action.payload.count;
    },
    // Action to handle failure in retrieving artist count by genre
    fetchArtistCountByGenerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Action to request album count by genre
    fetchAlbumCountByGenerRequest: (
      state,
      action: PayloadAction<{ gener: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of album count by genre
    fetchAlbumCountByGenerSuccess: (
      state,
      action: PayloadAction<{ gener: string; count: number }>
    ) => {
      state.isLoading = false;
      state.albumCounts[action.payload.gener] = action.payload.count;
    },
    // Action to handle failure in retrieving album count by genre
    fetchAlbumCountByGenerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Action to request song count by genre
    fetchSongCountByGenerRequest: (
      state,
      action: PayloadAction<{ gener: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of song count by genre
    fetchSongCountByGenerSuccess: (
      state,
      action: PayloadAction<{ gener: string; count: number }>
    ) => {
      state.isLoading = false;
      state.songCounts[action.payload.gener] = action.payload.count;
    },
    // Action to handle failure in retrieving song count by genre
    fetchSongCountByGenerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated actions for use elsewhere in the application
export const {
  fetchArtistCountByGenerRequest,
  fetchArtistCountByGenerSuccess,
  fetchArtistCountByGenerFailure,
  fetchAlbumCountByGenerRequest,
  fetchAlbumCountByGenerSuccess,
  fetchAlbumCountByGenerFailure,
  fetchSongCountByGenerRequest,
  fetchSongCountByGenerSuccess,
  fetchSongCountByGenerFailure,
} = generCountSlice.actions;

// Export the reducer function for use in the Redux store
export default generCountSlice.reducer;
