// Import necessary tools from Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Import the type for the data structure of the search results
import { SongResponse } from './songSaga';

// Define the shape of the state managed by this slice
interface SearchState {
  query: string;
  results: SongResponse[]; 
}

// Initialize the state with default values
const initialState: SearchState = {
  query: '',
  results: [], 
};

// Create the slice with the given name, initial state, and reducers
export const searchSlice = createSlice({
  name: 'search', 
  initialState,
  reducers: {
    // Define a reducer to update the search query
    setQuery: (state, action: PayloadAction<{query:string}>) => {
      state.query = action.payload.query;
      if (!action.payload) {
        state.results = [];
      }
    },
    // Define a reducer to update the search results
    setResults: (state, action) => {
      state.results = action.payload;
    },
    // Define a reducer to clear the search results
    clearResults: (state) => {
      state.results = [];
    },
  },
});

// Export the generated action creators for use elsewhere in the application
export const { setQuery, setResults, clearResults } = searchSlice.actions;

// Export the reducer function for use in the store
export default searchSlice.reducer;