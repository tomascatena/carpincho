import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/system';

export const MainLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
}));

export const MainContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));
