import { css } from '@emotion/css';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { fetchAlbumCountRequest, fetchSongCountRequest } from '../Redux/ArtistCount';
import { songImages } from './SongCard';

interface ArtistCardProps {
  artist: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { albumCounts, songCounts } = useSelector((state: RootState) => state.artistCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAlbumCountRequest({ artist }));
    dispatch(fetchSongCountRequest({ artist }));
  }, [artist, dispatch]);

  return (
    <Card onClick={() => navigate(`/artistdetail/${artist}`)}>
      <Img src={songImages[Math.floor(Math.random() * songImages.length)]} alt={`${artist}`} />
      <CardBody>
        <CardDetail>
          <ArtistName>{artist}</ArtistName>
          <Counts>{albumCounts[artist] || 0} Album | {songCounts[artist] || 0} Song</Counts>
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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

const ArtistName = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-align: center;
`;

const Counts = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export default ArtistCard;
