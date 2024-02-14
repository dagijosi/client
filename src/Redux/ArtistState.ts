// Import necessary tools from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the slice for the artist state management
export const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artist: [],
    isLoading: false,
  },
  // Define the reducers for this slice
  reducers: {
    // Action to set the loading state to true when fetching artists starts
    getArtistsFetch: (state) => {
      state.isLoading = true;
    },
    // Action to handle successful retrieval of artists
    ArtistsSuccess: (state, action) => {
      state.artist = action.payload;
      state.isLoading = false;
    },
    // Action to handle failure in retrieving artists
    ArtistsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

// Export the auto-generated action creators for the defined reducers
export const { getArtistsFetch, ArtistsSuccess, ArtistsFailure } =
  artistSlice.actions;
// Export the reducer function for this slice
export default artistSlice.reducer;
