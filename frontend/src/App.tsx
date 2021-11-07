import React, { FC } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const MainLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
}));

const MainBox = styled('main')(({ theme }) => ({
  flex: 1,
}));

const App: FC = () => {
  return (
    <MainLayout>
      <Header />

      <MainBox>
        <h1>Welcome to Carpincho</h1>
      </MainBox>

      <Footer />
    </MainLayout>
  );
};

export default App;
