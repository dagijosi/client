import { css } from '@emotion/css';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchSongCountByAlbumRequest } from '../Redux/AlbumCount';
import { songImages2 } from './SongCard2';

interface AlbumCardProps {
  album: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const { songCounts } = useSelector((state: RootState) => state.albumCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSongCountByAlbumRequest({ album }));
  }, [album]);

  return (
    <Card onClick={() => navigate(`/albumdetail/${album}`)}>
      <Img src={songImages2[Math.floor(Math.random() * songImages2.length)]} alt={`${album}`} />
      <CardBody>
        <CardDetail>
          <AlbumName>{album}</AlbumName>
          <SongCount>{songCounts[album] || 0} Song</SongCount>
        </CardDetail>
      </CardBody>
    </Card>
  );
};

const Card = styled.div`
  overflow: hidden;
  margin-top: 2.5rem;
  border-radius: 0.25rem;
  width: fit-content;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
  background-color: var(--CardColor);
  &:hover {
    transform: translateY(-4px);
  }
`;

const Img = styled.img`
  border-radius: 0.25rem;
  width: 16rem;
  height: 10rem;
`;

const CardBody = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: var(--text-secondary);
`;

const AlbumName = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-align: center;
`;

const SongCount = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export default AlbumCard;
