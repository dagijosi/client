import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import ArtistCard from '../cards/ArtistCard';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistsFetch } from '../Redux/ArtistState';
import { RootState } from '../store';
import { keyframes } from '@emotion/react';

const ArtistPage: React.FC = () => {
  const artistList: string[] = useSelector((state: RootState) => state.artists.artist);
  const isLoading: boolean = useSelector((state: RootState) => state.artists.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArtistsFetch());
  }, [dispatch]);

  return (
    <ArtistContainer>
      <Title>Artist</Title>
      {isLoading ? (
        <LoadingIndicator>Loading...</LoadingIndicator> // Display loading indicator
      ) : (
      <CardGrid>
        {artistList.map((artist: string, index: number) => (
          <ArtistCard key={index} artist={artist} />
        ))}
      </CardGrid>
        )}
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow: auto;
  max-height: calc(100vh - 150px); 
  background-color: var(--background);
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
font-size: 2rem;
font-weight: 600;
margin-bottom: 2rem;
text-align: center;
color: var(--text-secondary);
@media screen and (max-width: 768px) {
  text-align: left;
  font-size: 1.5rem;
}
`;
const loadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
  transition: opacity 0.3s ease-in-out;
  &:before {
    content: "";
    box-sizing: border-box;
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-top-color: #000;
    animation: ${loadingAnimation} 0.6s linear infinite;
  }
`;
const CardGrid = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media screen and (max-width: 768px) {
    max-width: 20rem;
    grid-template-columns: 1fr;
  }
`;

export default ArtistPage;
