import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './common/Home';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import GenerPage from './pages/GenerPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import AlbumDetailPage from './pages/AlbumDetailPage';

const RoutesConfig = () => {
 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artists" element={<ArtistPage />} />
      <Route path='/album' element={<AlbumPage /> } />
      <Route path='/gener' element={<GenerPage /> } />
      <Route path='/artistdetail/:artist' element={<ArtistDetailPage /> } />
      <Route path='/albumdetail/:album' element={<AlbumDetailPage /> } />
    </Routes>
 );
};

export default RoutesConfig;