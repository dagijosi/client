import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard2, { songImages2 } from "../cards/SongCard2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchAlbumDetailRequest } from "../Redux/AlbumDetailSlice";
import { keyframes } from "@emotion/react";


const AlbumDetailPage = () => {
  const { album } = useParams();
  const dispatch = useDispatch();
  const { songList, songNumber, isLoading, error } = useSelector(
    (state: RootState) => state.albumDetail
  );

  useEffect(() => {
    if (album) {
      dispatch(fetchAlbumDetailRequest({ album }));
    }
  }, [album, dispatch]);
  return (
    <AlbumDetailContainer>
      {isLoading ? (
        <LoadingIndicator>Loading...</LoadingIndicator>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <Description>
          <Img src={songImages2[Math.floor(Math.random() * songImages2.length)]} alt={`${album}`} />
            <div>
              <AlbumName> {album} </AlbumName>
              <Status>{songNumber} Song</Status>
            </div>
          </Description>
          <Card>
            {songList &&
              songList.map((song, index) => (
                <SongCard2 key={index} song={song} />
              ))}
          </Card>
        </>
      )}
    </AlbumDetailContainer>
  );
};
const AlbumDetailContainer = styled.div`
  padding: 2rem;
  overflow: auto;
  max-height: calc(100vh - 150px); 
  background-color: var(--background);
  @media screen and (max-width: 768px) {
    padding: 1rem;
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
const Description = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 2rem;
   color: var(--text-secondary);
`;
const Img = styled.img`
  border-radius: 0.125rem;
  width: 10rem;
  height: 8rem;
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    width: 8rem;
  }
`;
const AlbumName = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`;
const Status = styled.div`
  font-weight: 600;
`;
const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1.5rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    padding: 1rem;
  }
`;
export default AlbumDetailPage;
