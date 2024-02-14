import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state for the artist detail feature
interface ArtistDetailState {
  albumsList: any[];
  albumNumber: number | null;
  songNumber: number | null;
  isLoading: boolean;
  error: string | null;
}

// Initialize the state with default values
const initialState: ArtistDetailState = {
  albumsList: [],
  albumNumber: null,
  songNumber: null,
  isLoading: false,
  error: null,
};

// Create a slice of the Redux store for the artist detail feature
const artistDetailSlice = createSlice({
  name: "artistDetail",
  initialState,
  reducers: {
    // Action to request artist detail data
    fetchArtistDetailRequest: (
      state,
      action: PayloadAction<{ artist: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of artist detail data
    fetchArtistDetailSuccess: (
      state,
      action: PayloadAction<{
        albumsList: any[];
        albumNumber: number;
        songNumber: number;
      }>
    ) => {
      state.isLoading = false;
      state.albumsList = action.payload.albumsList;
      state.albumNumber = action.payload.albumNumber;
      state.songNumber = action.payload.songNumber;
    },
    // Action to handle failure in retrieving artist detail data
    fetchArtistDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated actions for use elsewhere in the application
export const {
  fetchArtistDetailRequest,
  fetchArtistDetailSuccess,
  fetchArtistDetailFailure,
} = artistDetailSlice.actions;

// Export the reducer function for use in the Redux store
export default artistDetailSlice.reducer;
