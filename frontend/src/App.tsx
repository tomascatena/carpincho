import React, { FC, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HomePage from './pages/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from './themes/defaultTheme';
import defaultDarkTheme from './themes/defaultDarkTheme';

const MainLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
}));

const MainContainer = styled(Container)(({ theme }) => ({
  flex: 1,
}));

const App: FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <ThemeProvider theme={darkTheme ? defaultDarkTheme : defaultTheme}>
      <MainLayout>
        <Header setDarkTheme={setDarkTheme} darkTheme={darkTheme} />

        <MainContainer>
          <h1>Welcome to Carpincho</h1>

          <HomePage />
        </MainContainer>

        <Footer />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
