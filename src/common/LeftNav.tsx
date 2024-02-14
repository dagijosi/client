import React from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  AlbumOutlined,
  MusicNoteOutlined,
  PersonOutline,
  SpeakerGroupOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
  const navigate = useNavigate();

  return (
    <LeftScreen>
      <Content>
        <CompanyName>Music Library</CompanyName>
        <NavButtons>
          <NavButton onClick={() => navigate("/")}>
            <MusicNoteOutlined className={iconStyles} />
            Songs
          </NavButton>
          <NavButton onClick={() => navigate("/artists")}>
            <PersonOutline className={iconStyles} />
            Artists
          </NavButton>
          <NavButton onClick={() => navigate("/album")}>
            <AlbumOutlined className={iconStyles} />
            Albums
          </NavButton>
          <NavButton onClick={() => navigate("/gener")}>
            <SpeakerGroupOutlined className={iconStyles} />
            Genres
          </NavButton>
        </NavButtons>
      </Content>
    </LeftScreen>
  );
};

const LeftScreen = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100vh;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    background-color: var(--background);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 2.5rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CompanyName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-secondary);
`;

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  justify-content: center; 
  align-items: center; 
  height: 100%;  
 
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const NavButton = styled.button`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.125rem;
  background-color: transparent;
  color: var(--text-primary);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: var(--hover);
  }
`;

const iconStyles = css`
  margin-right: 0.5rem;
`;

export default LeftNav;
