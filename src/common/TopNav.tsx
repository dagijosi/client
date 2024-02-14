import React, { useState } from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import CreateForm from "./CreateForm";
import { useDispatch } from "react-redux";
import { clearResults, setQuery } from "../Redux/searchSlice";
import useLocalStorage from "use-local-storage";

const TopNav = () => {
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const toggleCreateForm = () => {
    setCreateFormVisible(!createFormVisible);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setQuery({ query: searchTerm }));
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    if (newValue === "") {
      dispatch(clearResults());
    }
  };
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <TopScreen>
      <SearchContainer>
        <form onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            placeholder="Search by Title, Artist, or Genre"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <Button type="submit">Search</Button>
        </form>
      </SearchContainer>
      <ActionContainer>
        <Button onClick={toggleCreateForm}>Create</Button>
        <IconButton >
          <NotificationsOutlined
            className={css`
              color: var(--buttonColor);
            `}
          />
        </IconButton>
        <IconButton onClick={toggleTheme}>
          {theme === "light" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined
              className={css`
                color: var(--buttonColor);
              `}
            />
          )}
        </IconButton>
      </ActionContainer>
      {createFormVisible && <CreateForm onClose={toggleCreateForm} />}
    </TopScreen>
  );
};

const TopScreen = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1.5rem;
  background-color: var(--background);
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2.5rem;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  color: #ffffff;
  background-color: var(--buttonColor);
  color: var(--textColor);
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-weight: 400;
  width: 24rem;
  background-color: var(--search);
  color: var(--text-primary);
  ::placeholder {
    color: #9ca3af;
  }
`;

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  :hover {
    background-color: var(--hover);
    border-radius: 50%;
  }
`;

export default TopNav;
