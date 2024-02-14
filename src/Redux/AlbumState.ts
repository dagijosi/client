import { createSlice } from "@reduxjs/toolkit";

// Define the slice for album-related actions and state management
export const albumSlice = createSlice({
  name: "album",
  // Initial state for the album slice
  initialState: {
    album: [],
    isLoading: false,
  },
  // Define the reducers for the album slice
  reducers: {
    // Action to initiate fetching of albums
    getAlbumsFetch: (state) => {
      state.isLoading = true;
    },
    // Action to handle successful retrieval of albums
    AlbumsSuccess: (state, action) => {
      state.album = action.payload;

      state.isLoading = false;
    },
    // Action to handle failure in fetching albums
    AlbumsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the generated actions for use elsewhere in the application
export const { getAlbumsFetch, AlbumsSuccess, AlbumsFailure } =
  albumSlice.actions;
// Export the reducer function for use in the store
export default albumSlice.reducer;
