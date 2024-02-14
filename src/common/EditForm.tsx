import React, { useState } from 'react';
import { SongProps } from '../cards/SongCard'
import styled from '@emotion/styled';
import { editSong } from '../Redux/songState';
import { useDispatch } from 'react-redux';

interface EditFormProps {
  song: SongProps['song'];
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ song, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [gener, setGenre] = useState(song.gener);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(editSong({ _id: song._id, title, artist, album, gener }));
    onClose();
  };

  return (
    <EditScreen>
      <Card>
        <Title>Edit Song</Title>
        <form onSubmit={handleSubmit}>
        <InputsContainer>
            <InputLabel>
              Title:
              <Input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputLabel>
            <InputLabel>
              Artist:
              <Input
                type="text"
                placeholder="Enter Artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                required
              />
            </InputLabel>
          </InputsContainer>
          <InputsContainer>
            <InputLabel>
              Album:
              <Input
                type="text"
                placeholder="Enter Album"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                required
              />
            </InputLabel>
            <InputLabel>
              Genre:
              <Input
                type="text"
                placeholder="Enter Genre"
                value={gener}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </InputLabel>
          </InputsContainer>
          <ButtonContainer>
            <UpdateButton type="submit">Update</UpdateButton>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
          </ButtonContainer>
        </form>
      </Card>
    </EditScreen>
  );
};

const EditScreen = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Card = styled.div`
  padding: 2.5rem;
  border-radius: 0.5rem;
  background-color: var(--background);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 90%;
  max-width: 550px;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-secondary);
`;
const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InputLabel = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 15rem;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: var(--search);
  color: var(--text-primary);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const UpdateButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--buttonColor);
  color: var(--textColor);
  cursor: pointer;
`;

const CancelButton = styled.button`
  flex: 1;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: transparent;
  color: var(--text-primary);
  cursor: pointer;
`;

export default EditForm;
