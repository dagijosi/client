import { configureStore } from '@reduxjs/toolkit'
import songReducer from './Redux/songState';
import artistReducer from './Redux/ArtistState';
import albumReducer from './Redux/AlbumState';
import generReducer from './Redux/GenerState';
import createSagaMiddleware from 'redux-saga';
import artistCountReducer from './Redux/ArtistCount';
import songSaga from './Redux/songSaga';
import artistDetailReducer from './Redux/artistDetailSlice';
import albumCountReducer from './Redux/AlbumCount';
import albumDetailReducer from './Redux/AlbumDetailSlice';
import generCountReducer from './Redux/GenerCount';
import searchReducer from './Redux/searchSlice';

const saga = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    songs: songReducer,
    albums: albumReducer,
    artists: artistReducer,
    gener: generReducer,
    artistCount: artistCountReducer,
    artistDetail: artistDetailReducer,
    albumCount: albumCountReducer,
    albumDetail: albumDetailReducer,
    generCount: generCountReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(saga);
  },
})
saga.run(songSaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch