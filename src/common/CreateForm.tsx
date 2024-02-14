import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSong } from "../Redux/songState";

const CreateForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [gener, setGenre] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createSong({ title, artist, album, gener }));
    onClose();
  };

  return (
    <CreateScreen>
      <Card>
        <Title>Create Songs</Title>
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
            <SubmitButton type="submit">Create</SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </form>
      </Card>
    </CreateScreen>
  );
};

const CreateScreen = styled.div`
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
  border-radius: 0.375rem;
  background-color: var(--background);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 550px;
  width: 90%;
`;

const Title = styled.h1`
  margin: 0 0 1.5rem;
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
  flex: 1;
  display: block;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  flex: 1;
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

const SubmitButton = styled.button`
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

export default CreateForm;
