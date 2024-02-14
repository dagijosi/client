import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the state for the album detail feature
interface AlbumDetailState {
  songList: any[];

  songNumber: number | null;

  isLoading: boolean;
  error: string | null;
}

// Initialize the state with default values
const initialState: AlbumDetailState = {
  songList: [],
  songNumber: null,
  isLoading: false,
  error: null,
};

// Create a slice of the Redux store for the album detail feature
const albumDetailSlice = createSlice({
  name: "albumDetail",
  initialState,
  reducers: {
    // Action to request album detail data
    fetchAlbumDetailRequest: (
      state,
      action: PayloadAction<{ album: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    // Action to handle successful retrieval of album detail data
    fetchAlbumDetailSuccess: (
      state,
      action: PayloadAction<{ songList: any[]; songNumber: number }>
    ) => {
      state.isLoading = false;
      state.songList = action.payload.songList;
      state.songNumber = action.payload.songNumber;
    },
    // Action to handle failure in retrieving album detail data
    fetchAlbumDetailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export the generated action creators for use in other parts of the application
export const {
  fetchAlbumDetailRequest,
  fetchAlbumDetailSuccess,
  fetchAlbumDetailFailure,
} = albumDetailSlice.actions;

// Export the reducer function for use with the Redux store
export default albumDetailSlice.reducer;
