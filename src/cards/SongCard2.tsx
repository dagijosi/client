import styled from "@emotion/styled";
import React, { useState } from "react";
import EditForm from "../common/EditForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { deleteSong } from "../Redux/songState";

export interface SongProps {
  song: {
    _id?: string;
    title: string;
    artist: string;
    album: string;
    gener: string;
  };
}
export const songImages2 = [
  '../Pic1.jpg',
  '../Pic2.jpg',
  '../Pic3.jpg',
  '../Pic4.jpg',
  '../Pic5.jpg',
  '../Pic6.jpg',
  '../Pic7.jpg',
];
const SongCard = ({ song }: SongProps) => {
  const [editingSong, setEditingSong] = useState<SongProps["song"] | null>(
    null
  );
  const dispatch = useDispatch();
  const handleEdit = () => {
    setEditingSong(song);
  };

  const handleCloseEditForm = () => {
    setEditingSong(null);
  };

  const handleDelete = () => {
    dispatch(deleteSong(song._id));
  };

  return (
    <Card>
      <Img src={songImages2[Math.floor(Math.random() * songImages2.length)]} alt={`${song.title} - ${song.artist}`} />
      <CardContent>
        <SongInfo>
          <SongTitle>{song.title}</SongTitle>
          <div>Dec 15</div>
        </SongInfo>
        <CardActions>
          <IconButton onClick={handleEdit}><EditIcon fontSize="small" /></IconButton>
          <IconButton onClick={handleDelete}><DeleteIcon fontSize="small" /></IconButton>
        </CardActions>
      </CardContent>
      {editingSong && <EditForm song={editingSong} onClose={handleCloseEditForm} />}
    </Card>
  );
};

const Card = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 400px; /* Adjust max-width as needed */
  margin: 0 auto;
  background-color: var(--CardColor);
`;

const Img = styled.img`
  width: 100%;
  height: 10rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
`;

const SongInfo = styled.div`
  flex: 1;
  color: var(--text-secondary);
`;

const SongTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  background-color: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
  &:hover {
    background-color: var(--hover);
  }
`;


export default SongCard;
