import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import { SongSuccess, createSong, createSongSuccess, deleteSong, deleteSongSuccess, editSong, editSongSuccess } from './songState';
import { AlbumsSuccess } from './AlbumState';
import { ArtistsSuccess } from './ArtistState';
import { GenerSuccess } from './GenerState';
import { fetchAlbumCountRequest, fetchAlbumCountSuccess, fetchAlbumCountFailure, fetchSongCountRequest, fetchSongCountSuccess, fetchSongCountFailure } from './ArtistCount';
import { fetchArtistDetailFailure, fetchArtistDetailRequest, fetchArtistDetailSuccess } from './artistDetailSlice';
import { fetchSongCountByAlbumFailure, fetchSongCountByAlbumRequest, fetchSongCountByAlbumSuccess } from './AlbumCount';
import { fetchAlbumDetailFailure, fetchAlbumDetailRequest, fetchAlbumDetailSuccess } from './AlbumDetailSlice';
import { fetchAlbumCountByGenerFailure, fetchAlbumCountByGenerRequest, fetchAlbumCountByGenerSuccess, fetchArtistCountByGenerFailure, fetchArtistCountByGenerRequest, fetchArtistCountByGenerSuccess, fetchSongCountByGenerFailure, fetchSongCountByGenerRequest, fetchSongCountByGenerSuccess } from './GenerCount';
import { setQuery, setResults } from './searchSlice';

// Define the response interfaces
export interface SongResponse {
  _id?: string,
  title: string,
  artist: string,
  album: string,
  gener: string
}

export interface AlbumResponse {
  _id?: string
  album: string
}

export interface ArtistResponse {
  _id?: string
  artist: string
}

export interface GenerResponse {
  _id?: string
  gener: string
}

export interface albumCount {
  numberOfAlbums: number;
}

export interface songCount {
  songNumber: number
}
const link = "https://mousi.onrender.com/api/v1/songs";
// Saga function to fetch songs
function* workGetSongFetch() {
  const song: Response = yield call(() => fetch(`${link}`));
  const songJson: SongResponse = yield call(() => song.json());
  yield put(SongSuccess(songJson));
}

// Saga function to create a song
function* workCreateSong(action: ReturnType<typeof createSong>) {
  const song: Response = yield call(() => fetch(`${link}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.payload)
  }));
  const songJson: SongResponse = yield call(() => song.json());
  yield put(createSongSuccess(songJson));
}

// Saga function to edit a song
function* workEditSong(action: ReturnType<typeof editSong>) {
  const song: Response = yield call(() => fetch(`${link}/${action.payload._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.payload)
  }));
  const songJson: SongResponse = yield call(() => song.json());
  yield put(editSongSuccess(songJson));
}

// Saga function to delete a song
function* workDeleteSong(action: ReturnType<typeof deleteSong>) {
  try {
    
    const response: Response = yield call(() => fetch(`${link}/${action.payload}`, {
      method: 'DELETE',
    }));

    if (!response.ok) {
      throw new Error('Failed to delete song');
    }

    // Assuming you have an action to remove the song from the state
    yield put(deleteSongSuccess(action.payload));
  } catch (error: any) {
    // Handle the error appropriately
    console.error('Error deleting song:', error);
  }
}

// Saga function to fetch albums
function* workGetAlbumsFetch() {
  const album: Response = yield call(() => fetch(`${link}/albums`));
  const albumJson: AlbumResponse = yield call(() => album.json());
  yield put(AlbumsSuccess(albumJson));
}

// Saga function to fetch artists
function* workGetArtistsFetch() {
  const artist: Response = yield call(() => fetch(`${link}/artists`));
  const artistJson: ArtistResponse = yield call(() => artist.json());
  yield put(ArtistsSuccess(artistJson));
}

// Saga function to fetch genres
function* workGetGenerFetch() {
  const gener: Response = yield call(() => fetch(`${link}/gener`));
  const generJson: GenerResponse = yield call(() => gener.json());
  yield put(GenerSuccess(generJson));
}

// Saga function to fetch album count for an artist
function* fetchAlbumCount(action: ReturnType<typeof fetchAlbumCountRequest>) {
  try {
    const { artist } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artists/${artist}`));
    const data: { numberOfAlbums: number } = yield call(() => response.json());
    yield put(fetchAlbumCountSuccess({ artist, count: data.numberOfAlbums }));
  } catch (error: any) {
    yield put(fetchAlbumCountFailure(error.message));
  }
}

// Saga function to fetch song count for an artist
function* fetchSongCount(action: ReturnType<typeof fetchSongCountRequest>) {
  try {
    const { artist } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artistss/${artist}`));
    const data: { numberOfSongs: number } = yield call(() => response.json());
    yield put(fetchSongCountSuccess({ artist, count: data.numberOfSongs }));
  } catch (error: any) {
    yield put(fetchSongCountFailure(error.message));
  }
}

// Saga function to fetch artist details
function* fetchArtistDetail(action: ReturnType<typeof fetchArtistDetailRequest>) {
  try {
    const { artist } = action.payload;
    const response1: Response = yield call(() => fetch(`${link}/album/${artist}`));
    const data1: any[] = yield call(() => response1.json());
    const response2: Response = yield call(() => fetch(`${link}/artists/${artist}`));
    const data2: { numberOfAlbums: number } = yield call(() => response2.json());
    const response3: Response = yield call(() => fetch(`${link}/artistss/${artist}`));
    const data3: { numberOfSongs: number } = yield call(() => response3.json());

    yield put(fetchArtistDetailSuccess({
      albumsList: data1,
      albumNumber: data2.numberOfAlbums,
      songNumber: data3.numberOfSongs,
    }));
  } catch (error: any) {
    yield put(fetchArtistDetailFailure(error.message));
  }
}

// Saga function to fetch song count for an album
function* fetchSongCountByalbum(action: ReturnType<typeof fetchSongCountByAlbumRequest>) {
  try {
    const { album } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artistsss/${album}`));
    const data: { numberOfSongs: number } = yield call(() => response.json());
    yield put(fetchSongCountByAlbumSuccess({ album, count: data.numberOfSongs }));
  } catch (error: any) {
    yield put(fetchSongCountByAlbumFailure(error.message));
  }
}

// Saga function to fetch album details
function* fetchlbumDetail(action: ReturnType<typeof fetchAlbumDetailRequest>) {
  try {
    const { album } = action.payload;
    const response1: Response = yield call(() => fetch(`${link}/albumsba/${album}`));
    const data1: any[] = yield call(() => response1.json());
    const response2: Response = yield call(() => fetch(`${link}/artistsss/${album}`));
    const data2: { numberOfSongs: number } = yield call(() => response2.json());

    yield put(fetchAlbumDetailSuccess({
      songList: data1,
      songNumber: data2.numberOfSongs,
    }));
  } catch (error: any) {
    yield put(fetchAlbumDetailFailure(error.message));
  }
}

// Saga function to fetch artist count for a genre
function* fetchArtistCountByGener(action: ReturnType<typeof fetchArtistCountByGenerRequest>) {
  try {
    const { gener } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artistsag/${gener}`));
    const data: { numberOfArtists: number } = yield call(() => response.json());
    yield put(fetchArtistCountByGenerSuccess({ gener, count: data.numberOfArtists }));
  } catch (error: any) {
    yield put(fetchArtistCountByGenerFailure(error.message));
  }
}

// Saga function to fetch album count for a genre
function* fetchAlbumCountByGener(action: ReturnType<typeof fetchAlbumCountByGenerRequest>) {
  try {
    const { gener } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artistsa/${gener}`));
    const data: { numberOfAlbums: number } = yield call(() => response.json());
    yield put(fetchAlbumCountByGenerSuccess({ gener, count: data.numberOfAlbums }));
  } catch (error: any) {
    yield put(fetchAlbumCountByGenerFailure(error.message));
  }
}

// Saga function to fetch song count for a genre
function* fetchSongCountByGener(action: ReturnType<typeof fetchSongCountByGenerRequest>) {
  try {
    const { gener } = action.payload;
    const response: Response = yield call(() => fetch(`${link}/artistsg/${gener}`));
    const data: { numberOfSongs: number } = yield call(() => response.json());
    yield put(fetchSongCountByGenerSuccess({ gener, count: data.numberOfSongs }));
  } catch (error: any) {
    yield put(fetchSongCountByGenerFailure(error.message));
  }
}

// Saga function to perform a search
function* workSearch(action: ReturnType<typeof setQuery>) {
  try {
    const { query } = action.payload;
    console.log('Search query:', query);
    const response: Response = yield call(() => fetch(`${link}/search/${query}`));
    const data: SongResponse = yield call(() => response.json());
    yield put(setResults(data)); // Dispatch the setResults action with the search results
  } catch (error) {
    console.error('Error during search:', error);
    // Handle errors appropriately in your application
  }
}

// Root saga function
function* songSaga() {
  yield takeEvery('song/getSongFetch', workGetSongFetch);
  yield takeEvery('song/createSong', workCreateSong);
  yield takeEvery('song/editSong', workEditSong);
  yield takeEvery('song/deleteSong', workDeleteSong);
  yield takeEvery('album/getAlbumsFetch', workGetAlbumsFetch);
  yield takeEvery('artist/getArtistsFetch', workGetArtistsFetch);
  yield takeEvery('gener/getGenerFetch', workGetGenerFetch);
  yield takeEvery(fetchAlbumCountRequest.type, fetchAlbumCount);
  yield takeEvery(fetchSongCountRequest.type, fetchSongCount);
  yield takeEvery(fetchArtistDetailRequest.type, fetchArtistDetail);
  yield takeEvery(fetchSongCountByAlbumRequest.type, fetchSongCountByalbum);
  yield takeEvery(fetchAlbumDetailRequest.type, fetchlbumDetail);
  yield takeEvery(fetchArtistCountByGenerRequest.type, fetchArtistCountByGener);
  yield takeEvery(fetchAlbumCountByGenerRequest.type, fetchAlbumCountByGener);
  yield takeEvery(fetchSongCountByGenerRequest.type, fetchSongCountByGener);
  yield takeLatest(setQuery.type, workSearch);
}

export default songSaga;
