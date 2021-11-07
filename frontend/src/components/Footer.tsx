import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Footer: FC = () => {
  return (
    <footer>
      <Container>
        <Box sx={{ margin: '1rem' }}>
          <Typography align='center'>Copyright &copy; Carpincho</Typography>

          <Typography align='center'>
            Built by <strong>Tomás Catena</strong>
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
