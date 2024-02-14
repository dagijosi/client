import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { fetchAlbumCountByGenerRequest, fetchArtistCountByGenerRequest, fetchSongCountByGenerRequest } from "../Redux/GenerCount";
import { songImages } from "./SongCard";

interface GenerCardProps {
  gener: string;
}

const GenerCard: React.FC<GenerCardProps> = ({ gener }) => {
  const navigate = useNavigate();
  const { artistCounts, albumCounts, songCounts } = useSelector((state: RootState) => state.generCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtistCountByGenerRequest({ gener }));
    dispatch(fetchAlbumCountByGenerRequest({ gener }));
    dispatch(fetchSongCountByGenerRequest({ gener }));
  }, [gener, dispatch]);

  return (
    <Card onClick={() => navigate(`/generdetail/${gener}`)}>
      <Img src={songImages[Math.floor(Math.random() * songImages.length)]} alt={`${gener}`} />
      <CardBody>
        <CardDetail>
          <GenerName>{gener}</GenerName>
          <Counts>
            {artistCounts[gener] || 0} Artist | {albumCounts[gener] || 0} Album | {songCounts[gener] || 0} Song
          </Counts>
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

const GenerName = styled.h1`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  text-align: center;
`;

const Counts = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

export default GenerCard;
