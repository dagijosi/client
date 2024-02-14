import React from 'react';
import './App.css';
import styled from '@emotion/styled';
import LeftNav from './common/LeftNav';
import TopNav from './common/TopNav';
import RoutesConfig from './routes';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const MainScreen = styled.div `
    display: flex; 
    flex-direction: row; 
    background-color: var(--background);
  `
  const LeftScreen = styled.div`
    display: flex;
    flex-direction:column;
    flex-grow: 1; 
  `

  const AppContainer = styled.div`
    height: 100vh; /* Set the height to 100% of the viewport height */
    overflow: hidden; /* Prevent overflow */
  `;

  return (
    <BrowserRouter>
      <AppContainer className="App" data-theme={theme}>
        <MainScreen>
          <LeftNav />
          <LeftScreen>
            <TopNav />
            <RoutesConfig />
          </LeftScreen>
        </MainScreen>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
